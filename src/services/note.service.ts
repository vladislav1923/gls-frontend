import {BaseService} from './base.service';
import NoteModel from '../models/note.model';
import ResponseModel from '../models/response.model';
import NotesListRequestModel from '../models/notes-list-request.model';
import NotesListResponseModel from '../models/notes-list-response.model';
import KeywordsListResponseModel from '../models/keywords-list-response.model';

export class NoteService extends BaseService {

    public async getNotesList(data: NotesListRequestModel): Promise<ResponseModel<NotesListResponseModel>> {
        let params = `page=${data.page}&notesPerPage=${data.notesPerPage}`;

        if (data.searchString) {
            params += `&searchString=${data.searchString}`;
        }

        if (data.searchKeywords.length > 0) {
            params += `&searchKeywords=${data.searchKeywords.join(',')}`;
        }

        return await this.get(`notes?${encodeURI(params)}`, NotesListResponseModel);
    }

    public async parseUrl(url: string): Promise<ResponseModel<NoteModel>> {
        return await this.get(`parse?url=${encodeURI(url)}`, NoteModel);
    }

    public async createNote(data: NoteModel): Promise<ResponseModel<NoteModel>> {
        return await this.post(`notes`, data, NoteModel);
    }

    public async updateNote(data: NoteModel): Promise<ResponseModel<NoteModel>> {
        return await this.put(`notes`, data, NoteModel);
    }

    public async deleteNote(noteId: string): Promise<ResponseModel<NoteModel>> {
        return await this.delete(`notes?id=${noteId}`, NoteModel);
    }

    public async getKeywordsList(): Promise<ResponseModel<KeywordsListResponseModel>> {
        return await this.get(`notes/keywords`, KeywordsListResponseModel);
    }

}

