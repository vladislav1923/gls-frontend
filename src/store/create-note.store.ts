import {createStore} from 'redux';
import {ActionTypes} from '../enums/action-types.enum';
import NoteModel from '../models/note.model';

const createNoteReducer = (state: NoteModel = new NoteModel(), action: {type: ActionTypes, data: NoteModel}) => {
    switch(action.type) {
        case ActionTypes.change:
            return Object.assign(state, action.data);
        default:
            return state;
    }
};

export const createNoteStore = createStore(createNoteReducer);
