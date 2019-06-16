import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {NoteService} from '../../services/note.service';
import {EventService} from "../../services/event.service";
import NotePreview from '../../components/note-preview/note-preview';
import {EventTypesEnum} from "../../enums/event-types.enum";
import {AlertTypesEnum} from "../../enums/alert-types.enum";
import {AlertModel} from "../../models/alert.model";
import NoteModel from '../../models/note.model';
import {ActionTypesEnum} from "../../enums/action-types.enum";
import './notes-list.less';

type Props = {
    creatingNote: NoteModel,
    changeCreatingNote: (data: NoteModel) => void
}

type State = {
    list: NoteModel[]
}

class NotesList extends Component<RouteComponentProps & Props, State> {

    private noteService: NoteService;

    constructor(props: RouteComponentProps & Props) {
        super(props);

        this.state = {
           list: []
        };

        this.noteService = new NoteService();
    }

    public async componentDidMount() {
        await this.getNotesList();
    }

    public onKeywordChoose = (keyword: string): void => {
        console.log(keyword);
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

    private async getNotesList(): Promise<void> {
        const response = await this.noteService.getNotesList();
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
                    <span className="sub-header mb-32">
                        Ссылки можно искать по названию и фильтровать по тэгам.
                    </span>
                    <div className="grid">
                        {this.state.list.map((note: NoteModel) =>
                            <div className="col-4_xs-12_sm-6_md-6">
                                <NotePreview
                                    note={note}
                                    onKeywordChoose={(keyword) => this.onKeywordChoose(keyword)}
                                    onEdit={(note) => this.onEdit(note)}
                                    onDelete={(noteId) => this.onDelete(noteId)} />
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
