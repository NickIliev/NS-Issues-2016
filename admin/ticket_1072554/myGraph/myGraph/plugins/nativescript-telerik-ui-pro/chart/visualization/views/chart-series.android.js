var seriesCommonModule = require("./chart-series-common");
var utilsModule = require("utils/utils");
var PieSeries = (function (_super) {
    __extends(PieSeries, _super);
    function PieSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PieSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.pieChart.PieSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return PieSeries;
})(seriesCommonModule.PieSeries);
exports.PieSeries = PieSeries;
var DonutSeries = (function (_super) {
    __extends(DonutSeries, _super);
    function DonutSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(DonutSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.pieChart.DoughnutSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return DonutSeries;
})(seriesCommonModule.DonutSeries);
exports.DonutSeries = DonutSeries;
var LineSeries = (function (_super) {
    __extends(LineSeries, _super);
    function LineSeries() {
        _super.call(this);
    }
    Object.defineProperty(LineSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.LineSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return LineSeries;
})(seriesCommonModule.CategoricalSeries);
exports.LineSeries = LineSeries;
var OhlcSeries = (function (_super) {
    __extends(OhlcSeries, _super);
    function OhlcSeries() {
        _super.call(this);
    }
    Object.defineProperty(OhlcSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.OhlcSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    OhlcSeries.prototype.onValuePropertyChanged = function (data) {
    };
    OhlcSeries.prototype.onHighPropertyNameChanged = function (data) {
        if (!data.newValue) {
            return;
        }
        var highPropertyName = this.highPropertyName;
        var binding = new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[highPropertyName];
            }
        }));
        this.android.setHighBinding(binding);
    };
    OhlcSeries.prototype.onLowPropertyNameChanged = function (data) {
        var lowPropertyName = this.lowPropertyName;
        var binding = new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[lowPropertyName];
            }
        }));
        this.android.setLowBinding(binding);
    };
    OhlcSeries.prototype.onOpenPropertyNameChanged = function (data) {
        var openPropertyName = this.openPropertyName;
        var binding = new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[openPropertyName];
            }
        }));
        this.android.setOpenBinding(binding);
    };
    OhlcSeries.prototype.onClosePropertyNameChanged = function (data) {
        var closePropertyName = this.closePropertyName;
        var binding = new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[closePropertyName];
            }
        }));
        this.android.setCloseBinding(binding);
    };
    return OhlcSeries;
})(seriesCommonModule.OhlcSeries);
exports.OhlcSeries = OhlcSeries;
var CandlestickSeries = (function (_super) {
    __extends(CandlestickSeries, _super);
    function CandlestickSeries() {
        _super.call(this);
    }
    Object.defineProperty(CandlestickSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.CandlestickSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return CandlestickSeries;
})(OhlcSeries);
exports.CandlestickSeries = CandlestickSeries;
var SplineSeries = (function (_super) {
    __extends(SplineSeries, _super);
    function SplineSeries() {
        _super.call(this);
    }
    Object.defineProperty(SplineSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.SplineSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return SplineSeries;
})(LineSeries);
exports.SplineSeries = SplineSeries;
var AreaSeries = (function (_super) {
    __extends(AreaSeries, _super);
    function AreaSeries() {
        _super.call(this);
    }
    Object.defineProperty(AreaSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.AreaSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return AreaSeries;
})(seriesCommonModule.CategoricalSeries);
exports.AreaSeries = AreaSeries;
var SplineAreaSeries = (function (_super) {
    __extends(SplineAreaSeries, _super);
    function SplineAreaSeries() {
        _super.call(this);
    }
    Object.defineProperty(SplineAreaSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.SplineAreaSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return SplineAreaSeries;
})(AreaSeries);
exports.SplineAreaSeries = SplineAreaSeries;
var ScatterBubbleSeries = (function (_super) {
    __extends(ScatterBubbleSeries, _super);
    function ScatterBubbleSeries() {
        _super.call(this);
    }
    Object.defineProperty(ScatterBubbleSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.scatter.ScatterBubbleSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return ScatterBubbleSeries;
})(seriesCommonModule.ScatterBubbleSeries);
exports.ScatterBubbleSeries = ScatterBubbleSeries;
var BubbleSeries = (function (_super) {
    __extends(BubbleSeries, _super);
    function BubbleSeries() {
        _super.call(this);
    }
    Object.defineProperty(BubbleSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.BubbleSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    BubbleSeries.prototype.onBubbleScaleChanged = function (data) {
        if (data.newValue) {
            //todo: we use (scale^2) because of bug in Android scale calculation. Update this hack when it is fixed.
            this.android.setBubbleScale(Math.pow(data.newValue * utilsModule.layout.getDisplayDensity(), 2));
        }
    };
    BubbleSeries.prototype.onBubbleSizePropertyChanged = function (data) {
        if (!this.bubbleSizeProperty) {
            return;
        }
        var propertyName = this.bubbleSizeProperty;
        var binding = new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[propertyName];
            }
        }));
        this.android.setBubbleSizeBinding(binding);
    };
    return BubbleSeries;
})(seriesCommonModule.BubbleSeries);
exports.BubbleSeries = BubbleSeries;
var ScatterSeries = (function (_super) {
    __extends(ScatterSeries, _super);
    function ScatterSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ScatterSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.scatter.ScatterPointSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return ScatterSeries;
})(seriesCommonModule.ScatterSeries);
exports.ScatterSeries = ScatterSeries;
var BarSeries = (function (_super) {
    __extends(BarSeries, _super);
    function BarSeries() {
        _super.call(this);
    }
    Object.defineProperty(BarSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.BarSeries();
                this._android.setCombineMode(com.telerik.widget.chart.engine.series.combination.ChartSeriesCombineMode.CLUSTER);
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return BarSeries;
})(seriesCommonModule.CategoricalSeries);
exports.BarSeries = BarSeries;
var RangeBarSeries = (function (_super) {
    __extends(RangeBarSeries, _super);
    function RangeBarSeries() {
        _super.call(this);
    }
    Object.defineProperty(RangeBarSeries.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.series.categorical.RangeBarSeries();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RangeBarSeries.prototype.onValuePropertyChanged = function (data) {
        console.log("WARNING: Range bar series doesn't use valueProperty property.");
    };
    RangeBarSeries.prototype.onHighPropertyNameChanged = function (data) {
        if (!data.newValue) {
            return;
        }
        var highPropertyName = this.highPropertyName;
        var binding = new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[highPropertyName];
            }
        }));
        this.android.setHighBinding(binding);
    };
    RangeBarSeries.prototype.onLowPropertyNameChanged = function (data) {
        var lowPropertyName = this.lowPropertyName;
        var binding = new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[lowPropertyName];
            }
        }));
        this.android.setLowBinding(binding);
    };
    return RangeBarSeries;
})(seriesCommonModule.RangeBarSeries);
exports.RangeBarSeries = RangeBarSeries;
