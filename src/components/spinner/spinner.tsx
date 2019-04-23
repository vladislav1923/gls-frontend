import React, {Component} from 'react';
import './spinner.less';

type Props = {
    size: 'sm' | 'md'
}

class Spinner extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className="spinner-wrapper">
                <div className={'spinner ' + this.props.size}/>
                <span className={this.props.children ? 'show-text' : ''}>{this.props.children}</span>
            </div>
        );
    }
}

export default Spinner;
