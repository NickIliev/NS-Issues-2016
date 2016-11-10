import {
    TemplateRef,
    ElementRef,
    EventEmitter,
    EmbeddedViewRef
} from "@angular/core";
import { RadCalendar } from './../';

/**
* Represents the RadCalendar component. RadCalendar is based on the
* already familiar native Android and iOS components from Telerik UI for Android
* and Telerik UI for iOS. The component exposes all major features supported
* by the native controls through a unified API suitable for NativeScript developers.
*/
export class RadCalendarComponent {

    /**
     * Gets or sets the current event source in the {@link RadCalendar} instance.
     */
    eventSource: any;

    /**
     * Gets the NativeScript {@link RadListView} element.
     */
    calendar: RadCalendar;
}

/**
 * Directives identifying the RadCalendar.
 */
export const CALENDAR_DIRECTIVES;