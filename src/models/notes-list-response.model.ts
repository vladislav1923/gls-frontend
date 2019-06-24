import {jsonProperty, Serializable} from 'ts-serializable';
import NoteModel from './note.model';

class NotesListResponseModel extends Serializable {

    @jsonProperty([NoteModel])
    public list: NoteModel[] = [];

    @jsonProperty(Number)
    public page: number = 0;

    @jsonProperty(Number)
    public notesPerPage: number = 0;

    @jsonProperty(Number)
    public total: number = 0;

}

export default NotesListResponseModel;
