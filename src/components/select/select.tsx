import React, {Component} from 'react';
import {isMobile} from 'react-device-detect';
import './select.less';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

type Props = {
    value: string,
    list: string[],
    onChange: (value: string) => void,
    placeholder?: string
}

type State = {
    isOpen: boolean
}

class Select extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            isOpen: false
        }
    }

    render() {
        return (
            <div className="select-wrapper">
                {isMobile ?
                    <select name="" id="" value={this.props.value} onChange={(e) => this.props.onChange(e.target.value)}>
                        <option value="">{this.props.placeholder || 'Не выбрано'}</option>
                        {this.props.list.map((item: string) =>
                            <option key={item} value={item}>{item}</option>
                        )}
                    </select> :
                    <div className="select" onClick={() => this.setState({isOpen: !this.state.isOpen})}>
                        <div className="value">{this.props.value || this.props.placeholder || 'Не выбрано'}</div>
                        <ul className={'list' + (this.state.isOpen ? ' active' : '')}>
                            {this.props.list.map((item: string) =>
                                <li key={item} className="option" onClick={() => this.props.onChange(item)}>{item}</li>
                            )}
                        </ul>
                        <div className={'back-plate' + (this.state.isOpen ? ' active' : '')}
                             onClick={() => this.setState({isOpen: false})}/>
                    </div>
                }

                <div className={'arrow' + (this.state.isOpen ? ' active' : '')}>
                    <FontAwesomeIcon icon="chevron-down" size="lg" />
                </div>
            </div>
        )
    }

}

export default Select;
