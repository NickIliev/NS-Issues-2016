// >> chart-angular-spline-series-component
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Country } from '../country';
import { ObservableArray } from "data/observable-array";

@Component({
    moduleId: module.id,
    selector: 'chart-series-spline',
    providers: [DataService],
    templateUrl: 'chart-series-spline.component.html'
})
export class ChartSeriesSplineComponent implements OnInit {
    private _categoricalSource: ObservableArray<Country>;

    constructor(private _dataService: DataService) {

    }

    get categoricalSource(): ObservableArray<Country> {
        return this._categoricalSource;
    }

    ngOnInit() {
        this._categoricalSource = new ObservableArray(this._dataService.getCategoricalSource());
    }
}
// << chart-angular-spline-series-component