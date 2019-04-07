import React, {Component} from 'react';
import './profile-menu.less';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class ProfileMenu extends Component {
    render() {
        return (
            <div className="profile-menu">
                <FontAwesomeIcon icon="user-circle" />
            </div>
        );
    }
}

export default ProfileMenu;