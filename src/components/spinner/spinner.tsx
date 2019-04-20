import React, {Component} from 'react';
import './spinner.less';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = {}

class Spinner extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className="spinner-wrapper">
                <div className="spinner">
                    <FontAwesomeIcon icon="spinner"/>
                </div>
                <span className={this.props.children ? 'show-text' : ''}>{this.props.children}</span>
            </div>
        );
    }
}

export default Spinner;
