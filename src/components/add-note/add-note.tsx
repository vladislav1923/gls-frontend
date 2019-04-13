import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './add-note.less';
import Button from "../button/button";
import Modal from "../modal/modal";

type Props = {}

type State = {
    showModal: boolean,
    link: string,
    errorLinkMessage: string | null,
    linkParseProgress: boolean
}

class AddNote extends Component<Props, State> {

    private readonly linkRegexp = /^((?:https?:\/\/)[^./]+(?:\.[^./]+)+(?:\/.*)?)$/;

    constructor(props: Props) {
        super(props);
        this.state = {
            showModal: false,
            link: '',
            errorLinkMessage: null,
            linkParseProgress: false
        };
    }

    public showModalHandler = (): void => {
        this.setState({showModal: true});
    };

    public closeModalHandler = (): void => {
        this.setState({showModal: false});
    };

    public onChangeLinkHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            link: event.target.value,
            errorLinkMessage: ''
        });
    };

    public parsePageByLink = (): void => {
        if (this.validateLink()) {
            this.setState({linkParseProgress: true});
        }
    };

    private validateLink(): boolean {
        if (this.state.link.length === 0) {
            this.setState({errorLinkMessage: 'Не вижу ссылки'});
            return false;
        }

        const regExp = new RegExp(this.linkRegexp);
        if (!this.state.link.match(regExp)) {
            this.setState({errorLinkMessage: 'Не похоже на ссылку'});
            return false;
        }

        return true;
    }

    render() {
        return (
            <div>
                <Button color="blue" size="md" onClick={this.showModalHandler}>
                    <FontAwesomeIcon icon="plus"/>
                    <span className="add-link-button-text">Добавить</span>
                </Button>
                <Modal open={this.state.showModal} close={this.closeModalHandler}>
                    <div className="form">
                        <h2>Введите ссылку</h2>
                        <span className="sub-header">
                            Ссылка должна вести на статью, которую вы хотите добавить.
                            Пример ссылки: https://yandex.ru
                        </span>
                        <label className="margin-bottom-md">
                            <input type="text" onFocus={this.onChangeLinkHandler} onChange={this.onChangeLinkHandler} placeholder="Введите ссылку"/>
                            <div className="error-label">{this.state.errorLinkMessage}</div>
                        </label>
                        <Button process={this.state.linkParseProgress} color="white" size="lg" onClick={this.parsePageByLink}>
                            <span className="add-link-button-text">Добавить ссылку</span>
                        </Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default AddNote;