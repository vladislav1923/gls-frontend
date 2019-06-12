import {AlertTypesEnum} from '../enums/alert-types.enum';

export class AlertModel {
    public type: AlertTypesEnum;
    public title: string;
    public subtitle: string;

    constructor(type: AlertTypesEnum, title: string, subtitle: string) {
        this.type = type;
        this.title = title;
        this.subtitle = subtitle;
    }
}
