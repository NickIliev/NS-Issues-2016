var annotationModule = require("./chart-annotation-common");
var utilsModule = require("utils/utils");
var color_1 = require("color");
var chart_public_enum_1 = require("../../misc/chart-public-enum");
var floatType = java.lang.Float.class.getField("TYPE").get(null);
var ChartGridLineAnnotation = (function (_super) {
    __extends(ChartGridLineAnnotation, _super);
    function ChartGridLineAnnotation() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ChartGridLineAnnotation.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    ChartGridLineAnnotation.prototype._init = function (owner) {
        this._owner = owner;
    };
    ChartGridLineAnnotation.prototype.createAnnotation = function () {
        if (!this.axisId) {
            console.log("ERROR: axisId property is mandatory for any annotation.");
            return;
        }
        if (!this._owner || !this._owner.androidView) {
            console.log("ERROR: You cannot create annotation if owner chart is not set and native instance is not created");
            return;
        }
        var forAxis = this._owner.getAxixByID(this.axisId);
        if (typeof (this.value) == "string") {
            this._android = new com.telerik.widget.chart.visualization.annotations.cartesian.CartesianGridLineAnnotation(forAxis.android, this.value);
        }
        else if (typeof (this.value) == "number") {
            this._android = new com.telerik.widget.chart.visualization.annotations.cartesian.CartesianGridLineAnnotation(forAxis.android, java.lang.Float.valueOf(this.value));
        }
        else {
            console.log("ERROR: Unsupported value type for annotation");
            return;
        }
        this._android.setVisible(this.hidden ? false : true);
        if (this.value) {
            if (!isNaN(this.value)) {
                this._android.setValue(new java.lang.Float(parseFloat(this.value)));
            }
            else {
                this._android.setValue(new java.lang.String(this.value));
            }
        }
        else {
            console.log("WARNING: value property is mandatory for grid line annotation.");
        }
        if (this.zPosition) {
            switch (this.zPosition.toLowerCase()) {
                case chart_public_enum_1.ChartAnnotationZPosition.AboveSeries.toLowerCase():
                    this._android.setZIndex(com.telerik.widget.chart.visualization.common.ChartSeries.SERIES_Z_INDEX + 100);
                    break;
                default:
                    this._android.setZIndex(com.telerik.widget.chart.visualization.common.ChartSeries.SERIES_Z_INDEX - 100);
            }
        }
        if (this.strokeColor || !isNaN(+this.strokeWidth)) {
            var nvPalette = this._owner.androidView.getPalette().clone();
            var nvPaletteEntry = nvPalette.getEntry("CartesianGridLineAnnotation");
            this._android.setCanApplyPalette(false);
            if (this.strokeColor) {
                this._android.setStrokeColor((new color_1.Color(this.strokeColor)).android);
            }
            else {
                this._android.setStrokeColor(nvPaletteEntry.getStroke());
            }
            if (!isNaN(+this.strokeWidth)) {
                this._android.setStrokeWidth(this.strokeWidth * utilsModule.layout.getDisplayDensity());
            }
            else {
                this._android.setStrokeWidth(2 * utilsModule.layout.getDisplayDensity());
            }
        }
        if (this.strokeDashPattern) {
            var array = JSON.parse("[" + this.strokeDashPattern + "]");
            var arrNative = java.lang.reflect.Array.newInstance(floatType, array.length);
            for (var i = 0; i < array.length; ++i) {
                arrNative[i] = parseFloat(array[i]) * utilsModule.layout.getDisplayDensity();
            }
            var effect = new android.graphics.DashPathEffect(arrNative, 0);
            this._android.setStrokeEffect(effect);
        }
    };
    ChartGridLineAnnotation.prototype._onOwnerUICreated = function () {
        this.createAnnotation();
    };
    ChartGridLineAnnotation.prototype._createNative = function () {
        this.createAnnotation();
    };
    ChartGridLineAnnotation.prototype.onValueChanged = function (data) {
        if (this._android && data.newValue) {
            if (!isNaN(data.newValue)) {
                this._android.setValue(new java.lang.Float(parseFloat(data.newValue)));
            }
            else {
                this._android.setValue(new java.lang.String(data.newValue));
            }
        }
    };
    ChartGridLineAnnotation.prototype.onAxisIdChanged = function (data) {
        if (this._android && data.newValue) {
            var forAxis = this._owner.getAxixByID(data.newValue);
            this._android.setAxis(forAxis.android);
        }
    };
    ChartGridLineAnnotation.prototype.onZPositionChanged = function (data) {
        if (!this._android) {
            return;
        }
        if (data.newValue) {
            switch (data.newValue.toLowerCase()) {
                case chart_public_enum_1.ChartAnnotationZPosition.AboveSeries.toLowerCase():
                    this._android.setZIndex(com.telerik.widget.chart.visualization.common.ChartSeries.SERIES_Z_INDEX + 100);
                    break;
                default:
                    this._android.setZIndex(com.telerik.widget.chart.visualization.common.ChartSeries.SERIES_Z_INDEX - 100);
            }
            this._android.requestLayout();
        }
    };
    ChartGridLineAnnotation.prototype.onHiddenChanged = function (data) {
        if (this._android) {
            this._android.setVisible(data.newValue ? false : true);
        }
    };
    ChartGridLineAnnotation.prototype.onStrokeWidthChanged = function (data) {
        if (this._android && !isNaN(+data.newValue)) {
            this._android.setStrokeWidth(data.newValue);
        }
    };
    ChartGridLineAnnotation.prototype.onStrokeColorChanged = function (data) {
        if (this._android && data.newValue) {
            this._android.setStrokeColor((new color_1.Color(data.newValue)).android);
        }
    };
    ChartGridLineAnnotation.prototype.onStrokeDashPatternChanged = function (data) {
        if (this._android && data.newValue) {
            var array = JSON.parse("[" + data.newValue + "]");
            var arrNative = java.lang.reflect.Array.newInstance(floatType, array.length);
            for (var i = 0; i < array.length; ++i) {
                arrNative[i] = parseFloat(array[i]) * utilsModule.layout.getDisplayDensity();
            }
            var effect = new android.graphics.DashPathEffect(arrNative, 0);
            this._android.setStrokeEffect(effect);
        }
    };
    return ChartGridLineAnnotation;
})(annotationModule.ChartGridLineAnnotation);
exports.ChartGridLineAnnotation = ChartGridLineAnnotation;
var ChartPlotBandAnnotation = (function (_super) {
    __extends(ChartPlotBandAnnotation, _super);
    function ChartPlotBandAnnotation() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ChartPlotBandAnnotation.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    ChartPlotBandAnnotation.prototype._init = function (owner) {
        this._owner = owner;
    };
    ChartPlotBandAnnotation.prototype.createAnnotation = function () {
        if (!this.axisId) {
            console.log("ERROR: axisId property is mandatory for any anotation.");
            return;
        }
        if (!this._owner || !this._owner.androidView) {
            console.log("ERROR: You cannot create annotation if owner chart is not set and native instance is not created");
            return;
        }
        var forAxis = this._owner.getAxixByID(this.axisId);
        if (typeof (this.minValue) == "string") {
            this._android = new com.telerik.widget.chart.visualization.annotations.cartesian.CartesianPlotBandAnnotation(forAxis.android, this.minValue, this.maxValue);
        }
        else if (typeof (this.minValue) == "number") {
            this._android = new com.telerik.widget.chart.visualization.annotations.cartesian.CartesianPlotBandAnnotation(forAxis.android, java.lang.Float.valueOf(this.minValue), java.lang.Float.valueOf(this.maxValue));
        }
        else {
            console.log("ERROR: Unsupported value type for annotation");
            return;
        }
        this._android.setVisible(this.hidden ? false : true);
        if (this.minValue) {
            if (!isNaN(this.minValue)) {
                this._android.setFrom(new java.lang.Float(parseFloat(this.minValue)));
            }
            else {
                this._android.setFrom(new java.lang.String(this.minValue));
            }
        }
        else {
            console.log("WARNING: minValue is mandatory for band annotation");
        }
        if (this.maxValue) {
            if (!isNaN(this.maxValue)) {
                this._android.setTo(new java.lang.Float(parseFloat(this.maxValue)));
            }
            else {
                this._android.setTo(new java.lang.String(this.maxValue));
            }
        }
        else {
            console.log("WARNING: maxValue is mandatory for band annotation");
        }
        if (this.zPosition) {
            switch (this.zPosition.toLowerCase()) {
                case chart_public_enum_1.ChartAnnotationZPosition.AboveSeries.toLowerCase():
                    this._android.setZIndex(com.telerik.widget.chart.visualization.common.ChartSeries.SERIES_Z_INDEX + 100);
                    break;
                default:
                    this._android.setZIndex(com.telerik.widget.chart.visualization.common.ChartSeries.SERIES_Z_INDEX - 100);
            }
        }
        if (this.fillColor || this.strokeColor || !isNaN(this.strokeWidth)) {
            var nvPalette = this._owner.androidView.getPalette().clone();
            var nvPaletteEntry = nvPalette.getEntry("CartesianPlotBandAnnotation");
            this._android.setCanApplyPalette(false);
            if (this.fillColor) {
                this._android.setFillColor((new color_1.Color(this.fillColor)).android);
            }
            else {
                this._android.setFillColor(nvPaletteEntry.getFill());
            }
            if (this.strokeColor) {
                this._android.setStrokeColor((new color_1.Color(this.strokeColor)).android);
            }
            else {
                this._android.setStrokeColor(nvPaletteEntry.getStroke());
            }
            if (!isNaN(+this.strokeWidth)) {
                this._android.setStrokeWidth(this.strokeWidth * utilsModule.layout.getDisplayDensity());
            }
            else {
                this._android.setStrokeWidth(2 * utilsModule.layout.getDisplayDensity());
            }
        }
        if (this.strokeDashPattern) {
            var array = JSON.parse("[" + this.strokeDashPattern + "]");
            var arrNative = java.lang.reflect.Array.newInstance(floatType, array.length);
            for (var i = 0; i < array.length; ++i) {
                arrNative[i] = parseFloat(array[i]) * utilsModule.layout.getDisplayDensity();
            }
            var effect = new android.graphics.DashPathEffect(arrNative, 0);
            this._android.setStrokeEffect(effect);
        }
    };
    ChartPlotBandAnnotation.prototype._onOwnerUICreated = function () {
        this.createAnnotation();
    };
    ChartPlotBandAnnotation.prototype._createNative = function () {
        this.createAnnotation();
    };
    ChartPlotBandAnnotation.prototype.onMinValueChanged = function (data) {
        if (this._android && data.newValue) {
            if (!isNaN(data.newValue)) {
                this._android.setFrom(new java.lang.Float(parseFloat(data.newValue)));
            }
            else {
                this._android.setFrom(new java.lang.String(data.newValue));
            }
        }
    };
    ChartPlotBandAnnotation.prototype.onMaxValueChanged = function (data) {
        if (this._android && data.newValue) {
            if (!isNaN(data.newValue)) {
                this._android.setTo(new java.lang.Float(parseFloat(data.newValue)));
            }
            else {
                this._android.setTo(new java.lang.String(data.newValue));
            }
        }
    };
    ChartPlotBandAnnotation.prototype.onFillColorChanged = function (data) {
        if (this._android && data.newValue) {
            this._android.setFillColor((new color_1.Color(data.newValue)).android);
        }
    };
    ChartPlotBandAnnotation.prototype.onAxisIdChanged = function (data) {
        if (this._android && data.newValue) {
            var forAxis = this._owner.getAxixByID(data.newValue);
            this._android.setAxis(forAxis.android);
        }
    };
    ChartPlotBandAnnotation.prototype.onZPositionChanged = function (data) {
        if (!this._android) {
            return;
        }
        if (data.newValue) {
            switch (data.newValue.toLowerCase()) {
                case chart_public_enum_1.ChartAnnotationZPosition.AboveSeries.toLowerCase():
                    this._android.setZIndex(com.telerik.widget.chart.visualization.common.ChartSeries.SERIES_Z_INDEX + 100);
                    break;
                default:
                    this._android.setZIndex(com.telerik.widget.chart.visualization.common.ChartSeries.SERIES_Z_INDEX - 100);
            }
            this._android.requestLayout();
        }
    };
    ChartPlotBandAnnotation.prototype.onHiddenChanged = function (data) {
        if (this._android) {
            this._android.setVisible(data.newValue ? false : true);
        }
    };
    ChartPlotBandAnnotation.prototype.onStrokeWidthChanged = function (data) {
        if (this._android && !isNaN(+data.newValue)) {
            this._android.setStrokeWidth(data.newValue);
        }
    };
    ChartPlotBandAnnotation.prototype.onStrokeColorChanged = function (data) {
        if (this._android && data.newValue) {
            this._android.setStrokeColor((new color_1.Color(data.newValue)).android);
        }
    };
    ChartPlotBandAnnotation.prototype.onStrokeDashPatternChanged = function (data) {
        if (this._android && data.newValue) {
            var array = JSON.parse("[" + data.newValue + "]");
            var arrNative = java.lang.reflect.Array.newInstance(floatType, array.length);
            for (var i = 0; i < array.length; ++i) {
                arrNative[i] = parseFloat(array[i]) * utilsModule.layout.getDisplayDensity();
            }
            var effect = new android.graphics.DashPathEffect(arrNative, 0);
            this._android.setStrokeEffect(effect);
        }
    };
    return ChartPlotBandAnnotation;
})(annotationModule.ChartPlotBandAnnotation);
exports.ChartPlotBandAnnotation = ChartPlotBandAnnotation;
