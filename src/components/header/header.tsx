import React, {Component} from 'react';
import './header.less';
import Logo from "../logo/logo";
import ProfileMenu from "../profile-menu/profile-menu";

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="container">
                    <div className="grid-noGutter-spaceBetween">
                        <div className="col-6 grid">
                           <Logo/>
                           <span className="title mobile-title">GLStorage</span>
                           <span className="title not-mobile-title">GLS</span>
                        </div>
                        <div className="col-6 grid-right">
                            <ProfileMenu/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;