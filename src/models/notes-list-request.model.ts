class NotesListRequestModel {

    public page: number = 1;
    public notesPerPage: number = 1;
    public searchString: string | null = null;
    public searchKeywords: string[] = [];

    constructor(page: number, notesPerPage: number,
                searchString: string | null, searchKeywords: string[]) {
        this.page = page;
        this.notesPerPage = notesPerPage;
        this.searchString = searchString;
        this.searchKeywords = searchKeywords;
    }

}

export default NotesListRequestModel;
