import {AlertTypes} from '../enums/alert-types.enum';

export class AlertModel {
    public type: AlertTypes;
    public title: string;
    public subtitle: string;

    constructor(type: AlertTypes, title: string, subtitle: string) {
        this.type = type;
        this.title = title;
        this.subtitle = subtitle;
    }
}
