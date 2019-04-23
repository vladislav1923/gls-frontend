import NoteModel from '../models/note.model';

export enum actionTypes {
    clear = 'clear',
    change = 'change'
}

export const createNoteReducer = (state: NoteModel = new NoteModel(), action: {type: actionTypes, data: NoteModel}) => {
    switch(action.type) {
        case actionTypes.change:
            return Object.assign(state, action.data);
        case actionTypes.clear:
            return Object.assign(state, new NoteModel());
        default:
            return state;
    }
};
