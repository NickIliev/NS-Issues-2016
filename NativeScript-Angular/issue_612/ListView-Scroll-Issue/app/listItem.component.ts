import {Component, ChangeDetectionStrategy, Input} from "@angular/core";

@Component({
	selector: "list-item-component",
	templateUrl: "listItem.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent {
	@Input() myItem: number;
}
