class ResponseModel<T> {
    public result: boolean;
    public response: Response | null = null;
    public data: T | T[] | null;

    constructor(result: boolean, response: Response | null = null, data: T | T[] | null = null) {
        this.result = result;
        this.response = response;
        this.data = data;
    }
}

export default ResponseModel;
