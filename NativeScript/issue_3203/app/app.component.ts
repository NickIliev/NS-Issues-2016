import {Component, ViewChild, ElementRef, OnInit} from "@angular/core";
//import { ScrollView } from "ui/scroll-view";
import * as moment from "moment";
import { BookingSharedComponent } from "./shared/booking/booking.component";


@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.css"]
    
})
export class AppComponent {

    public intervals: any = [];
    public bookings = [{"marginTop": 0, text:"marginTop:0 => 12am"},{"marginTop": 160, text:"marginTop:160 => 1am"}, {"marginTop": 640, text:"marginTop:640 => 4am"}, {"marginTop": 1600, text:"marginTop:1600 => 10am"}, {"marginTop": 2400, text:"marginTop:2400 => 15pm"}, {"marginTop": 3200, text:"marginTop:3200 => 8pm"}, {"marginTop": 3680, text:"marginTop:3680 => 23pm"}];
    
    //@ViewChild("scrollcontainer") _scrollcontainer: ElementRef;
    //private scrollcontainer: ScrollView;

    buildIntervals(autoScroll?: Boolean) {
        /**
         * Sets the minHeight and Height of the appointment screen container
         */
        //this.scrollcontainer = this._scrollcontainer.nativeElement;
        // this.appointmentscontainer = this._appointmentscontainer.nativeElement;
        // this.appointmentscontainer.minHeight = this.appointmentsHelper.maxHeight()
        // this.appointmentscontainer.height = this.appointmentsHelper.maxHeight()

        /**
         * Reset the intervals
         */
        this.intervals = [];

        let date = moment().hour(0).minute(0).seconds(0).millisecond(0);

        /**
         * Builds time interval array to display each time slot on the appointment screen.
         */
        for (var i = 0; i < ((24 * 60) / 15); ++i) {
            this.intervals.push({
                index: i,
                time: date.format('hh:mma'),
                available: false
            });
            date.add(15, 'minutes');
        }


    }
    ngOnInit(){
        this.buildIntervals();
        console.log('BOOKINGS =>', JSON.stringify(this.bookings))
    }
}
