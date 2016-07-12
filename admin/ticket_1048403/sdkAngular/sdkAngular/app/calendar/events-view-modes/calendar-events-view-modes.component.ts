import { OptionsExampleBase } from "../../options-example-base";
import {Component, OnInit, Inject} from "@angular/core";
import { Router } from '@angular/router';
import {CalendarEventsService} from "../calendar-events.service";
import { OptionsService } from "../../navigation/options/options.service";
import calendarModule = require("nativescript-telerik-ui-pro/calendar");
import { Page } from "ui/page";
import * as applicationModule from "application";

@Component({
    moduleId: module.id,
    selector: "calendar-events-view-modes",
    templateUrl: "calendar-events-view-modes.component.html",
    providers: [CalendarEventsService]
})

export class CalendarEventsViewModesComponent extends OptionsExampleBase implements OnInit {
    private _events: Array<calendarModule.CalendarEvent>;
    private _calendar: calendarModule.RadCalendar;
    private _optionsParamName: string;
    private _eventsViewMode;
    constructor( @Inject(Page) private _page: Page, private _calendarService: CalendarEventsService,
        private _optionsService: OptionsService, private _router: Router) {
        super();
        if (applicationModule.ios) {            
            this._page.on("navigatingTo", this.onNavigatingTo, this);
            this._optionsParamName = "eventsViewMode";
            this._optionsService.paramName = this._optionsParamName;
            this.router = _router;
            this.navigationParameters = { selectedIndex: 0, paramName: this._optionsParamName, items: ["None", "Inline", "Popover (iPad only)"] };
        }
        this._eventsViewMode = calendarModule.CalendarEventsViewMode.None;
    }
    
    get eventSource() {
        return this._events;
    }
    
    get eventsViewMode() {
        return this._eventsViewMode;
    }
    
    ngOnInit() {
        this._events = this._calendarService.getCalendarEvents();
        this._calendar = <calendarModule.RadCalendar>this._page.getViewById("calendar");
    }   
    
    onNoneTap() {
        this._eventsViewMode = calendarModule.CalendarEventsViewMode.None;
    }
    
    onInlineTap() {
        this._eventsViewMode = calendarModule.CalendarEventsViewMode.Inline;
    }
    
    onPopoverTap() {       
        this._eventsViewMode = calendarModule.CalendarEventsViewMode.Popover;
    }
    
     public onNavigatingTo(args) {
        if (args.isBackNavigation) {
            if (this._optionsService.paramName === this._optionsParamName) {
                switch (this._optionsService.paramValue) {
                    case "None":
                        this.onNoneTap();
                        this.navigationParameters.selectedIndex = 0;
                        break;
                    case "Inline":
                        this.onInlineTap();
                        this.navigationParameters.selectedIndex = 1;
                        break;
                    case "Popover":
                        if (UIDevice.currentDevice().userInterfaceIdiom === UIUserInterfaceIdiomPad) {
                            this.onPopoverTap();
                            this.navigationParameters.selectedIndex = 2;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
}