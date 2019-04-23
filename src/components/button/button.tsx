import React, {Component} from 'react';
import './button.less';
import Spinner from "../spinner/spinner";

type Props = {
    process?: boolean,
    color: 'white' | 'blue' | 'gray',
    size: 'md' | 'lg',
    fullWidth?: boolean
    onClick?: () => void
}

class Button extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <button className={`button ${this.props.color} ${this.props.size} ${this.props.fullWidth ? 'full-width' : ''}`}
                    onClick={this.props.onClick}>
                {!this.props.process ? this.props.children : <Spinner size="sm">Подождем...</Spinner>}
            </button>
        );
    }
}

export default Button;
