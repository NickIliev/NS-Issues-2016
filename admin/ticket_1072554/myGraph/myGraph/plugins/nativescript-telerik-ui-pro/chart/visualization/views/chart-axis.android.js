var axisCommonModule = require("./chart-axis-common");
var publicEnumModule = require("../../misc/chart-public-enum");
var CategoricalAxis = (function (_super) {
    __extends(CategoricalAxis, _super);
    function CategoricalAxis() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CategoricalAxis.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.axes.CategoricalAxis();
                this._android.setCanApplyPalette(false);
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return CategoricalAxis;
})(axisCommonModule.CategoricalAxis);
exports.CategoricalAxis = CategoricalAxis;
var DateTimeContinuousAxis = (function (_super) {
    __extends(DateTimeContinuousAxis, _super);
    function DateTimeContinuousAxis() {
        _super.call(this);
    }
    Object.defineProperty(DateTimeContinuousAxis.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.axes.DateTimeContinuousAxis();
                this._android.setPlotMode(com.telerik.widget.chart.engine.axes.common.AxisPlotMode.BETWEEN_TICKS);
                //this._android.setMaximumTicks(10);
                this._android.setCanApplyPalette(false);
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    DateTimeContinuousAxis.prototype.onDateFormatChanged = function (data) {
        if (data.newValue) {
            this.android.setDateTimeFormat(new java.text.SimpleDateFormat(data.newValue));
        }
    };
    DateTimeContinuousAxis.prototype.onLabelFormatChanged = function (data) {
        console.log("WARNING: labelFormat property is not supported for DateTimeCategoricalAxis. Use dateFormat instead.");
    };
    DateTimeContinuousAxis.prototype.onSourceDateFormatChanged = function (data) {
        if (data.newValue) {
            this.android.setSourceDateTimeFormat(new java.text.SimpleDateFormat(data.newValue));
        }
    };
    DateTimeContinuousAxis.prototype.onPlotModeChanged = function (data) {
        if (data.newValue) {
            var plotMode = data.newValue.toLowerCase();
            switch (plotMode) {
                case publicEnumModule.AxisPlotMode.BetweenTicks.toLowerCase():
                    this.android.setPlotMode(com.telerik.widget.chart.engine.axes.common.AxisPlotMode.BETWEEN_TICKS);
                    break;
                case publicEnumModule.AxisPlotMode.OnTicks.toLowerCase():
                    this.android.setPlotMode(com.telerik.widget.chart.engine.axes.common.AxisPlotMode.ON_TICKS);
                    break;
                default:
                    console.log("WARNING: Unsupported plot mode set: " + data.newValue);
            }
        }
    };
    DateTimeContinuousAxis.prototype.onMinimumChanged = function (data) {
        if (data.newValue === undefined) {
            this.android.setMinimum(undefined);
            return;
        }
        if (typeof data.newValue === "string") {
            var formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
            var parsedDate = formatter.parse(data.newValue);
            var millis = parsedDate.getTime();
            var nativeValue = java.util.Calendar.getInstance();
            nativeValue.setTimeInMillis(millis);
            this.android.setMinimum(nativeValue);
        }
        else {
            this.android.setMinimum(data.newValue);
        }
    };
    DateTimeContinuousAxis.prototype.onMaximumChanged = function (data) {
        if (data.newValue === undefined) {
            this.android.setMaximum(undefined);
            return;
        }
        if (typeof data.newValue === "string") {
            var formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
            var parsedDate = formatter.parse(data.newValue);
            var millis = parsedDate.getTime();
            var nativeValue = java.util.Calendar.getInstance();
            nativeValue.setTimeInMillis(millis);
            this.android.setMaximum(nativeValue);
        }
        else {
            this.android.setMaximum(data.newValue);
        }
    };
    DateTimeContinuousAxis.prototype.onMajorStepChanged = function (data) {
        if (data.newValue) {
            switch (data.newValue.toLowerCase()) {
                case publicEnumModule.DateTimeComponent.Second.toLowerCase():
                    this.android.setMajorStepUnit(com.telerik.widget.chart.engine.axes.common.TimeInterval.SECOND);
                    this.android.setMajorStep(1);
                    break;
                case publicEnumModule.DateTimeComponent.Minute.toLowerCase():
                    this.android.setMajorStepUnit(com.telerik.widget.chart.engine.axes.common.TimeInterval.MINUTE);
                    this.android.setMajorStep(1);
                    break;
                case publicEnumModule.DateTimeComponent.Hour.toLowerCase():
                    this.android.setMajorStepUnit(com.telerik.widget.chart.engine.axes.common.TimeInterval.HOUR);
                    this.android.setMajorStep(1);
                    break;
                case publicEnumModule.DateTimeComponent.Day.toLowerCase():
                    this.android.setMajorStepUnit(com.telerik.widget.chart.engine.axes.common.TimeInterval.DAY);
                    this.android.setMajorStep(1);
                    break;
                case publicEnumModule.DateTimeComponent.Week.toLowerCase():
                    this.android.setMajorStepUnit(com.telerik.widget.chart.engine.axes.common.TimeInterval.WEEK);
                    this.android.setMajorStep(1);
                    break;
                case publicEnumModule.DateTimeComponent.Month.toLowerCase():
                    this.android.setMajorStepUnit(com.telerik.widget.chart.engine.axes.common.TimeInterval.MONTH);
                    this.android.setMajorStep(1);
                    break;
                case publicEnumModule.DateTimeComponent.Year.toLowerCase():
                    this.android.setMajorStepUnit(com.telerik.widget.chart.engine.axes.common.TimeInterval.YEAR);
                    this.android.setMajorStep(1);
                    break;
            }
        }
    };
    return DateTimeContinuousAxis;
})(axisCommonModule.DateTimeContinuousAxis);
exports.DateTimeContinuousAxis = DateTimeContinuousAxis;
var DateTimeCategoricalAxis = (function (_super) {
    __extends(DateTimeCategoricalAxis, _super);
    function DateTimeCategoricalAxis() {
        _super.call(this);
    }
    Object.defineProperty(DateTimeCategoricalAxis.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.axes.DateTimeCategoricalAxis();
                this._android.setCanApplyPalette(false);
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    DateTimeCategoricalAxis.prototype.onDateFormatChanged = function (data) {
        if (data.newValue) {
            this.android.setDateTimeFormat(new java.text.SimpleDateFormat(data.newValue));
        }
    };
    DateTimeCategoricalAxis.prototype.onLabelFormatChanged = function (data) {
        console.log("WARNING: labelFormat property is not supported for DateTimeCategoricalAxis. Use dateFormat instead.");
    };
    DateTimeCategoricalAxis.prototype.onDateTimeComponentChanged = function (data) {
        if (data.newValue) {
            switch (data.newValue.toLowerCase()) {
                case publicEnumModule.DateTimeComponent.Second.toLowerCase():
                    this.android.setDateTimeComponent(com.telerik.widget.chart.engine.axes.common.DateTimeComponent.SECOND);
                    break;
                case publicEnumModule.DateTimeComponent.Minute.toLowerCase():
                    this.android.setDateTimeComponent(com.telerik.widget.chart.engine.axes.common.DateTimeComponent.MINUTE);
                    break;
                case publicEnumModule.DateTimeComponent.Hour.toLowerCase():
                    this.android.setDateTimeComponent(com.telerik.widget.chart.engine.axes.common.DateTimeComponent.HOUR);
                    break;
                case publicEnumModule.DateTimeComponent.Day.toLowerCase():
                    this.android.setDateTimeComponent(com.telerik.widget.chart.engine.axes.common.DateTimeComponent.DAY);
                    break;
                case publicEnumModule.DateTimeComponent.Week.toLowerCase():
                    this.android.setDateTimeComponent(com.telerik.widget.chart.engine.axes.common.DateTimeComponent.WEEK);
                    break;
                case publicEnumModule.DateTimeComponent.Month.toLowerCase():
                    this.android.setDateTimeComponent(com.telerik.widget.chart.engine.axes.common.DateTimeComponent.MONTH);
                    break;
                case publicEnumModule.DateTimeComponent.Year.toLowerCase():
                    this.android.setDateTimeComponent(com.telerik.widget.chart.engine.axes.common.DateTimeComponent.YEAR);
                    break;
            }
        }
    };
    return DateTimeCategoricalAxis;
})(axisCommonModule.DateTimeCategoricalAxis);
exports.DateTimeCategoricalAxis = DateTimeCategoricalAxis;
////////////////////////////////////////////////////////////////////////
// LogarithmicAxis
////////////////////////////////////////////////////////////////////////
var LogarithmicAxis = (function (_super) {
    __extends(LogarithmicAxis, _super);
    function LogarithmicAxis() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(LogarithmicAxis.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.axes.LogarithmicAxis();
                this._android.setCanApplyPalette(false);
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    LogarithmicAxis.prototype.onExponentStepChanged = function (data) {
        if (!isNaN(+data.newValue) && data.newValue > 0) {
            this.android.setExponentStep(data.newValue);
        }
    };
    LogarithmicAxis.prototype.onLogarithmBaseChanged = function (data) {
        if (!isNaN(data.newValue)) {
            this.android.setLogarithmBase(data.newValue);
        }
    };
    LogarithmicAxis.prototype.onMajorStepChanged = function (data) {
        console.log("WARNING: majorStep property is not used for LogarithmicAxis. Use exponentStep property instead.");
    };
    LogarithmicAxis.prototype.onMinimumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.android.setMinimum(data.newValue);
        }
    };
    LogarithmicAxis.prototype.onMaximumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.android.setMaximum(data.newValue);
        }
    };
    return LogarithmicAxis;
})(axisCommonModule.LogarithmicAxis);
exports.LogarithmicAxis = LogarithmicAxis;
var LinearAxis = (function (_super) {
    __extends(LinearAxis, _super);
    function LinearAxis() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(LinearAxis.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.axes.LinearAxis();
                this._android.setCanApplyPalette(false);
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    LinearAxis.prototype.onMajorStepChanged = function (data) {
        if (data.newValue) {
            this.android.setMajorStep(data.newValue);
        }
    };
    LinearAxis.prototype.onMinimumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.android.setMinimum(data.newValue);
        }
    };
    LinearAxis.prototype.onMaximumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.android.setMaximum(data.newValue);
        }
    };
    return LinearAxis;
})(axisCommonModule.LinearAxis);
exports.LinearAxis = LinearAxis;
