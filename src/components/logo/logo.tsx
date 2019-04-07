import React, {Component} from 'react';
import './logo.less';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Logo extends Component {
    render() {
        return (
            <div className="logo">
                <FontAwesomeIcon icon="link" />
            </div>
        );
    }
}

export default Logo;