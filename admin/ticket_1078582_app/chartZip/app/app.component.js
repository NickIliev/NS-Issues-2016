"use strict";
var core_1 = require("@angular/core");
var stock_service_1 = require("./stock.service");
var observable_array_1 = require("data/observable-array");
var AppComponent = (function () {
    function AppComponent(stockService) {
        this.stockService = stockService;
        this.Today = new Date();
        // private AxisMin = this.Today.toDateString() + ' 07:00:00 AM';
        // private AxisMax = this.Today.toDateString() + ' 07:00:00 PM';
        this.StockMax = 18;
        this.StockMin = 13;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.slicestock = this.CreateArray(this.stockService.getStock());
        this._liveStock = new observable_array_1.ObservableArray(this.slicestock);
    };
    Object.defineProperty(AppComponent.prototype, "LiveStock", {
        get: function () {
            return this._liveStock;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.CreateArray = function (data) {
        var items = [];
        try {
            // console.log(json);
            // var data = JSON.parse(json);
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                items.push(StockData.fromJson(data[i]));
            }
        }
        catch (ex) {
            console.log(ex);
        }
        return items;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "app.component.html",
    }),
    __metadata("design:paramtypes", [stock_service_1.StockService])
], AppComponent);
exports.AppComponent = AppComponent;
var StockData = (function () {
    function StockData(dateTime, indexPrice, dateTimeAsDate) {
        this.dateTime = dateTime;
        this.indexPrice = indexPrice;
        this.dateTimeAsDate = dateTimeAsDate;
    }
    StockData.fromJson = function (data) {
        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        var dateArray = reggie.exec(data.dateTime);
        return new StockData(new Date((+dateArray[1]), (+dateArray[2]) - 1, // Careful, month starts at 0!
        (+dateArray[3]), (+dateArray[4]), (+dateArray[5] + 3), (+dateArray[6])), data.indexPrice, data.dateTimeAsDate);
    };
    return StockData;
}());
exports.StockData = StockData;
//# sourceMappingURL=app.component.js.map