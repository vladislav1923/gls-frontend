import React, {Component} from 'react';
import './tag.less';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

type Props = {
    value: string,
    canDelete?: boolean,
    onDelete?: (value: string) => void
}

class Tag extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className='tag'>
                {this.props.value.length > 30 ? this.props.value.slice(0, 30) + '...' : this.props.value}
                {this.props.canDelete &&
                    <div className="delete-button"
                         onClick={() => this.props.onDelete && this.props.onDelete(this.props.value)}>
                        <FontAwesomeIcon icon="times" size="lg" />
                    </div>
                }
            </div>
        );
    }
}

export default Tag;
