var chartCommonModule = require("../chart-common");
var color_1 = require("color");
var utilsModule = require("utils/utils");
var chart_public_enum_1 = require("../misc/chart-public-enum");
var chart_public_enum_2 = require("../misc/chart-public-enum");
var chart_series_common_1 = require("../visualization/views/chart-series-common");
var ChartBaseValueMapper = (function () {
    function ChartBaseValueMapper() {
    }
    ChartBaseValueMapper.prototype.onLegendChanged = function (data, chart) {
        if (!chart.legend) {
            if (chart.rootLayout) {
                chart.rootLayout.removeAllViews();
            }
            if (chart.androidView) {
                chart.rootLayout.addView(chart.androidView);
            }
        }
    };
    ChartBaseValueMapper.prototype.onPalettesChanged = function (data, chart) {
        if (data.eventName && data.eventName.toLowerCase() === "change") {
            this.loadPalette(chart.palettes, chart);
        }
        else if (data.eventName && (data.eventName === "propertyChanged" || data.eventName === "propertyChange")) {
            var newPalettes = data.newValue;
            for (var i = 0; i < newPalettes.length; ++i) {
                newPalettes.getItem(i).owner = chart;
            }
            this.loadPalette(newPalettes, chart);
        }
    };
    ChartBaseValueMapper.prototype.loadPalette = function (palettes, chart) {
        if (!chart.androidView) {
            return;
        }
        this._currentChart = chart;
        var normalPalette = chart.androidView.getPalette().clone();
        var selectionPalette = chart.androidView.getSelectionPalette().clone();
        if (chart.palettes) {
            for (var i = 0; i < chart.series.length; i++) {
                var palettesForSeries = this.getPalettesForSeries(palettes, chart.series.getItem(i));
                if (palettesForSeries.length > 0) {
                    this.applyPalettesToSeries(palettesForSeries, chart.series.getItem(i), normalPalette, selectionPalette);
                }
            }
        }
        chart.androidView.setPalette(normalPalette);
        chart.androidView.setSelectionPalette(selectionPalette);
    };
    ChartBaseValueMapper.prototype.getPalettesForSeries = function (source, series) {
        var palettes = [];
        for (var i = 0; i < source.length; i++) {
            var palette = source.getItem(i);
            if (palette.seriesName === series[chart_public_enum_2.seriesName]) {
                palettes.push(palette);
            }
        }
        return palettes;
    };
    ChartBaseValueMapper.prototype.applyPalettesToSeries = function (palettes, series, normalPalette, selectionPalette) {
        var nativeNormalEntries = normalPalette.seriesEntries();
        var nativeSelectionEntries = selectionPalette.seriesEntries();
        if (!nativeNormalEntries || !nativeSelectionEntries) {
            return;
        }
        for (var i = 0; i < palettes.length; ++i) {
            if (palettes[i].seriesState && (palettes[i].seriesState.toLowerCase() === chart_public_enum_2.PaletteEntryUseState.Selected.toLowerCase())) {
                this.buildNewPaletteForSeries(palettes[i], series, nativeSelectionEntries);
            }
            else {
                this.buildNewPaletteForSeries(palettes[i], series, nativeNormalEntries);
            }
        }
    };
    ChartBaseValueMapper.prototype.buildNewPaletteForSeries = function (palette, series, nativePaletteEntries) {
        var currentEntryCollection = null;
        var sizeOfCurrentEntryCollection = 0;
        for (var i = 0; i < nativePaletteEntries.size(); i++) {
            if (nativePaletteEntries.get(i).getFamily() === series.android.paletteFamily()) {
                currentEntryCollection = nativePaletteEntries.get(i);
                sizeOfCurrentEntryCollection = currentEntryCollection.size();
                break;
            }
        }
        var newNativeEntries = new com.telerik.widget.palettes.PaletteEntryCollection();
        newNativeEntries.setFamily(series.android.paletteFamily());
        if (palette.entries && palette.entries.length > 0) {
            for (var i = 0; i < palette.entries.length; i++) {
                var nativeEntry = new com.telerik.widget.palettes.PaletteEntry();
                var paletteEntry = palette.entries[i];
                var currentNativeEntry = (currentEntryCollection ? currentEntryCollection.get(i % sizeOfCurrentEntryCollection) : null);
                if (paletteEntry) {
                    if (!isNaN(+paletteEntry.strokeWidth)) {
                        nativeEntry.setStrokeWidth(paletteEntry.strokeWidth * utilsModule.layout.getDisplayDensity());
                    }
                    else {
                        nativeEntry.setStrokeWidth((currentNativeEntry ? currentNativeEntry.getStrokeWidth() : 1) * utilsModule.layout.getDisplayDensity());
                    }
                    if (paletteEntry.strokeColor) {
                        nativeEntry.setStroke((new color_1.Color(paletteEntry.strokeColor)).android);
                    }
                    else {
                        nativeEntry.setStroke(currentNativeEntry ? currentNativeEntry.getStroke() : (new color_1.Color("Black")).android);
                    }
                    if (paletteEntry.fillColor) {
                        nativeEntry.setFill((new color_1.Color(paletteEntry.fillColor)).android);
                    }
                    else {
                        nativeEntry.setFill(currentNativeEntry ? currentNativeEntry.getFill() : (new color_1.Color("Blue")).android);
                    }
                    newNativeEntries.add(nativeEntry);
                }
            }
        }
        else {
            return;
        }
        if (series instanceof chart_series_common_1.PieSeries) {
            nativePaletteEntries.remove(currentEntryCollection);
            nativePaletteEntries.add(newNativeEntries);
            return;
        }
        var index = this.getPaletteEntryIndexForSeries(series);
        if (index != -1) {
            var entry = newNativeEntries.get(index % newNativeEntries.size());
            var i = currentEntryCollection.size();
            while (i < series.android.getCollectionIndex()) {
                currentEntryCollection.add(i, entry);
                ++i;
            }
            currentEntryCollection.add(series.android.getCollectionIndex(), entry);
        }
        else {
            nativePaletteEntries.add(newNativeEntries);
        }
    };
    ChartBaseValueMapper.prototype.getPaletteEntryIndexForSeries = function (series) {
        if (!this._currentChart) {
            return -1;
        }
        var itemIndex = 0;
        for (var i = 0; i < this._currentChart.series.length; ++i) {
            if ((this._currentChart.series.getItem(i).seriesName === series.seriesName) && (this._currentChart.series.getItem(i).android.getCollectionIndex() < series.android.getCollectionIndex())) {
                itemIndex++;
            }
        }
        return itemIndex;
    };
    ChartBaseValueMapper.prototype.onSeriesChanged = function (data, chart) {
        if (data.eventName && data.eventName.toLowerCase() === "change") {
            if (data.action && data.action.toLowerCase() === "add") {
                if (chart.androidView && chart.series) {
                    for (var i = 0; i < data.addedCount; i++) {
                        chart.androidView.getSeries().add(chart.series.getItem(data.index + i).android);
                        chart.series.getItem(data.index + i).owner = chart;
                        chart.series.getItem(data.index + i).initializer.applyLabelStyle(chart.series.getItem(data.index + i), chart);
                        this.setAxisPaletteValues(chart.series.getItem(data.index + i).horizontalAxis, "HorizontalAxis", chart);
                        this.setAxisPaletteValues(chart.series.getItem(data.index + i).verticalAxis, "VerticalAxis", chart);
                    }
                }
                return;
            }
            if (data.action && data.action.toLowerCase() === "splice") {
                for (var serieIndex = 0; serieIndex < data.removed.length; serieIndex++) {
                    if (chart.androidView.getSeries().indexOf(data.removed[serieIndex].android) !== -1) {
                        chart.androidView.getSeries().remove(data.removed[serieIndex].android);
                    }
                }
                return;
            }
        }
        else if (data.eventName && (data.eventName === "propertyChanged" || data.eventName === "propertyChange")) {
            if (data.oldValue) {
                if (chart.androidView) {
                    for (var serieIndex = 0; serieIndex < data.oldValue.length; serieIndex++) {
                        if (chart.androidView.getSeries().indexOf(data.oldValue[serieIndex].android) !== -1) {
                            chart.androidView.getSeries().remove(data.oldValue[serieIndex].android);
                        }
                    }
                }
            }
            this.loadSeries(chart);
        }
    };
    ChartBaseValueMapper.prototype.loadSeries = function (chart) {
        if (chart.androidView && chart.series) {
            for (var i = 0; i < chart.series.length; i++) {
                chart.androidView.getSeries().add(chart.series.getItem(i).android);
                chart.series.getItem(i).owner = chart;
            }
            if (chart.palettes) {
                this.loadPalette(chart.palettes, chart);
            }
            for (var i = 0; i < chart.series.length; i++) {
                chart.series.getItem(i).initializer.applyLabelStyle(chart.series.getItem(i), chart);
            }
            for (var i = 0; i < chart.series.length; i++) {
                this.setAxisPaletteValues(chart.series.getItem(i).horizontalAxis, "HorizontalAxis", chart);
                this.setAxisPaletteValues(chart.series.getItem(i).verticalAxis, "VerticalAxis", chart);
            }
        }
    };
    ChartBaseValueMapper.prototype.reloadPalettes = function (chart) {
        if (chart.palettes) {
            this.loadPalette(chart.palettes, chart);
        }
    };
    ChartBaseValueMapper.prototype.loadAnnotations = function (chart) {
        if (chart.androidView && chart.annotations) {
            for (var i = 0; i < chart.annotations.length; i++) {
                chart.androidView.getAnnotations().add(chart.annotations.getItem(i).android);
            }
        }
    };
    ChartBaseValueMapper.prototype.onAnnotationsChanged = function (data, chart) {
        if (data.eventName && data.eventName.toLowerCase() === "change") {
            if (data.action && data.action.toLowerCase() === "add") {
                if (chart.androidView && chart.annotations) {
                    for (var i_1 = 0; i_1 < data.addedCount; i_1++) {
                        chart.annotations.getItem(data.index + i_1)._init(chart);
                        chart.annotations.getItem(data.index + i_1)._createNative();
                        chart.androidView.getAnnotations().add(chart.annotations.getItem(data.index + i_1).android);
                    }
                }
                return;
            }
            if (data.action && data.action.toLowerCase() === "splice") {
                for (var annIdx = 0; annIdx < data.removed.length; annIdx++) {
                    if (chart.androidView.getAnnotations().indexOf(data.removed[annIdx].android) !== -1) {
                        chart.androidView.getAnnotations().remove(data.removed[annIdx].android);
                    }
                }
                return;
            }
        }
        if (data.eventName && (data.eventName === "propertyChanged" || data.eventName === "propertyChange")) {
            if (chart && chart.androidView) {
                chart.androidView.getAnnotations().clear();
                for (var i = 0; i < chart.annotations.length; i++) {
                    chart.annotations.getItem(i)._init(chart);
                    chart.annotations.getItem(i)._createNative();
                }
            }
        }
    };
    ChartBaseValueMapper.prototype.onSelectionModeChanged = function (data, chart) {
        chart.selectionMode = data.newValue;
    };
    ChartBaseValueMapper.prototype.updateHorizontalAxisPalette = function (chart) {
        if (chart instanceof chartCommonModule.RadCartesianChart) {
            this.setAxisPaletteValues(chart.horizontalAxis, "HorizontalAxis", chart);
        }
    };
    ChartBaseValueMapper.prototype.updateVerticalAxisPalette = function (chart) {
        if (chart instanceof chartCommonModule.RadCartesianChart) {
            this.setAxisPaletteValues(chart.verticalAxis, "VerticalAxis", chart);
        }
    };
    ChartBaseValueMapper.prototype.setAxisPaletteValues = function (axis, paletteName, chart) {
        if (!chart || !axis) {
            return;
        }
        var nativePalette = chart.androidView.getPalette().clone();
        var nativePaletteEntry = nativePalette.getEntry(paletteName ? paletteName : "HorizontalAxis");
        if (nativePaletteEntry) {
            if (!axis.labelTextColor) {
                axis.labelTextColor = nativePaletteEntry.getCustomValue("LabelColor");
            }
            if (!axis.lineColor) {
                axis.lineColor = nativePaletteEntry.getCustomValue("LineColor");
            }
            if (!axis.lineThickness) {
                axis.lineThickness = parseInt(nativePaletteEntry.getCustomValue("LineTickness", "2"));
            }
            if (!axis.labelSize) {
                axis.labelSize = parseInt(nativePaletteEntry.getCustomValue("LabelSize", "12"));
            }
        }
    };
    return ChartBaseValueMapper;
})();
exports.ChartBaseValueMapper = ChartBaseValueMapper;
var CartesianAxisValueMapper = (function () {
    function CartesianAxisValueMapper() {
    }
    CartesianAxisValueMapper.prototype.onLineThicknessChanged = function (data, axis) {
        if (!isNaN(+data.newValue)) {
            axis.android.setLineThickness(data.newValue * utilsModule.layout.getDisplayDensity());
        }
    };
    CartesianAxisValueMapper.prototype.onLineColorChanged = function (data, axis) {
        if (data.newValue) {
            axis.android.setLineColor((new color_1.Color(data.newValue)).android);
        }
    };
    CartesianAxisValueMapper.prototype.onLineHiddenChanged = function (data, axis) {
        axis.android.setShowLine(!data.newValue);
    };
    CartesianAxisValueMapper.prototype.onLabelTextColorChanged = function (data, axis) {
        if (data.newValue) {
            axis.android.setLabelTextColor((new color_1.Color(data.newValue)).android);
        }
    };
    CartesianAxisValueMapper.prototype.onLabelMarginChanged = function (data, axis) {
        if (!isNaN(data.newValue)) {
            axis.android.setLabelMargin(data.newValue);
        }
    };
    CartesianAxisValueMapper.prototype.onLabelRotationAngleChanged = function (data, axis) {
        if (!isNaN(data.newValue)) {
            var M_PI = 3.14159265358979323846264338327950288;
            axis.android.setLabelRotationAngle(data.newValue * 180 / M_PI);
        }
    };
    CartesianAxisValueMapper.prototype.onLabelFitModeChanged = function (data, axis) {
        if (data.newValue) {
            if (axis.labelLayoutMode === chart_public_enum_1.AxisLabelLayoutMode.Inner && (data.newValue.toLowerCase() != chart_public_enum_1.AxisLabelFitMode.None)) {
                console.log("WARNING: Label fit mode is not supported when label layout mode is set to Inner");
                return;
            }
            if (chart_public_enum_1.AxisLabelFitMode.Multiline.toLowerCase() === data.newValue.toLowerCase()) {
                axis.android.setLabelFitMode(com.telerik.widget.chart.engine.axes.common.AxisLabelFitMode.MULTI_LINE);
            }
            else if (chart_public_enum_1.AxisLabelFitMode.Rotate.toLowerCase() === data.newValue.toLowerCase()) {
                axis.android.setLabelFitMode(com.telerik.widget.chart.engine.axes.common.AxisLabelFitMode.ROTATE);
            }
            else {
                axis.android.setLabelFitMode(com.telerik.widget.chart.engine.axes.common.AxisLabelFitMode.NONE);
            }
        }
    };
    CartesianAxisValueMapper.prototype.onLabelLayoutModeChanged = function (data, axis) {
        if (data.newValue) {
            if (chart_public_enum_1.AxisLabelLayoutMode.Outer.toLowerCase() === data.newValue.toLowerCase()) {
                axis.android.setLabelLayoutMode(com.telerik.widget.chart.engine.axes.AxisLabelLayoutMode.OUTER);
            }
            else if (chart_public_enum_1.AxisLabelLayoutMode.Inner.toLowerCase() === data.newValue.toLowerCase()) {
                if (axis.android.getLabelFitMode() !== com.telerik.widget.chart.engine.axes.common.AxisLabelFitMode.NONE) {
                    console.log("WARNING: 'Inner' layout mode for axis labels cannot be combined only with fit mode 'None'.");
                }
                else {
                    axis.android.setLabelLayoutMode(com.telerik.widget.chart.engine.axes.AxisLabelLayoutMode.INNER);
                }
            }
        }
    };
    CartesianAxisValueMapper.prototype.onLabelFormatChanged = function (data, axis) {
        if (data.newValue) {
            axis.android.setLabelFormat(java.lang.String.valueOf(data.newValue));
        }
    };
    CartesianAxisValueMapper.prototype.onHorizontalLocationChanged = function (data, axis) {
        if (data.newValue) {
            if (chart_public_enum_1.AxisHorizontalLocation.Left.toLowerCase() === data.newValue.toLowerCase()) {
                axis.android.setHorizontalLocation(com.telerik.widget.chart.engine.axes.common.AxisHorizontalLocation.LEFT);
            }
            else if (chart_public_enum_1.AxisHorizontalLocation.Right.toLowerCase() === data.newValue.toLowerCase()) {
                axis.android.setHorizontalLocation(com.telerik.widget.chart.engine.axes.common.AxisHorizontalLocation.RIGHT);
            }
        }
    };
    CartesianAxisValueMapper.prototype.onVerticalLocationChanged = function (data, axis) {
        if (data.newValue) {
            if (chart_public_enum_1.AxisVerticalLocation.Top.toLowerCase() === data.newValue.toLowerCase()) {
                axis.android.setVerticalLocation(com.telerik.widget.chart.engine.axes.common.AxisVerticalLocation.TOP);
            }
            else if (chart_public_enum_1.AxisVerticalLocation.Bottom.toLowerCase() === data.newValue.toLowerCase()) {
                axis.android.setVerticalLocation(com.telerik.widget.chart.engine.axes.common.AxisVerticalLocation.BOTTOM);
            }
        }
    };
    CartesianAxisValueMapper.prototype.onLabelSizeChanged = function (data, axis) {
        if (data.newValue) {
            axis.android.setLabelSize(data.newValue * utilsModule.layout.getDisplayDensity());
        }
    };
    CartesianAxisValueMapper.prototype.onAllowZoomChanged = function (data, axis) {
        this.updatePanZoomBehavior(axis);
    };
    CartesianAxisValueMapper.prototype.onAllowPanChanged = function (data, axis) {
        this.updatePanZoomBehavior(axis);
    };
    CartesianAxisValueMapper.prototype.updatePanZoomBehavior = function (axis) {
        if (!axis.owner) {
            return;
        }
        if (axis.owner instanceof chartCommonModule.RadCartesianChart) {
            axis.owner.updatePanZoomBehavior();
            return;
        }
        //if owner is series we call its owner 
        if (axis.owner.owner instanceof chartCommonModule.RadCartesianChart) {
            axis.owner.owner.updatePanZoomBehavior();
            return;
        }
    };
    CartesianAxisValueMapper.prototype.onHiddenChanged = function (data, axis) {
        axis.android.setVisible(data.newValue ? false : true);
    };
    return CartesianAxisValueMapper;
})();
exports.CartesianAxisValueMapper = CartesianAxisValueMapper;
var CategoricalAxisValueMapper = (function (_super) {
    __extends(CategoricalAxisValueMapper, _super);
    function CategoricalAxisValueMapper() {
        _super.apply(this, arguments);
    }
    CategoricalAxisValueMapper.prototype.onMajorTickIntervalChanged = function (data, axis) {
        if (data.newValue) {
            axis.android.setMajorTickInterval(java.lang.Integer.valueOf(data.newValue));
        }
    };
    CategoricalAxisValueMapper.prototype.onPlotModeChanged = function (data, axis) {
        if (data.newValue) {
            switch (data.newValue.toLowerCase()) {
                case chart_public_enum_1.AxisPlotMode.BetweenTicks.toLowerCase():
                    axis.android.setPlotMode(com.telerik.widget.chart.engine.axes.common.AxisPlotMode.BETWEEN_TICKS);
                    break;
                case chart_public_enum_1.AxisPlotMode.OnTicks.toLowerCase():
                    axis.android.setPlotMode(com.telerik.widget.chart.engine.axes.common.AxisPlotMode.ON_TICKS);
                    break;
                default:
                    console.log("WARNING: Unsupported plot mode set: " + data.newValue);
            }
        }
    };
    return CategoricalAxisValueMapper;
})(CartesianAxisValueMapper);
exports.CategoricalAxisValueMapper = CategoricalAxisValueMapper;
var ChartSeriesValueMapper = (function () {
    function ChartSeriesValueMapper() {
    }
    ChartSeriesValueMapper.prototype.onShowLabelsChanged = function (data, series) {
        if (data.newValue == null || data.newValue == undefined) {
            return;
        }
        series.android.setShowLabels(data.newValue);
    };
    ChartSeriesValueMapper.prototype.onLegendTitleChanged = function (data, series) {
        series.android.setLegendTitle(data.newValue);
    };
    ChartSeriesValueMapper.prototype.onItemsChanged = function (data, series) {
        if (!series.items || !series.items.length) {
            return;
        }
        var length = series.items.length;
        var nativeSource = new java.util.ArrayList();
        for (var i = 0; i < length; i++) {
            nativeSource.add(java.lang.String.valueOf(JSON.stringify(series.getItemAtIndex(i))));
        }
        series.android.setData(nativeSource);
    };
    ChartSeriesValueMapper.prototype.onValuePropertyChanged = function (data, series) {
        if (!series.valueProperty) {
            return;
        }
        series.android.setValueBinding(new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[series.valueProperty];
            }
        })));
    };
    ChartSeriesValueMapper.prototype.onLabelStyleChanged = function (data, series) {
        if (data.newValue) {
            this.applyLabelStyle(series);
        }
    };
    ChartSeriesValueMapper.prototype.onSelectionModeChanged = function (data, series) {
        if (!series.android) {
            return;
        }
        switch (data.newValue.toLowerCase()) {
            case chart_series_common_1.SeriesSelectionMode.NotSet.toLowerCase():
                series.android.setSelectionMode(com.telerik.widget.chart.visualization.common.SeriesSelectionMode.NOT_SET);
                break;
            case chart_series_common_1.SeriesSelectionMode.None.toLowerCase():
                series.android.setSelectionMode(com.telerik.widget.chart.visualization.common.SeriesSelectionMode.NONE);
                break;
            case chart_series_common_1.SeriesSelectionMode.Series.toLowerCase():
                series.android.setSelectionMode(com.telerik.widget.chart.visualization.common.SeriesSelectionMode.SERIES);
                break;
            case chart_series_common_1.SeriesSelectionMode.DataPoint.toLowerCase():
                series.android.setSelectionMode(com.telerik.widget.chart.visualization.common.SeriesSelectionMode.DATA_POINT_SINGLE);
                break;
            case chart_series_common_1.SeriesSelectionMode.DataPointMultiple.toLowerCase():
                series.android.setSelectionMode(com.telerik.widget.chart.visualization.common.SeriesSelectionMode.DATA_POINT_MULTIPLE);
                break;
            default:
                console.log("WARNING: Unsupported selection mode: " + data.newValue);
        }
    };
    ChartSeriesValueMapper.prototype.applyLabelStyle = function (series, chart) {
        if (!series || !series.labelStyle) {
            return;
        }
        if (!isNaN(+series.labelStyle.textSize)) {
            series.android.setLabelSize(series.labelStyle.textSize * utilsModule.layout.getDisplayDensity());
        }
        if (series.labelStyle.textColor) {
            series.android.setLabelTextColor((new color_1.Color(series.labelStyle.textColor)).android);
        }
        if (series.labelStyle.fillColor) {
            series.android.setLabelFillColor((new color_1.Color(series.labelStyle.fillColor)).android);
        }
        if (series.labelStyle.strokeColor) {
            series.android.setLabelStrokeColor((new color_1.Color(series.labelStyle.strokeColor)).android);
        }
        if (!isNaN(+series.labelStyle.margin)) {
            series.android.setLabelMargin(series.labelStyle.margin * utilsModule.layout.getDisplayDensity());
        }
        if (series.labelStyle.textFormat) {
            series.android.setLabelFormat(series.labelStyle.textFormat);
        }
        var fontStyle = android.graphics.Typeface.NORMAL;
        if (series.labelStyle.fontStyle) {
            switch (series.labelStyle.fontStyle.toLowerCase()) {
                case chart_public_enum_2.FontStyles.Bold.toLowerCase():
                    fontStyle = android.graphics.Typeface.BOLD;
                    break;
                case chart_public_enum_2.FontStyles.Italic.toLowerCase():
                    fontStyle = android.graphics.Typeface.ITALIC;
                    break;
                case chart_public_enum_2.FontStyles.BoldItalic.toLowerCase():
                    fontStyle = android.graphics.Typeface.BOLD_ITALIC;
                    break;
                default:
                    console.log("WARNING: Unsupported typeface: " + series.labelStyle.fontStyle);
            }
        }
        if (series.labelStyle.fontName) {
            series.android.setLabelFont(android.graphics.Typeface.create(series.labelStyle.fontName, fontStyle));
        }
    };
    return ChartSeriesValueMapper;
})();
exports.ChartSeriesValueMapper = ChartSeriesValueMapper;
var CartesianSeriesValueMapper = (function (_super) {
    __extends(CartesianSeriesValueMapper, _super);
    function CartesianSeriesValueMapper() {
        _super.apply(this, arguments);
    }
    CartesianSeriesValueMapper.prototype.onHorizontalAxisChanged = function (data, series) {
        series.android.setHorizontalAxis(null);
        series.android.setHorizontalAxis(data.newValue.android);
        data.newValue.owner = series;
    };
    CartesianSeriesValueMapper.prototype.onVerticalAxisChanged = function (data, series) {
        series.android.setVerticalAxis(null);
        series.android.setVerticalAxis(data.newValue.android);
        data.newValue.owner = series;
    };
    return CartesianSeriesValueMapper;
})(ChartSeriesValueMapper);
exports.CartesianSeriesValueMapper = CartesianSeriesValueMapper;
var ScatterSeriesValueMapper = (function (_super) {
    __extends(ScatterSeriesValueMapper, _super);
    function ScatterSeriesValueMapper() {
        _super.apply(this, arguments);
    }
    ScatterSeriesValueMapper.prototype.onXPropertyChanged = function (data, series) {
        if (!series.xProperty) {
            return;
        }
        var xPropName = series.xProperty;
        series.android.setXValueBinding(new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[xPropName];
            }
        })));
    };
    ScatterSeriesValueMapper.prototype.onYPropertyChanged = function (data, series) {
        if (!series.yProperty) {
            return;
        }
        var yPropName = series.yProperty;
        series.android.setYValueBinding(new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[yPropName];
            }
        })));
    };
    return ScatterSeriesValueMapper;
})(CartesianSeriesValueMapper);
exports.ScatterSeriesValueMapper = ScatterSeriesValueMapper;
var ScatterBubbleSeriesValueMapper = (function (_super) {
    __extends(ScatterBubbleSeriesValueMapper, _super);
    function ScatterBubbleSeriesValueMapper() {
        _super.apply(this, arguments);
    }
    ScatterBubbleSeriesValueMapper.prototype.onBubbleSizePropertyChanged = function (data, series) {
        if (!series.bubbleSizeProperty) {
            return;
        }
        var propertyName = series.bubbleSizeProperty;
        var binding = new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[propertyName];
            }
        }));
        series.android.setBubbleSizeBinding(binding);
    };
    ScatterBubbleSeriesValueMapper.prototype.onBubbleScaleChanged = function (data, series) {
        if (data.newValue) {
            //todo: we use (scale^2) because of bug in Android scale calculation. Update this hack when it is fixed.
            series.android.setBubbleScale(Math.pow(data.newValue * utilsModule.layout.getDisplayDensity(), 2));
        }
    };
    return ScatterBubbleSeriesValueMapper;
})(ScatterSeriesValueMapper);
exports.ScatterBubbleSeriesValueMapper = ScatterBubbleSeriesValueMapper;
var CategoricalSeriesValueMapper = (function (_super) {
    __extends(CategoricalSeriesValueMapper, _super);
    function CategoricalSeriesValueMapper() {
        _super.apply(this, arguments);
    }
    CategoricalSeriesValueMapper.prototype.updateNative = function (series) {
    };
    CategoricalSeriesValueMapper.prototype.onCategoryPropertyChanged = function (data, series) {
        if (!series.categoryProperty) {
            return;
        }
        series.android.setCategoryBinding(new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[series.categoryProperty];
            }
        })));
    };
    CategoricalSeriesValueMapper.prototype.onStackModePropertyChanged = function (data, series) {
        if (!data.newValue) {
            return;
        }
        switch (data.newValue.toLowerCase()) {
            case chart_series_common_1.SeriesStackMode.None.toLowerCase():
                series.android.setCombineMode(com.telerik.widget.chart.engine.series.combination.ChartSeriesCombineMode.CLUSTER);
                break;
            case chart_series_common_1.SeriesStackMode.Stack.toLowerCase():
                series.android.setCombineMode(com.telerik.widget.chart.engine.series.combination.ChartSeriesCombineMode.STACK);
                break;
            case chart_series_common_1.SeriesStackMode.Stack100.toLowerCase():
                series.android.setCombineMode(com.telerik.widget.chart.engine.series.combination.ChartSeriesCombineMode.STACK_100);
                break;
            default:
                console.log("WARNING: Unsupported stack mode: " + data.newValue);
        }
    };
    return CategoricalSeriesValueMapper;
})(CartesianSeriesValueMapper);
exports.CategoricalSeriesValueMapper = CategoricalSeriesValueMapper;
var PieSeriesValueMapper = (function (_super) {
    __extends(PieSeriesValueMapper, _super);
    function PieSeriesValueMapper() {
        _super.apply(this, arguments);
    }
    PieSeriesValueMapper.prototype.onLabelPropertyChanged = function (data, series) {
        if (!series.legendLabel) {
            return;
        }
        series.android.setNameBinding(new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item[series.legendLabel];
            }
        })));
    };
    PieSeriesValueMapper.prototype.onLegendTitleChanged = function (data, series) {
    };
    PieSeriesValueMapper.prototype.onExpandRadiusChanged = function (data, series) {
        if (isNaN(+data.newValue) || data.newValue < 0.0 || data.newValue > 1.0) {
            console.log("WARNING: Expand radius factor must be number in range [0,1]");
            return;
        }
        series.android.setSelectedPointOffset(data.newValue);
    };
    PieSeriesValueMapper.prototype.onOuterRadiusFactorChanged = function (data, series) {
        if (isNaN(+data.newValue) || data.newValue < 0.0 || data.newValue > 1.0) {
            console.log("WARNING: Outer radius factor must be number in range [0,1]");
            return;
        }
        series.android.setRadiusFactor(data.newValue);
        series.android.requestLayout();
    };
    PieSeriesValueMapper.prototype.onStartAngleChanged = function (data, series) {
        if (!isNaN(+data.newValue)) {
            series.android.setAngleRange(new com.telerik.widget.chart.engine.chartAreas.AngleRange(data.newValue, series.endAngle ? series.endAngle : 360));
        }
    };
    PieSeriesValueMapper.prototype.onEndAngleChanged = function (data, series) {
        if (!isNaN(+data.newValue)) {
            series.android.setAngleRange(new com.telerik.widget.chart.engine.chartAreas.AngleRange(series.startAngle ? series.startAngle : 0, data.newValue));
        }
    };
    PieSeriesValueMapper.prototype.onShowPercentageChanged = function (data, series) {
        if (!series.showPercentage) {
            var thatSeries = new WeakRef(series);
            series.android.setLabelValueToStringConverter(new com.telerik.android.common.Function({
                apply: function (arg) {
                    var retVal;
                    var lblFormat = thatSeries.get().labelStyle.textFormat;
                    if (!lblFormat) {
                        retVal = "" + arg;
                    }
                    else {
                        retVal = java.lang.String.format(lblFormat, [arg]);
                    }
                    return retVal;
                }
            }));
        }
    };
    return PieSeriesValueMapper;
})(ChartSeriesValueMapper);
exports.PieSeriesValueMapper = PieSeriesValueMapper;
var DonutSeriesValueMapper = (function (_super) {
    __extends(DonutSeriesValueMapper, _super);
    function DonutSeriesValueMapper() {
        _super.apply(this, arguments);
    }
    DonutSeriesValueMapper.prototype.onInnerRadiusFactorChanged = function (data, series) {
        if (!data.newValue) {
            return;
        }
        series.android.setInnerRadiusFactor(data.newValue);
    };
    return DonutSeriesValueMapper;
})(PieSeriesValueMapper);
exports.DonutSeriesValueMapper = DonutSeriesValueMapper;
