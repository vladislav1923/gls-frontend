import React, {Component} from 'react';
import './button.less';

class Button extends Component {
    constructor(props: Readonly<{}>) {
        super(props)
    }

    render() {
        return (
            <button className="button">
                {this.props.children}
            </button>
        );
    }
}

export default Button;