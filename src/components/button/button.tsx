import React, {Component} from 'react';
import './button.less';

type Props = {
    process?: boolean,
    color: 'white' | 'blue',
    size: 'md' | 'lg',
    onClick: () => void
}

class Button extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <button className={`button ${this.props.color} ${this.props.size} ${this.props.process && 'process'}`}
                    onClick={this.props.onClick}>
                {this.props.process || this.props.children}
            </button>
        );
    }
}

export default Button;