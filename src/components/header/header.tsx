import React, {Component} from 'react';
import './header.less';
import Logo from "../logo/logo";
import Button from "../button/button";
import ProfileMenu from "../profile-menu/profile-menu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";

class Header extends Component {

    render() {
        return (
            <div className="header">
                <div className="container">
                    <div className="header-wrapper">
                        <div className="header-left">
                            <Logo/>
                            <span className="title desktop-title">GLStorage</span>
                            <span className="title tablet-title">GLS</span>
                        </div>
                        <div className="header-right">
                            <NavLink to="/parse">
                                <Button color="blue" size="md">
                                    <FontAwesomeIcon icon="plus"/>
                                    <span className="add-link-button-text">Добавить</span>
                                </Button>
                            </NavLink>
                            <ProfileMenu/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
