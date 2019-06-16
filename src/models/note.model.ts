import {jsonProperty, Serializable} from 'ts-serializable';

class NoteModel extends Serializable {

    @jsonProperty(String, null)
    public _id: string | null = null;

    @jsonProperty(String, null)
    public url: string | null = null;

    @jsonProperty(String, null)
    public title: string | null = null;

    @jsonProperty(String, null)
    public description: string | null = null;

    @jsonProperty(String, null)
    public imageUrl: string | null = null;

    @jsonProperty([String])
    public keywords: string[] = [];

    @jsonProperty(String, null)
    public language: string | null = null;

    @jsonProperty(Boolean)
    public isClicked: boolean = false;

    @jsonProperty(String, null)
    public createDate: string | null = null;
}

export default NoteModel;
