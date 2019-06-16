import React, {Component, MouseEvent} from 'react';
import NoteModel from '../../models/note.model';
import {getDate} from '../../helpers/tools';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './note-preview.less';

type Props = {
    note: NoteModel,
    onKeywordChoose: (keyword: string) => void,
    onEdit: (note: NoteModel) => void,
    onDelete: (noteId: string) => void
}

class NotePreview extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public goToLink = (): void => {
        window.open(this.props.note.url as string);
    };

    public onKeywordChoose = (e: MouseEvent): void => {
        e.stopPropagation();
        this.props.onKeywordChoose((e.target as HTMLSpanElement).innerText);
    };

    public onEdit = (e: MouseEvent): void => {
        e.stopPropagation();
        this.props.onEdit(this.props.note);
    };

    public onDelete = (e: MouseEvent): void => {
        e.stopPropagation();
        this.props.onDelete(this.props.note._id as string);
    };

    render() {
        return (
            <div className="note-preview-wrapper" onClick={this.goToLink}>
                <div className="note-preview">
                    <div className="note-preview-controls">
                        <div className="note-preview-control mb-8" onClick={this.onEdit}>
                            <FontAwesomeIcon icon="pen" size="1x" />
                        </div>
                        <div className="note-preview-control" onClick={this.onDelete}>
                            <FontAwesomeIcon icon="trash-alt" size="1x" />
                        </div>
                    </div>
                    <div className="note-preview-image">
                        <img src={this.props.note.imageUrl as string} alt=""/>
                    </div>
                    <div className="note-preview-text">
                        <span className="note-preview-title mb-8">{this.props.note.title}</span>
                        <span className="note-preview-desc mb-16">{this.props.note.description}</span>
                        <div className="grid-noGutter">
                            {this.props.note.keywords.map((keyword: string) =>
                                <span key={keyword.toString()} className="note-preview-tag"
                                      onClick={this.onKeywordChoose}>{keyword}</span>
                            )}
                        </div>
                        <div className="grid-noGutter">
                            <div className="col-6">
                                <span className="note-preview-desc">{getDate(this.props.note.createDate)}</span>
                            </div>
                            <div className="col-6">
                                {this.props.note.isClicked &&
                                    <div className="grid-noGutter grid-right grid-middle note-preview-clickable done">
                                        <FontAwesomeIcon icon="check-circle" size="1x" />
                                        <span>Прочитано</span>
                                    </div>
                                }
                                {!this.props.note.isClicked &&
                                    <div className="grid-noGutter grid-right grid-middle note-preview-clickable">
                                        <FontAwesomeIcon icon="times-circle" size="1x" />
                                        <span>Не прочитано</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default NotePreview;

