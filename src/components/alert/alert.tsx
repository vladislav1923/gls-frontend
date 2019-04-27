import React, {Component} from 'react';
import './alert.less';
// import {isMobile} from 'react-device-detect';
import {AlertModel} from '../../models/alert.model';
import {AlertTypes} from '../../enums/alert-types.enum';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

type Props = {
    isOpen: boolean,
    data: AlertModel | null,
    onClose: () => void
}

type State = {
    alertType: AlertTypes | null,
    timerId: number | null
}

class Alert extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            alertType: null,
            timerId: null
        }
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (nextProps.isOpen) {
            if (this.state.timerId) {
                window.clearTimeout(this.state.timerId);
                this.setState({timerId: null});
            }

            this.setState({
                timerId: window.setTimeout(this.props.onClose, 10000),
                alertType: nextProps.data ? nextProps.data.type : null
            });
        }
    }

    public closeButtonHandler = (): void => {
        if (this.state.timerId !== null) {
            window.clearTimeout(this.state.timerId);
            this.setState({timerId: null});
        }
        setTimeout(this.props.onClose, 300);
    };

    render() {
        return (
            <div className={'alert' + (this.props.isOpen ? ' show' : '') + (this.state.alertType ? ` ${this.state.alertType}` : '')}>
                <div className="alert-icon">
                    {this.state.alertType === AlertTypes.error && <FontAwesomeIcon icon="frown" size="3x" />}
                    {this.state.alertType === AlertTypes.warning && <FontAwesomeIcon icon="meh" size="3x" />}
                    {this.state.alertType === AlertTypes.success && <FontAwesomeIcon icon="smile" size="3x" />}
                </div>
                <div className="alert-text">
                    <span className="alert-title mb-8">{this.props.data && this.props.data.title}</span>
                    <span className="alert-subtitle">{this.props.data && this.props.data.subtitle}</span>
                </div>
                <span className="close-button" onClick={() => this.closeButtonHandler()}>
                    <FontAwesomeIcon icon="times" size="lg" />
                </span>
            </div>
        )
    }

}

export default Alert;
