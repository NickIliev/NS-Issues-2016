import { Component, Input} from "@angular/core";


@Component({
    selector: "ap-booking",
    templateUrl: "shared/booking/booking.component.html",
    styleUrls: ["shared/booking/booking.component.css"]
})
export class BookingSharedComponent {
	constructor(){}

    @Input() data: any;
    
}