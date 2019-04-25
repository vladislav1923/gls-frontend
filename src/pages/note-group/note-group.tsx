import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';
import {actionTypes} from '../../store/create-note.store';
import './note-group.less';
import Button from '../../components/button/button';
import Select from '../../components/select/select';
import NoteModel from '../../models/note.model';
import Spinner from "../../components/spinner/spinner";

type Props = {
    creatingNote: NoteModel,
    changeCreatingNote: (data: NoteModel) => void
}

type State = {
    spinner: boolean,
    group: string,
    groupsList: string[],
    firstGroup: boolean,
    addingGroup: string
}

class NoteGroup extends Component<RouteComponentProps & Props, State> {

    constructor(props: RouteComponentProps & Props) {
        super(props);
        // if (!this.props.creatingNote.url) {
        //     this.props.history.push('/parse');
        // }

        this.state = {
            spinner: true,
            group: this.props.creatingNote.group || '',
            groupsList: [],
            firstGroup: false,
            addingGroup: ''
        }
    }

    public async componentDidMount() {
        const groupsList = await this.getGroupsList();
        const groupsListWithDefaultValue = groupsList.concat(['Не выбрано']);
        this.setState({
            spinner: false,
            groupsList: groupsListWithDefaultValue,
            firstGroup: groupsList.length === 0
        });
    }

    public addNewGroup = (): void => {
        const updatedGroupList = this.state.groupsList.concat([this.state.addingGroup]);
        this.setState({
            groupsList: updatedGroupList,
            group: this.state.addingGroup,
            addingGroup: '',
            firstGroup: false
        });
    };

    public goToNextStep = (): void => {
        console.log(this.state.group);
        // const data = this.props.creatingNote;
    };

    public goToPrevStep = (): void => {
        this.props.history.push('/create');
    };

    private async getGroupsList(): Promise<string[]> {
        return [];
    }

    render() {
        return (
            <div>
                <div className="step">
                    <h2>Шаг 3 / Добавление ссылки в группу</h2>
                    <span className="sub-header mb-32">
                        Группирование позволяет разделять ссылки по темам, смыслу и/или предназначению.
                        Можете выбрать уже существующую группу, создать новую или пропустить этот шаг.
                    </span>
                    {this.state.spinner &&
                        <div className="step-spinner-wrapper">
                            <Spinner size="lg" />
                        </div>
                    }
                    {!this.state.spinner &&
                        <div className="grid">
                            <div className="col-8_sm-12">
                                <div className="grid">
                                    <div className="col-12">
                                        <label>
                                        <span className="label-text mb-16">
                                            {this.state.firstGroup ? 'Создать первую группу' : 'Создать новую группу'}
                                        </span>
                                            <span className="sub-header mb-16">
                                        Укажите название и нажмите &laquo;Создать&raquo; - новая группа
                                        появится в списке групп и вы сможете ее выбрать.
                                    </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="grid-spaceBetween">
                                    <div className="col-6_sm-12 mb-16">
                                        <label>
                                            <input type="text" value={this.state.addingGroup} maxLength={50}
                                                   onChange={(e) => this.setState({addingGroup: e.target.value})}
                                                   placeholder="Укажите название группы"/>
                                        </label>
                                    </div>
                                    <div className="col-5_sm-12 col-bottom mb-16">
                                        <Button color="white" size="md" fullWidth={true} onClick={this.addNewGroup}>
                                            <span className="add-link-button-text">Создать</span>
                                        </Button>
                                    </div>
                                </div>
                                {!this.state.firstGroup &&
                                <div className="grid">
                                    <div className="col-12 mb-32">
                                        <span className="label-text mb-16">Группа для ссылки</span>
                                        <span className="sub-header mb-16">
                                            Выберите группу для ссылки из списка
                                        </span>
                                        <Select value={this.state.group} list={this.state.groupsList}
                                                onChange={(value: string) => this.setState({group: value})}/>
                                    </div>
                                </div>
                                }
                                <div className="grid buttons-block mt-32">
                                    <div className="col-6_sm-12">
                                        <Button color="gray" size="lg" fullWidth={true} onClick={this.goToPrevStep}>
                                            <span className="add-link-button-text">Назад</span>
                                        </Button>
                                    </div>
                                    <div className="col-6_sm-12">
                                        <Button color="white" size="lg" fullWidth={true} onClick={this.goToNextStep}>
                                            <span className="add-link-button-text">Сохранить ссылку</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
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

export default withRouter(connect(stateToProps, dispatchToProps)(NoteGroup));
