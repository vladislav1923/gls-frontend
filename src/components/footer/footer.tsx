import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './footer.less';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="grid-noGutter-spaceBetween">
                        <div className="col-6 grid-middle">
                            <span>vladislav kozak | 2019</span>
                        </div>
                        <div className="col-6 grid-right">
                            <a className="github-link" href="https://github.com/vladislav1923" target="_blank">
                                <FontAwesomeIcon icon={['fab', 'github']} size="3x"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;