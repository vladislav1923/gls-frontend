import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './header.less';
import Logo from "../logo/logo";
import ProfileMenu from "../profile-menu/profile-menu";
import Button from "../button/button";
import Modal from "../modal/modal";

type Props = {}

type State = {
    showModal: boolean
}

class Header extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    public showModalHandler = (): void => {
        this.setState({
            showModal: true
        });
    };

    public closeModalHandler = (): void => {
        this.setState({
            showModal: false
        });
    };

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
                            <Button onClick={this.showModalHandler}>
                                <FontAwesomeIcon icon="plus"/>
                                <span className="add-link-button-text">Добавить</span>
                            </Button>
                            <ProfileMenu/>
                        </div>
                    </div>
                </div>
                <Modal open={this.state.showModal} close={this.closeModalHandler}>
                    <div>ghbdnt</div>
                </Modal>
            </div>
        );
    }
}

export default Header;