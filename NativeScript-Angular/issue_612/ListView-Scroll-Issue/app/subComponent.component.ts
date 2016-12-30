import {Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from "@angular/core";

@Component({
	selector: "sub-component",
	templateUrl: "subComponent.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubComponentComponent implements OnChanges {
	@Input() myItem: number;
	count: number = 0;

	ngOnChanges(changes: SimpleChanges) {
		this.count = changes['myItem'].currentValue;
	}
}
