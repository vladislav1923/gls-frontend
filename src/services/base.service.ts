import {Serializable} from 'ts-serializable';
import ResponseModel from '../models/response.model';

export class BaseService {

    private readonly headers = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'credentials': 'include'
    });

    protected async getList<T extends Serializable>(url: string, model: new () => T): Promise<ResponseModel<T>> {
        try {
            const response = await fetch(`http://localhost:8000/${url}`, {
                method: 'GET',
                headers: this.headers
            });

            let result = false;
            let data: T[] | null = null;

            if (response.ok) {
                const jsonArray = await response.json();
                data = (jsonArray as object[]).map((item: object) => new model().fromJSON(item));
                result = true;
            }

            return new ResponseModel(result, response, data);
        } catch(e) {
            return new ResponseModel(false);
        }
    }

    protected async get<T extends Serializable>(url: string, model: new () => T): Promise<ResponseModel<T>> {
        try {
            const response = await fetch(`http://localhost:8000/${url}`, {
                method: 'GET',
                headers: this.headers
            });

            let result = false;
            let data: T | null = null;

            if (response.ok) {
                data =  new model().fromJSON(await response.json());
                result = true;
            }

            return new ResponseModel(result, response, data);
        } catch(e) {
            return new ResponseModel(false);
        }
    }

    protected async post<T extends Serializable>(url: string, requestData: object, model: new () => T): Promise<ResponseModel<T>> {
        try {
            const response = await fetch(`http://localhost:8000/${url}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(requestData)
            });

            let result = false;
            let data: T | null = null;

            if (response.ok) {
                data =  new model().fromJSON(await response.json());
                result = true;
            }

            return new ResponseModel(result, response, data);
        } catch(e) {
            return new ResponseModel(false);
        }
    }

}
