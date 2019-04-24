import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import './note-group.less';
import Button from "../../components/button/button";
import NoteModel from "../../models/note.model";
import {actionTypes} from "../../store/create-note.reducer";
import {connect} from "react-redux";

type Props = {
    creatingNote: NoteModel,
    changeCreatingNote: (data: NoteModel) => void
}

type State = {}

class NoteGroup extends Component<RouteComponentProps & Props, State> {

    constructor(props: RouteComponentProps & Props) {
        super(props);
        // if (!this.props.creatingNote.url) {
        //     this.props.history.push('/parse');
        // }
    }

    public goToNextStep = (): void => {
        // const data = this.props.creatingNote;
    };

    public goToPrevStep = (): void => {
        this.props.history.push('/create');
    };

    render() {
        return (
            <div>
                <div className="step">
                    <h2>Шаг 3 / Добавление ссылки в группу</h2>
                    <span className="sub-header">
                        Группирование позволяет разделять ссылки по темам, смыслу и/или предназначению.
                        Можете выбрать уже существующую группу, создать новую или пропустить этот шаг.
                    </span>
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

const dispatchToProps = (dispatch: (data: {type: actionTypes, data: NoteModel}) => void) => {
    return {
        changeCreatingNote: (data: NoteModel) => dispatch({type: actionTypes.change, data}),
    }
};

export default withRouter(connect(stateToProps, dispatchToProps)(NoteGroup));
