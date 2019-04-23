import {jsonProperty, Serializable} from 'ts-serializable';

class NoteModel extends Serializable {

    @jsonProperty(String, null)
    public id: string | null = null;

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

    @jsonProperty(String, null)
    public group: string | null = null;

    @jsonProperty(Boolean)
    public isClicked: boolean = false;
}

export default NoteModel;
