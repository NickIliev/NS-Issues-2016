// >> chart-angular-pie-series
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Car } from '../car';
import { ObservableArray } from "data/observable-array";

@Component({
    moduleId: module.id,
    selector: 'chart-series-pie',
    providers: [DataService],
    templateUrl: 'chart-series-pie.component.html'
})
export class ChartSeriesPieComponent implements OnInit {
    private _pieSource: ObservableArray<Car>;

    constructor(private _dataService: DataService) {

    }

    get pieSource(): ObservableArray<Car> {
        return this._pieSource;
    }

    ngOnInit() {
        this._pieSource = new ObservableArray(this._dataService.getPieSource());
    }
}
// << chart-angular-pie-series