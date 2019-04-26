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

class Alert extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    componentDidUpdate() {
        if (this.props.isOpen) {
            this.setCloseTimer();
        }
    }

    private setCloseTimer(): void {
        setTimeout(() => {
            this.props.onClose();
        }, 5000)
    }

    render() {
        return (
            <div className={'alert' + (this.props.isOpen ? ' show' : '') + (this.props.data ? ` ${this.props.data.type}` : '')}>
                <div className="alert-icon">
                    {this.props.data && this.props.data.type === AlertTypes.error &&
                        <FontAwesomeIcon icon="frown" size="3x" />
                    }
                    {this.props.data && this.props.data.type === AlertTypes.warning &&
                    <FontAwesomeIcon icon="meh" size="3x" />
                    }
                    {this.props.data && this.props.data.type === AlertTypes.success &&
                    <FontAwesomeIcon icon="smile" size="3x" />
                    }
                </div>
                <div className="alert-text">
                    <span className="alert-title mb-16">{this.props.data && this.props.data.title}</span>
                    <span className="alert-subtitle">{this.props.data && this.props.data.subtitle}</span>
                </div>
                <span className="close-button"
                     onClick={() => this.props.onClose()}>
                    <FontAwesomeIcon icon="times" size="lg" />
                </span>
            </div>
        )
    }

}

export default Alert;
