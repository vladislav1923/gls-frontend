import {EventTypesEnum} from '../enums/event-types.enum';

export class EventService {

    static readonly events: EventTarget = document.createElement("div");

    static addEventListener(
        type: EventTypesEnum,
        listener: EventListenerOrEventListenerObject | null,
        options?: boolean | AddEventListenerOptions
    ): void {
        this.events.addEventListener(String(type), listener, options);
    }

    static dispatchEvent(type: EventTypesEnum, data: unknown): boolean {
        return this.events.dispatchEvent(new CustomEvent(String(type), { detail: data }));
    }

    static removeEventListener(
        type: EventTypesEnum,
        callback: EventListenerOrEventListenerObject | null,
        options?: EventListenerOptions | boolean
    ): void {
        this.events.removeEventListener(String(type), callback, options);
    }
}
