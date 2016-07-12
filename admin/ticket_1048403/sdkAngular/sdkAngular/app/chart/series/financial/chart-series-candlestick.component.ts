// >> chart-angular-candlestick-series-component
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Currency } from '../currency';
import { ObservableArray } from "data/observable-array";

@Component({
    moduleId: module.id,
    selector: 'chart-series-candlestick',
    providers: [DataService],
    templateUrl: 'chart-series-candlestick.component.html'
})
export class ChartSeriesCandlestickComponent implements OnInit {
    private _candleStickSourceItems: ObservableArray<Currency>;

    constructor(private _dataService: DataService) {

    }

    get candleStickSourceItems(): ObservableArray<Currency> {
        return this._candleStickSourceItems;
    }

    ngOnInit() {
        this._candleStickSourceItems = new ObservableArray(this._dataService.getCandleStickSourceItems());
    }
}
// << chart-angular-candlestick-series-component