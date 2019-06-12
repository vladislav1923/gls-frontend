import {createStore} from 'redux';
import {ActionTypesEnum} from '../enums/action-types.enum';
import NoteModel from '../models/note.model';

const createNoteReducer = (state: NoteModel = new NoteModel(), action: {type: ActionTypesEnum, data: NoteModel}) => {
    switch(action.type) {
        case ActionTypesEnum.change:
            return Object.assign(state, action.data);
        default:
            return state;
    }
};

export const createNoteStore = createStore(createNoteReducer);
