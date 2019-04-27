import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {ActionTypes} from '../../enums/action-types.enum';
import {NoteService} from '../../services/note.service';
import './note-parser.less';
import Button from '../../components/button/button';
import NoteModel from '../../models/note.model';
import Alert from '../../components/alert/alert';
import {AlertModel} from '../../models/alert.model';
import {AlertTypes} from '../../enums/alert-types.enum';
import {removeSpaces} from '../../helpers/tools';

type Props = {
    creatingNote: NoteModel,
    changeCreatingNote: (data: NoteModel) => void
}

type State = {
    link: string,
    errorLinkMessage: string,
    errorLinkAlert: AlertModel | null,
    linkParseProgress: boolean
}

class NoteParser extends Component<RouteComponentProps & Props, State> {

    private readonly linkRegexp = /^((?:https?:\/\/)[^./]+(?:\.[^./]+)+(?:\/.*)?)$/;
    private noteService: NoteService;

    constructor(props: RouteComponentProps & Props) {
        super(props);
        this.state = {
            link: this.props.creatingNote.url || '',
            errorLinkMessage: '',
            errorLinkAlert: null,
            linkParseProgress: false
        };

        this.noteService = new NoteService();
    }

    public goToNextStep = async (): Promise<void> => {
        if (!this.state.linkParseProgress && this.validateLink()) {
            this.setState({linkParseProgress: true});

            const response = await this.noteService.parseUrl(removeSpaces(this.state.link));
            if (response.result) {
                const data = response.data as NoteModel;
                data.url = this.state.link;
                this.props.changeCreatingNote(data);
                this.props.history.push('/create');
            } else {
                this.setState({
                    errorLinkMessage: 'Проблема с сервером. Попробуйте чуть позже.',
                    errorLinkAlert: new AlertModel(
                        AlertTypes.error,
                        'Проблема с сервером',
                        'Попробуйте чуть позже.')
                });
            }
        }
    };

    private validateLink(): boolean {
        if (this.state.link.length === 0) {
            this.setState({
                errorLinkMessage: 'Не вижу ссылки',
                errorLinkAlert: new AlertModel(
                    AlertTypes.error,
                    'Не вижу ссылки.',
                    'Введите ссылку в поле.')
            });
            return false;
        }

        const regExp = new RegExp(this.linkRegexp);
        if (!this.state.link.match(regExp)) {
            this.setState({
                errorLinkMessage: 'Не похоже на ссылку',
                errorLinkAlert: new AlertModel(
                    AlertTypes.error,
                    'Не похоже на ссылку.',
                    'Проверьте ссылку на ошибки или укажите другую.')
            });
            return false;
        }

        return true;
    }

    render() {
        return (
            <div>
                <Alert isOpen={!!this.state.errorLinkAlert} data={this.state.errorLinkAlert}
                       onClose={() => this.setState({errorLinkAlert: null})} />
                <div className="step">
                    <h2>Шаг 1 / Введите ссылку</h2>
                    <span className="sub-header mb-32">
                        Ссылка должна вести на статью, которую вы хотите добавить.
                        Пример ссылки: https://habr.com/ru/post/437108/
                    </span>
                    <div className="grid-spaceBetween">
                        <div className="col-7_sm-12">
                            <label>
                                <input type="text" value={this.state.link}
                                       onFocus={() => this.setState({errorLinkMessage: ''})}
                                       onChange={(e) => this.setState({link: e.target.value})}
                                       placeholder="Введите ссылку"/>
                                <div className="error-label mt-16">{this.state.errorLinkMessage}</div>
                            </label>
                        </div>
                        <div className="col-4_sm-12">
                            <Button process={this.state.linkParseProgress} color="white" size="lg"
                                    fullWidth={true} onClick={this.goToNextStep}>
                                <span className="add-link-button-text">Сохранить</span>
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

const dispatchToProps = (dispatch: (data: {type: ActionTypes, data: NoteModel}) => void) => {
    return {
        changeCreatingNote: (data: NoteModel) => dispatch({type: ActionTypes.change, data}),
    }
};

export default withRouter(connect(stateToProps, dispatchToProps)(NoteParser));
