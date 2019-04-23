import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import './note-group.less';
import Button from "../../components/button/button";

type Props = {}

type State = {}

class NoteGroup extends Component<RouteComponentProps<Props>, State> {

    constructor(props: RouteComponentProps<Props>) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="step">
                    <h2>Шаг 3 / Добавление ссылки в группу</h2>
                    <span className="sub-header">
                        Группирование позволяет разделять ссылки по темам, смыслу и/или предназначению.
                        Можете выбрать уже существующую группу, создать новую или пропутить этот шаг.
                    </span>
                </div>
            </div>
        );
    }
}

export default withRouter(NoteGroup);
