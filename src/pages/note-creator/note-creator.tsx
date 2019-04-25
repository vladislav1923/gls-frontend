import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {UnsplashService} from '../../services/unsplash.service';
import {ScrollHandler} from '../../helpers/scroll-handler';
import './note-creator.less';
import Button from "../../components/button/button";
import Tag from "../../components/tag/tag";
import NoteModel from "../../models/note.model";
import {actionTypes} from "../../store/create-note.store";
import {removeLineTranslationSymbols, stringArrayToLowerCase} from '../../helpers/tools';

type Props = {
    creatingNote: NoteModel,
    changeCreatingNote: (data: NoteModel) => void
}

type State = {
    title: string,
    description: string,
    keywords: string[],
    imageUrl: string,
    errorTitleMessage: string,
    addingKeyword: string,
    linkWithoutImage: boolean,
    randomImageUrls: string[]
}

class NoteCreator extends Component<RouteComponentProps & Props, State> {

    private unsplashService: UnsplashService;

    constructor(props: RouteComponentProps & Props) {
        super(props);
        if (!this.props.creatingNote.url) {
            this.props.history.push('/parse');
        }

        this.state = {
            title: removeLineTranslationSymbols(this.props.creatingNote.title),
            description: removeLineTranslationSymbols(this.props.creatingNote.description),
            keywords: stringArrayToLowerCase(this.props.creatingNote.keywords),
            imageUrl: '',
            errorTitleMessage: '',
            addingKeyword: '',
            linkWithoutImage: false,
            randomImageUrls: []
        };

        this.unsplashService = new UnsplashService();
    }

    public async componentDidMount() {
        await this.setImageUrl(this.props.creatingNote.imageUrl);
    }

    public addKeyword = (): void => {
        if (this.state.addingKeyword) {
            const updatedKeywords = this.state.keywords.concat([this.state.addingKeyword.toLowerCase()]);
            this.setState({
                keywords: updatedKeywords,
                addingKeyword: ''
            });
        }
    };

    public deleteTag = (value: string): void => {
        const updatedKeywords = this.state.keywords.filter((item: string) => item !== value);
        this.setState({keywords: updatedKeywords});
    };

    public goToNextStep = (): void => {
        if (this.validateLink()) {
            const data = this.props.creatingNote;
            data.title = this.state.title;
            data.description = this.state.description;
            data.keywords = this.state.keywords;
            data.imageUrl = this.state.imageUrl;
            this.props.changeCreatingNote(data);
            this.props.history.push('/group');
        }
    };

    public goToPrevStep = (): void => {
        this.props.history.push('/parse');
    };

    private setImageUrl = async (imageUrlFromProps: string | null): Promise<void> => {
        let imageUrl = '';
        let randomImageUrls: string[] = [];

        if (imageUrlFromProps) {
            imageUrl = imageUrlFromProps;
        } else {
            randomImageUrls[0] = await this.unsplashService.getRandomImageUrl();
            randomImageUrls[1] = await this.unsplashService.getRandomImageUrl();
            randomImageUrls[2] = await this.unsplashService.getRandomImageUrl();

            imageUrl = randomImageUrls[0];
        }

        this.setState({
            imageUrl: imageUrl,
            linkWithoutImage: !imageUrlFromProps,
            randomImageUrls: randomImageUrls
        });
    };

    private validateLink(): boolean {
        if (this.state.title.length === 0) {
            this.setState({errorTitleMessage: 'Давай заголовок добавим'});
            ScrollHandler.scrollToId('step');
            return false;
        }

        return true;
    }

    render() {
        return (
            <div>
                <div id="step" className="step">
                    <h2>Шаг 2 / Добавление описания ссылки</h2>
                    <span className="sub-header mb-32">
                        Проверьте правильность описания страницы, на которую введет ссылка.
                        При необходимости исправьте описание и/или добавьте ссылку в соответствующую группу.
                        По окончанию нажмите кнопку &laquo;Следующий шаг&raquo; для перехода к выбору группы или
                        &laquo;Назад&raquo; для изменения ссылки.
                    </span>
                    <div className="grid grid-spaceBetween">
                        <div className="col-8_sm-12">
                            <div className="mb-32">
                                <label>
                                    <span className="label-text mb-16">Заголовок</span>
                                    <input type="text" value={this.state.title}
                                           onFocus={() => this.setState({errorTitleMessage: ''})}
                                           onChange={(e) => this.setState({title: e.target.value})}
                                           placeholder="Укажите заголовок"/>
                                    <div className="error-label mt-16">{this.state.errorTitleMessage}</div>
                                </label>
                            </div>
                            <div className="mb-32">
                                <label>
                                    <span className="label-text mb-16">Краткое описание</span>
                                    <textarea value={this.state.description}
                                              onChange={(e) => this.setState({description: e.target.value})}
                                              placeholder="Укажите краткое описание"/>
                                </label>
                            </div>
                            <div className="mb-32">
                                <div className="grid-noGutter-spaceBetween">
                                    <div className="col-12">
                                        <span className="label-text mb-16">Тэги</span>
                                    </div>
                                    <div className="col-12">
                                        {this.state.keywords.map((keyword: string) =>
                                            <Tag key={keyword.toString()} value={keyword} canDelete={true}
                                                 onDelete={(value) => this.deleteTag(value)}/>
                                        )}
                                    </div>
                                    <div className="col-6_sm-12">
                                        <label className="add-tag-label">
                                            <input type="text" value={this.state.addingKeyword} maxLength={50}
                                                   onChange={(e) => this.setState({addingKeyword: e.target.value})}
                                                   placeholder="Укажите название тэга"/>
                                        </label>
                                    </div>
                                    <div className="col-5_sm-12 col-bottom">
                                        <Button color="white" size="md" fullWidth={true}
                                                onClick={this.addKeyword}>
                                            <span className="add-link-button-text">Добавить тэг</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {this.state.imageUrl &&
                                <div className="mb-32">
                                    <span className="label-text mb-16">Изображение</span>
                                    {this.state.linkWithoutImage &&
                                        <span className="sub-header mb-32">
                                            Мы не нашли изображение на странице по ссылке и поэтому предлагаем выбрать одну
                                            из картинок для этой ссылки, чтобы вам было удобнее работать со списком ссылок.
                                        </span>
                                    }
                                    <div className="image-wrapper">
                                        <img src={this.state.imageUrl} alt=""/>
                                    </div>
                                    {this.state.linkWithoutImage &&
                                        <div className="grid mt-16">
                                            {this.state.randomImageUrls.map((imageUrl: string) =>
                                                <div key={imageUrl} className="col-4">
                                                    <div className={'image-wrapper image-random' + (this.state.imageUrl === imageUrl ? ' active' : '')}
                                                         onClick={() => this.setState({imageUrl: imageUrl})}>
                                                        <img src={imageUrl} alt=""/>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                        <div className="col-4">

                        </div>
                    </div>
                    <div className="grid buttons-block mt-32">
                        <div className="col-4_sm-12">
                            <Button color="gray" size="lg" fullWidth={true}
                                    onClick={this.goToPrevStep}>
                                <span className="add-link-button-text">Назад</span>
                            </Button>
                        </div>
                        <div className="col-4_sm-12">
                            <Button color="white" size="lg" fullWidth={true}
                                    onClick={this.goToNextStep}>
                                <span className="add-link-button-text">Следующий шаг</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const stateToProps = (state: NoteModel) => {
    return {
        creatingNote: state
    }
};

const dispatchToProps = (dispatch: (data: { type: actionTypes, data: NoteModel }) => void) => {
    return {
        changeCreatingNote: (data: NoteModel) => dispatch({type: actionTypes.change, data}),
    }
};

export default withRouter(connect(stateToProps, dispatchToProps)(NoteCreator));
