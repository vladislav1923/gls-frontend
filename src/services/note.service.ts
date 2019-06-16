import {BaseService} from './base.service';
import NoteModel from '../models/note.model';
import ResponseModel from "../models/response.model";

export class NoteService extends BaseService {

    public async getNotesList(): Promise<ResponseModel<NoteModel>> {
        return await this.getList('notes', NoteModel);
    }

    public async parseUrl(url: string): Promise<ResponseModel<NoteModel>> {
        const encodedUrl = encodeURI(url);

        return await this.get(`parse?url=${encodedUrl}`, NoteModel);
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

}

