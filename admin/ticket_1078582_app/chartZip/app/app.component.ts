import { Component, OnInit } from "@angular/core";
import { StockService } from './stock.service'
import { ObservableArray } from "data/observable-array";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public _liveStock: ObservableArray<StockData>;
    private slicestock: StockData[];
    private Today = new Date();
    // private AxisMin = this.Today.toDateString() + ' 07:00:00 AM';
    // private AxisMax = this.Today.toDateString() + ' 07:00:00 PM';

    private StockMax: number = 18;
    private StockMin: number = 13;
    errorMessage: string;
    constructor(private stockService: StockService) { }

    ngOnInit() {


            this.slicestock = this.CreateArray( this.stockService.getStock());
            this._liveStock = new ObservableArray(this.slicestock);

    }
    get LiveStock(): ObservableArray<StockData> {
        return this._liveStock;
    }

    CreateArray(data: string): StockData[] {
        var items: StockData[] = [];
        try {
           // console.log(json);
           // var data = JSON.parse(json);
            console.log(data);
            for (var i = 0; i < data.length; i++) {

                items.push(StockData.fromJson(data[i]));
                // if (this.StockMax == 0 || this.StockMax < data[i].indexPrice)
                // {
                //     this.StockMax=data[i].indexPrice;
                // }

                // if (this.StockMin == 0 || this.StockMin > data[i].indexPrice)
                // {
                //     this.StockMin=data[i].indexPrice;
                // }

            }

        }
        catch (ex) {
            console.log(ex);
        }
        return items;
    }
}

export class StockData {
    constructor(
        public dateTime: Date,
        public indexPrice: number,
        public dateTimeAsDate: string)
    { }

    static fromJson(data: any): StockData {
        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        var dateArray = reggie.exec(data.dateTime);

        return new StockData(new Date(
            (+dateArray[1]),
            (+dateArray[2]) - 1, // Careful, month starts at 0!
            (+dateArray[3]),
            (+dateArray[4]),
            (+dateArray[5]+3),
            (+dateArray[6])
        ), <number>data.indexPrice, data.dateTimeAsDate);
    }
}
