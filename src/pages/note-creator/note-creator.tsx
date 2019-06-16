import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';
import {UnsplashService} from '../../services/unsplash.service';
import {NoteService} from '../../services/note.service';
import {EventService} from '../../services/event.service';
import {ScrollHandler} from '../../helpers/scroll-handler';
import Button from '../../components/button/button';
import Tag from '../../components/tag/tag';
import NoteModel from '../../models/note.model';
import {ActionTypesEnum} from '../../enums/action-types.enum';
import {AlertModel} from '../../models/alert.model';
import {AlertTypesEnum} from '../../enums/alert-types.enum';
import {EventTypesEnum} from '../../enums/event-types.enum';
import {removeLineTranslationSymbols, stringArrayToLowerCase} from '../../helpers/tools';
import './note-creator.less';

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
    randomImageUrls: string[],
    createNoteProgress: boolean,
    isEdit: boolean
}

class NoteCreator extends Component<RouteComponentProps & Props, State> {

    private unsplashService: UnsplashService;
    private noteService: NoteService;

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
            randomImageUrls: [],
            createNoteProgress: false,
            isEdit: this.props.creatingNote._id !== null
        };

        this.unsplashService = new UnsplashService();
        this.noteService = new NoteService();
    }

    public async componentDidMount() {
        ScrollHandler.scrollToId('step');
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

    public deleteKeyword = (value: string): void => {
        const updatedKeywords = this.state.keywords.filter((item: string) => item !== value);
        this.setState({keywords: updatedKeywords});
    };

    public goToNextStep = async (): Promise<void> => {
        if (this.validateLink()) {
            await this.createNote();
        }
    };

    public goToPrevStep = (): void => {
        if (this.state.isEdit) {
            this.props.history.push('/');
        } else {
            this.props.history.push('/parse');
        }
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
            this.setState({errorTitleMessage: 'Давайте заголовок добавим'});
            EventService.dispatchEvent(EventTypesEnum.alert, new AlertModel(
                AlertTypesEnum.error,
                'Давайте заголовок добавим',
                'Он просто необходим.'));
            ScrollHandler.scrollToId('step');

            return false;
        }

        return true;
    }

    private createNote = async (): Promise<void> => {
        this.setState({createNoteProgress: true});
        const data = this.props.creatingNote;
        data.title = this.state.title;
        data.description = this.state.description;
        data.keywords = this.state.keywords;
        data.imageUrl = this.state.imageUrl;
        const response = this.state.isEdit ?
            await this.noteService.updateNote(data) :
            await this.noteService.createNote(data);
        this.setState({createNoteProgress: false});
        if (response.result) {
            EventService.dispatchEvent(EventTypesEnum.alert, new AlertModel(
                AlertTypesEnum.success,
                'Поздравляем!',
                this.state.isEdit ? 'Сслылка обновлена' : 'Ссылка добавлена.'));
            this.props.changeCreatingNote(new NoteModel());
            this.props.history.push('/');
        } else {
            this.setState({errorTitleMessage: 'Проблема с сервером. Попробуйте чуть позже.'});
            EventService.dispatchEvent(EventTypesEnum.alert, new AlertModel(
                AlertTypesEnum.error,
                'Проблема с сервером',
                'Попробуйте чуть позже.'));
        }
    };

    render() {
        return (
            <div>
                <div id="step" className="step">
                    <h2>{this.state.isEdit ? 'Редактирование ссылки' : 'Шаг 2 / Добавление описания ссылки'}</h2>
                    <span className="sub-header mb-32">
                        {this.state.isEdit ?
                            'Исправьте описания страницы, на которую введет ссылка и нажмите «Сохранить».' :
                            'Проверьте правильность описания страницы, на которую введет ссылка.\n' +
                            'При необходимости исправьте описание и нажмите «Сохранить».\n' +
                            'Нажмите «Назад» для изменения ссылки.'
                        }
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
                                                 onDelete={(value) => this.deleteKeyword(value)}/>
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
                            <Button process={this.state.createNoteProgress} color="white" size="lg" fullWidth={true}
                                    onClick={this.goToNextStep}>
                                <span className="add-link-button-text">Сохранить ссылку</span>
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

const dispatchToProps = (dispatch: (data: { type: ActionTypesEnum, data: NoteModel }) => void) => {
    return {
        changeCreatingNote: (data: NoteModel) => dispatch({type: ActionTypesEnum.change, data})
    }
};

export default withRouter(connect(stateToProps, dispatchToProps)(NoteCreator));
