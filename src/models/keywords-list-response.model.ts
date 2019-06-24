import {jsonProperty, Serializable} from 'ts-serializable';
import NoteModel from './note.model';

class KeywordsListResponseModel extends Serializable {

    @jsonProperty([String])
    public list: string[] = [];

}

export default KeywordsListResponseModel;
