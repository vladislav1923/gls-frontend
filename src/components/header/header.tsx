import React, {Component} from 'react';
import './header.less';
import Logo from "../logo/logo";
import ProfileMenu from "../profile-menu/profile-menu";
import AddNote from "../add-note/add-note";

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
                            <AddNote/>
                            <ProfileMenu/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;