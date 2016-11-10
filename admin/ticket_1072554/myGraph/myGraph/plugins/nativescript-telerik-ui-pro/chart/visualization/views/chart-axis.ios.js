var axisCommonModule = require("./chart-axis-common");
var chart_public_enum_1 = require("../../misc/chart-public-enum");
////////////////////////////////////////////////////////////////////////
// LinearAxis
////////////////////////////////////////////////////////////////////////
var LinearAxis = (function (_super) {
    __extends(LinearAxis, _super);
    function LinearAxis() {
        _super.call(this);
        this._ios = TKChartNumericAxis.new();
        this._ios.offset = 0;
        this._ios.baseline = 0;
    }
    Object.defineProperty(LinearAxis.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    LinearAxis.prototype.onMajorStepChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.ios.majorTickInterval = data.newValue;
            this.update();
        }
    };
    LinearAxis.prototype.onMinimumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            if (this.ios.range) {
                this.ios.range.minimum = data.newValue;
            }
            else {
                this.ios.range = TKRange.rangeWithMinimumAndMaximum(data.newValue, data.newValue * 2);
            }
            this.update();
        }
    };
    LinearAxis.prototype.onMaximumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            if (this.ios.range) {
                this.ios.range.maximum = data.newValue;
            }
            else {
                this.ios.range = TKRange.rangeWithMinimumAndMaximum(data.newValue / 2, data.newValue);
            }
            this.update();
        }
    };
    return LinearAxis;
})(axisCommonModule.LinearAxis);
exports.LinearAxis = LinearAxis;
////////////////////////////////////////////////////////////////////////
// CategoricalAxis
////////////////////////////////////////////////////////////////////////
var CategoricalAxis = (function (_super) {
    __extends(CategoricalAxis, _super);
    function CategoricalAxis() {
        _super.call(this);
        this._ios = TKChartCategoryAxis.alloc().init();
        this._ios.offset = 0;
        this._ios.baseline = 0;
    }
    Object.defineProperty(CategoricalAxis.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return CategoricalAxis;
})(axisCommonModule.CategoricalAxis);
exports.CategoricalAxis = CategoricalAxis;
////////////////////////////////////////////////////////////////////////
// DateTimeContinuousAxis
////////////////////////////////////////////////////////////////////////
var DateTimeContinuousAxis = (function (_super) {
    __extends(DateTimeContinuousAxis, _super);
    function DateTimeContinuousAxis() {
        _super.call(this);
        this._ios = TKChartDateTimeAxis.new();
        this._ios.majorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitMonths;
        this._ios.minorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitMonths;
        this._ios.majorTickInterval = 1;
        this._ios.setPlotMode(TKChartAxisPlotMode.TKChartAxisPlotModeBetweenTicks);
    }
    Object.defineProperty(DateTimeContinuousAxis.prototype, "dateFormatter", {
        get: function () {
            if (this._dateFormatter) {
                return this._dateFormatter;
            }
            this._dateFormatter = NSDateFormatter.alloc().init();
            this._dateFormatter.dateFormat = "dd/MM/yyyy"; //note: currently only this format is supported in xml
            return this._dateFormatter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeContinuousAxis.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    DateTimeContinuousAxis.prototype.onMinimumChanged = function (data) {
        if (data.newValue && this.maximum) {
            this.updateRange();
        }
    };
    DateTimeContinuousAxis.prototype.onMaximumChanged = function (data) {
        if (data.newValue && this.minimum) {
            this.updateRange();
        }
    };
    DateTimeContinuousAxis.prototype.updateRange = function () {
        var minDate = this.minimum;
        if (typeof this.minimum === "string") {
            minDate = this.dateFormatter.dateFromString(this.minimum);
        }
        var maxDate = this.maximum;
        if (typeof this.maximum === "string") {
            maxDate = this.dateFormatter.dateFromString(this.maximum);
        }
        this.ios.range = TKRange.rangeWithMinimumAndMaximum(minDate, maxDate);
        this.update();
    };
    DateTimeContinuousAxis.prototype.onPlotModeChanged = function (data) {
        if (data.newValue) {
            switch (data.newValue.toLowerCase()) {
                case chart_public_enum_1.AxisPlotMode.BetweenTicks.toLowerCase():
                    this.ios.setPlotMode(TKChartAxisPlotMode.TKChartAxisPlotModeBetweenTicks);
                    break;
                case chart_public_enum_1.AxisPlotMode.OnTicks.toLowerCase():
                    this.ios.setPlotMode(TKChartAxisPlotMode.TKChartAxisPlotModeOnTicks);
                    break;
                default:
                    console.log("WARNING: Unsupported plot mode set: " + data.newValue);
            }
            this.update();
        }
    };
    DateTimeContinuousAxis.prototype.onDateFormatChanged = function (data) {
        if (data.newValue) {
            var dateFormatter = NSDateFormatter.alloc().init();
            dateFormatter.dateFormat = data.newValue;
            this.ios.labelFormatter = dateFormatter;
            this.update();
        }
    };
    DateTimeContinuousAxis.prototype.onLabelFormatChanged = function (data) {
        console.log("WARNING: labelFormat property is not supported for DateTimeContinuousAxis. Use dateFormat instead");
    };
    DateTimeContinuousAxis.prototype.onMajorStepChanged = function (data) {
        if (data.newValue) {
            //todo: consider minorTickIntervalUnit property value. It is used for financial series and determins the width of candlesticks.
            switch (data.newValue.toLowerCase()) {
                case chart_public_enum_1.DateTimeComponent.Second.toLowerCase():
                    this.ios.majorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitSeconds;
                    this.ios.minorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitSeconds;
                    break;
                case chart_public_enum_1.DateTimeComponent.Minute.toLowerCase():
                    this.ios.majorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitMinutes;
                    this.ios.minorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitMinutes;
                    break;
                case chart_public_enum_1.DateTimeComponent.Hour.toLowerCase():
                    this.ios.majorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitHours;
                    this.ios.minorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitHours;
                    break;
                case chart_public_enum_1.DateTimeComponent.Day.toLowerCase():
                    this.ios.majorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitDays;
                    this.ios.minorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitDays;
                    break;
                case chart_public_enum_1.DateTimeComponent.Week.toLowerCase():
                    this.ios.majorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitWeeks;
                    this.ios.minorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitWeeks;
                    break;
                case chart_public_enum_1.DateTimeComponent.Month.toLowerCase():
                    this.ios.majorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitMonths;
                    this.ios.minorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitMonths;
                    break;
                case chart_public_enum_1.DateTimeComponent.Year.toLowerCase():
                    this.ios.majorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitYears;
                    this.ios.minorTickIntervalUnit = TKChartDateTimeAxisIntervalUnit.TKChartDateTimeAxisIntervalUnitYears;
                    break;
            }
            this.update();
        }
    };
    return DateTimeContinuousAxis;
})(axisCommonModule.DateTimeContinuousAxis);
exports.DateTimeContinuousAxis = DateTimeContinuousAxis;
////////////////////////////////////////////////////////////////////////
// DateTimeCategoricalAxis
////////////////////////////////////////////////////////////////////////
var DateTimeCategoricalAxis = (function (_super) {
    __extends(DateTimeCategoricalAxis, _super);
    function DateTimeCategoricalAxis() {
        _super.call(this);
        this._ios = TKChartDateTimeCategoryAxis.new();
    }
    Object.defineProperty(DateTimeCategoricalAxis.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    DateTimeCategoricalAxis.prototype.onDateFormatChanged = function (data) {
        if (data.newValue) {
            var dateFormatter = NSDateFormatter.alloc().init();
            dateFormatter.dateFormat = data.newValue;
            this.ios.labelFormatter = dateFormatter;
            this.update();
        }
    };
    DateTimeCategoricalAxis.prototype.onLabelFormatChanged = function (data) {
        console.log("WARNING: labelFormat property is not supported for DateTimeCategoricalAxis. Use dateFormat instead.");
    };
    DateTimeCategoricalAxis.prototype.onDateTimeComponentChanged = function (data) {
        if (data.newValue) {
            switch (data.newValue.toLowerCase()) {
                case chart_public_enum_1.DateTimeComponent.Second.toLowerCase():
                    this.ios.dateComponent = NSCalendarUnitSecond;
                    break;
                case chart_public_enum_1.DateTimeComponent.Minute.toLowerCase():
                    this.ios.dateComponent = NSCalendarUnitMinute;
                    break;
                case chart_public_enum_1.DateTimeComponent.Hour.toLowerCase():
                    this.ios.dateComponent = NSCalendarUnitHour;
                    break;
                case chart_public_enum_1.DateTimeComponent.Day.toLowerCase():
                    this.ios.dateComponent = NSCalendarUnitDay;
                    break;
                case chart_public_enum_1.DateTimeComponent.Week.toLowerCase():
                    this.ios.dateComponent = NSCalendarUnitWeekOfMonth;
                    break;
                case chart_public_enum_1.DateTimeComponent.Month.toLowerCase():
                    this.ios.dateComponent = NSCalendarUnitMonth;
                    break;
                case chart_public_enum_1.DateTimeComponent.Year.toLowerCase():
                    this.ios.dateComponent = NSCalendarUnitYear;
                    break;
            }
            this.update();
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
        _super.call(this);
        this._ios = TKChartLogarithmicAxis.new();
    }
    Object.defineProperty(LogarithmicAxis.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    LogarithmicAxis.prototype.onExponentStepChanged = function (data) {
        if (!isNaN(+data.newValue) && data.newValue > 0) {
            this._ios.exponentStep = data.newValue;
            this.update();
        }
    };
    LogarithmicAxis.prototype.onLogarithmBaseChanged = function (data) {
        if (!isNaN(data.newValue)) {
            this._ios.logarithmBase = data.newValue;
            this.update();
        }
    };
    LogarithmicAxis.prototype.onMajorStepChanged = function (data) {
        console.log("WARNING: majorStep property is not used for LogarithmicAxis. Use exponentStep property instead.");
    };
    LogarithmicAxis.prototype.onMinimumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            if (this.ios.range) {
                this.ios.range.minimum = data.newValue;
            }
            else {
                this.ios.range = TKRange.rangeWithMinimumAndMaximum(data.newValue, data.newValue * 2);
            }
            this.update();
        }
    };
    LogarithmicAxis.prototype.onMaximumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            if (this.ios.range) {
                this.ios.range.maximum = data.newValue;
            }
            else {
                this.ios.range = TKRange.rangeWithMinimumAndMaximum(data.newValue / 2, data.newValue);
            }
            this.update();
        }
    };
    return LogarithmicAxis;
})(axisCommonModule.LogarithmicAxis);
exports.LogarithmicAxis = LogarithmicAxis;
