import React, {Component} from 'react';
import {EventService} from '../../services/event.service';
import './alert.less';
import {AlertModel} from '../../models/alert.model';
import {AlertTypesEnum} from '../../enums/alert-types.enum';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {EventTypesEnum} from "../../enums/event-types.enum";

type Props = {};

type State = {
    isOpen: boolean,
    data: AlertModel | null
    timerId: number | null
}

class Alert extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
            data: null,
            timerId: null
        };
    }

    public componentDidMount(): void {
        EventService.addEventListener(EventTypesEnum.alert, (data: any) => {
            if (this.state.timerId) {
                window.clearTimeout(this.state.timerId);
                this.setState({timerId: null});
            }

            this.setState({
                isOpen: true,
                data: data.detail as AlertModel,
                timerId: window.setTimeout(this.closeButtonHandler, 5000),
            });
        });
    }

    public closeButtonHandler = (): void => {
        if (this.state.timerId !== null) {
            window.clearTimeout(this.state.timerId);
            this.setState({
                isOpen: false,
                timerId: null
            });
        }
    };

    render() {
        return (
            <div
                className={'alert' + (this.state.isOpen ? ' show' : '') + (this.state.data && this.state.data.type ? ` ${this.state.data && this.state.data.type}` : '')}>
                <div className="alert-icon">
                    {this.state.data && this.state.data.type === AlertTypesEnum.error &&
                    <FontAwesomeIcon icon="frown" size="3x"/>}
                    {this.state.data && this.state.data.type === AlertTypesEnum.warning &&
                    <FontAwesomeIcon icon="meh" size="3x"/>}
                    {this.state.data && this.state.data.type === AlertTypesEnum.success &&
                    <FontAwesomeIcon icon="smile" size="3x"/>}
                </div>
                <div className="alert-text">
                    <span className="alert-title mb-8">{this.state.data && this.state.data.title}</span>
                    <span className="alert-subtitle">{this.state.data && this.state.data.subtitle}</span>
                </div>
                <span className="close-button" onClick={() => this.closeButtonHandler()}>
                    <FontAwesomeIcon icon="times" size="lg" />
                </span>
            </div>
        )
    }

}

export default Alert;
