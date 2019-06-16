import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './accordion.less';

type Props = {
    title: string
};

type State = {
    isOpen: boolean
}

class Accordion extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    render() {
        return (
            <div className="accordion">
                <div className={'accordion-header' + (this.state.isOpen ? ' active' : '')}
                     onClick={() => {this.setState({isOpen: !this.state.isOpen})}}>
                    <span className="accordion-title">{this.props.title}</span>
                    <span className={'accordion-chevron' + (this.state.isOpen ? ' active' : '')}>
                        <FontAwesomeIcon icon="chevron-circle-down" size="lg"/>
                    </span>
                </div>
                <div className={'accordion-body' + (this.state.isOpen ? ' active' : '')}>
                    {this.props.children}
                </div>
            </div>
        )
    }

}

export default Accordion;
