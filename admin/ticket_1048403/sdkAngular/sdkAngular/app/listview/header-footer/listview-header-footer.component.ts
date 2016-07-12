import {Component, OnInit} from "@angular/core";
import {ObservableArray} from "data/observable-array";
import {DataItem} from "../dataItem";
import {DataItemService} from "../dataItem.service";

@Component({
    moduleId: module.id,
    selector: "listview-header-footer",
    providers: [DataItemService],
    templateUrl: "listview-header-footer.component.html",
    styleUrls: ["listview-header-footer.component.css"]
})
export class ListViewHeaderFooterComponent implements OnInit {
    private _dataItems: ObservableArray<DataItem>;

    constructor(private _dataItemService: DataItemService) {
    }

    get dataItems(): ObservableArray<DataItem> {
        return this._dataItems;
    }

    ngOnInit() {
        this._dataItems = new ObservableArray(this._dataItemService.getIdenticalDataItems(10));
    }
}