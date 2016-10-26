import { Component, Injectable, OnInit } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { DataService, Country } from "./data.service";


@Component({
    selector: "my-app",
    providers: [DataService],
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit  {
    private _categoricalSource: ObservableArray<Country>;

    constructor(private _dataService: DataService) { }

    get categoricalSource(): ObservableArray<Country> {
        return this._categoricalSource;
    }

    ngOnInit() {
        this._categoricalSource = new ObservableArray(this._dataService.getCategoricalSource());
    }
}
