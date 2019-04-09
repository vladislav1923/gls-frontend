import React, {Component, ReactNode} from 'react';
import './modal.less';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = {
    children: ReactNode,
    open: boolean,
    close: () => void
}

class Modal extends Component<Props> {
    render() {
        return (
            <div style={{display: this.props.open ? 'flex' : 'none'}} className="dialog">
                <div className="content">
                    <div className="close-button" onClick={this.props.close}>
                        <FontAwesomeIcon icon="times" size="2x" />
                    </div>
                    {this.props.children}
                </div>
                <div className="background" onClick={this.props.close}/>
            </div>
        );
    }
}

export default Modal;