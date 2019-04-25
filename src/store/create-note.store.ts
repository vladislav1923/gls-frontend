import {createStore} from 'redux';
import NoteModel from '../models/note.model';

export enum actionTypes {
    clear = 'clear',
    change = 'change'
}

const createNoteReducer = (state: NoteModel = new NoteModel(), action: {type: actionTypes, data: NoteModel}) => {
    switch(action.type) {
        case actionTypes.change:
            return Object.assign(state, action.data);
        case actionTypes.clear:
            return Object.assign(state, new NoteModel());
        default:
            return state;
    }
};

export const createNoteStore = createStore(createNoteReducer);
