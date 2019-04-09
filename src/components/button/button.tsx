import React, {Component} from 'react';
import './button.less';

type Props = {
    onClick: () => void
}

class Button extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <button className="button" onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
}

export default Button;