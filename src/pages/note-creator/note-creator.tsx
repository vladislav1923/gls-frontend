import React, {Component} from 'react';
import './note-creator.less';
import Button from "../../components/button/button";

type Props = {}

type State = {
    link: string,
    errorLinkMessage: string | null,
    linkParseProgress: boolean
}

class NoteCreator extends Component<Props, State> {

    private readonly linkRegexp = /^((?:https?:\/\/)[^./]+(?:\.[^./]+)+(?:\/.*)?)$/;

    constructor(props: Props) {
        super(props);
        this.state = {
            link: '',
            errorLinkMessage: null,
            linkParseProgress: false
        };
    }

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
                <div className="step">
                    <h2>Шаг 1 / Введите ссылку</h2>
                    <span className="sub-header">
                        Ссылка должна вести на статью, которую вы хотите добавить.
                        Пример ссылки: https://habr.com/ru/post/437108/
                    </span>
                    <div className="grid">
                        <div className="col-8_sm-12">
                            <label>
                                <input type="text" onFocus={this.onChangeLinkHandler} onChange={this.onChangeLinkHandler}
                                       placeholder="Введите ссылку"/>
                                <div className="error-label">{this.state.errorLinkMessage}</div>
                            </label>
                        </div>
                        <div className="col-4_sm-12">
                            <Button process={this.state.linkParseProgress} color="white" size="lg"
                                    onClick={this.parsePageByLink}>
                                <span className="add-link-button-text">Следующий шаг</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NoteCreator;
