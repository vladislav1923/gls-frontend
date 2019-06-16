import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {NoteService} from '../../services/note.service';
import {EventService} from "../../services/event.service";
import Accordion from '../../components/accordion/accordion';
import NotePreview from '../../components/note-preview/note-preview';
import {EventTypesEnum} from "../../enums/event-types.enum";
import {AlertTypesEnum} from "../../enums/alert-types.enum";
import {AlertModel} from "../../models/alert.model";
import NoteModel from '../../models/note.model';
import {ActionTypesEnum} from "../../enums/action-types.enum";
import './notes-list.less';
import Button from "../../components/button/button";
import Tag from "../../components/tag/tag";
import Select from "../../components/select/select";

type Props = {
    creatingNote: NoteModel,
    changeCreatingNote: (data: NoteModel) => void
}

type State = {
    list: NoteModel[],
    page: number,
    searchString: string,
    searchKeywords: string[],
    keywordsList: string[]
}

class NotesList extends Component<RouteComponentProps & Props, State> {

    private noteService: NoteService;

    constructor(props: RouteComponentProps & Props) {
        super(props);

        this.state = {
            list: [],
            page: 1,
            searchString: '',
            searchKeywords: [],
            keywordsList: ['qsfdsf', 'dfs fsdf']
        };

        this.noteService = new NoteService();
    }

    public async componentDidMount() {
        await this.getNotesList(this.state.page, this.state.searchString, this.state.searchKeywords);
    }

    public onSearch = async (): Promise<void> => {
        await this.getNotesList(this.state.page, this.state.searchString, this.state.searchKeywords)
    };

    public onReset = async (): Promise<void> => {
        this.setState({
            page: 1,
            searchString: '',
            searchKeywords: []
        });

        await this.getNotesList(this.state.page, this.state.searchString, this.state.searchKeywords);
    };

    public getFilterTitle = (): string => {
        if (this.state.searchString && this.state.searchKeywords.length === 0) {
            return `Фильтр: по названию`;
        } else if (this.state.searchString && this.state.searchKeywords.length > 0) {
            return `Фильтр: по названию и по тэгам (${this.state.searchKeywords.length})`;
        } else if (!this.state.searchString && this.state.searchKeywords.length > 0) {
            return `Фильтр: по тэгам (${this.state.searchKeywords.length})`;
        } else {
            return 'Фильтр';
        }
    };

    public onKeywordChoose = async (keyword: string): Promise<void> => {
        if (!this.state.searchKeywords.includes(keyword)) {
            const updatedKeywords = [...this.state.searchKeywords, keyword];
            this.setState({searchKeywords: updatedKeywords});
        }

        await this.getNotesList(this.state.page, this.state.searchString, this.state.searchKeywords);
    };

    public onRemoveKeyword = async (keyword: string): Promise<void> => {
        const updatedKeywords = this.state.searchKeywords.filter((item: string) => item !== keyword) ;
        this.setState({searchKeywords: updatedKeywords});

        await this.getNotesList(this.state.page, this.state.searchString, this.state.searchKeywords);
    };

    public onEdit = (note: NoteModel): void => {
        this.props.changeCreatingNote(note);
        this.props.history.push('/create');
    };

    public onDelete = async (noteId: string): Promise<void> => {
        const response = await this.noteService.deleteNote(noteId as string);
        if (response.result) {
            this.setState({list: this.state.list.filter((note: NoteModel) => note._id !== noteId)});
            EventService.dispatchEvent(EventTypesEnum.alert, new AlertModel(
                AlertTypesEnum.success,
                'Ссылка удалена',
                'Вы её больше не увидите.'))
        } else {
            EventService.dispatchEvent(EventTypesEnum.alert, new AlertModel(
                AlertTypesEnum.error,
                'Проблема с сервером',
                'Попробуйте чуть позже.'))
        }
    };

    private async getNotesList(page: number, searchString: string, searchKeywords: string[]): Promise<void> {
        const response = await this.noteService.getNotesList(page, searchString, searchKeywords);
        if (response.result) {
            this.setState({list: response.data as NoteModel[]});
        } else {
            EventService.dispatchEvent(EventTypesEnum.alert, new AlertModel(
                AlertTypesEnum.error,
                'Проблема с сервером',
                'Попробуйте чуть позже.'))
        }
    };

    render() {
        return (
            <div>
                <div className="page">
                    <h2>Хранилище ваших ссылок</h2>
                    <span className="sub-header mb-16">
                        Ссылки можно искать по названию, описанию, ресурсу и фильтровать по тэгам.
                    </span>
                    <div className="mb-32">
                        <Accordion title={this.getFilterTitle()}>
                            <div className="grid-noGutter">
                                <div className="col-12">
                                    <span className="label-text mt-8 mb-8">Тэги</span>
                                </div>
                                <div className="col-12">
                                    {this.state.searchKeywords.map((keyword: string) =>
                                        <Tag key={keyword.toString()} value={keyword} canDelete={true}
                                             onDelete={this.onRemoveKeyword}/>
                                    )}
                                </div>
                                <div className="col-12 mb-16">
                                    <Select value={''} list={this.state.keywordsList}
                                            placeholder="Выберите тэг"
                                            onChange={this.onKeywordChoose} />
                                </div>
                            </div>
                            <div className="grid-spaceBetween grid-bottom">
                                <div className="col-12">
                                    <span className="label-text">Слово для поиска</span>
                                </div>
                                <div className="col-5_sm-12">
                                    <div className="mb-16">
                                        <label>
                                            <input type="text" value={this.state.searchString}
                                                   onChange={(e) => this.setState({searchString: e.target.value})}
                                                   placeholder="Введите слово для поиска"/>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-4_sm-12">
                                    <div className="mb-16">
                                        <Button color="white" size="md" fullWidth={true} onClick={this.onSearch}>
                                            Искать
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-3_sm-12">
                                    <div className="mb-16">
                                        <Button color="gray" size="md" fullWidth={true} onClick={this.onReset}>
                                            Сбросить
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div className="grid">
                        {this.state.list.map((note: NoteModel) =>
                            <div className="col-4_xs-12_sm-6_md-6" key={note._id as string}>
                                <NotePreview
                                    note={note}
                                    onKeywordChoose={this.onKeywordChoose}
                                    onEdit={this.onEdit}
                                    onDelete={this.onDelete} />
                            </div>
                        )}
                        {this.state.list.length === 0 &&
                            <div className="col-12">sdgfdsgsdfgsdfgdsgf</div>
                        }
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

const dispatchToProps = (dispatch: (data: {type: ActionTypesEnum, data: NoteModel}) => void) => {
    return {
        changeCreatingNote: (data: NoteModel) => dispatch({type: ActionTypesEnum.change, data}),
    }
};

export default withRouter(connect(stateToProps, dispatchToProps)(NotesList));
