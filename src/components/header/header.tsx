import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './header.less';
import Logo from "../logo/logo";
import ProfileMenu from "../profile-menu/profile-menu";
import Button from "../button/button";

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="container">
                    <div className="grid-noGutter-spaceBetween">
                        <div className="col-4 grid">
                           <Logo/>
                           <span className="title desktop-title">GLStorage</span>
                           <span className="title tablet-title">GLS</span>
                        </div>
                        <div className="col-8 grid-right">
                            <Button>
                                <FontAwesomeIcon icon="plus" />
                                <span className="add-link-button-text">Добавить</span>
                            </Button>
                            <ProfileMenu/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;