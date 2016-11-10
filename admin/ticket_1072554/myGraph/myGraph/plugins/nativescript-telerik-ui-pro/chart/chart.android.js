var commonModule = require("./chart-common");
var eventDataCommonModule = require("./misc/chart-event-data-common");
var publicEnumModule = require("./misc/chart-public-enum");
var labelStyleCommonModule = require("./visualization/parts/chart-label-style-common");
var paletteCommonModule = require("./visualization/parts/chart-palette-common");
var trackBallCommonModule = require("./visualization/parts/chart-track-ball-common");
var legendViewModule = require('./visualization/views/chart-legend-view');
var axisModule = require("./visualization/views/chart-axis");
var seriesModule = require("./visualization/views/chart-series");
var annotationModule = require("./visualization/parts/chart-annotation");
var cartesianChartGridModule = require("./visualization/parts/chart-cartesian-chart-grid");
var trackBallModule = require("./visualization/parts/chart-track-ball");
var floatType = java.lang.Float.class.getField("TYPE").get(null);
require("utils/module-merge").merge(commonModule, exports);
require("utils/module-merge").merge(publicEnumModule, exports);
require("utils/module-merge").merge(legendViewModule, exports);
require("utils/module-merge").merge(axisModule, exports);
require("utils/module-merge").merge(eventDataCommonModule, exports);
require("utils/module-merge").merge(labelStyleCommonModule, exports);
require("utils/module-merge").merge(seriesModule, exports);
require("utils/module-merge").merge(paletteCommonModule, exports);
require("utils/module-merge").merge(annotationModule, exports);
require("utils/module-merge").merge(cartesianChartGridModule, exports);
require("utils/module-merge").merge(trackBallModule, exports);
var RadPieChart = (function (_super) {
    __extends(RadPieChart, _super);
    function RadPieChart() {
        _super.call(this);
    }
    Object.defineProperty(RadPieChart.prototype, "android", {
        get: function () {
            return this._rootLayout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadPieChart.prototype, "androidView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadPieChart.prototype, "rootLayout", {
        get: function () {
            return this._rootLayout;
        },
        enumerable: true,
        configurable: true
    });
    RadPieChart.prototype._createUI = function () {
        this._android = new com.telerik.widget.chart.visualization.pieChart.RadPieChartView(this._context);
        this._rootLayout = new android.widget.RelativeLayout(this._context);
        var lParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT);
        this._rootLayout.addView(this._android);
        if (this.legend) {
            this.legend.updateLegendView(this);
        }
        this.initializer.loadSeries(this);
        this.initSelectionBehavior();
    };
    RadPieChart.prototype._clearAndroidReference = function () {
        this.detachSeries();
        if (this._selectionBehavior) {
            this._android.getBehaviors().remove(this._selectionBehavior);
            this._selectionBehavior = null;
        }
        _super.prototype._clearAndroidReference.call(this);
    };
    RadPieChart.prototype._onDetach = function (force) {
        this.detachSeries();
        _super.prototype._onDetach.call(this, force);
    };
    RadPieChart.prototype.detachSeries = function () {
        var thisAndroid = this._android;
        if (thisAndroid) {
            this._rootLayout = undefined;
            if (this.series) {
                for (var i = 0; i < this.series.length; i++) {
                    if (thisAndroid.getSeries().indexOf(this.series.getItem(i).android) !== -1) {
                        thisAndroid.getSeries().remove(this.series.getItem(i).android);
                    }
                }
            }
        }
    };
    RadPieChart.prototype.initSelectionBehavior = function () {
        if (!this._selectionBehavior) {
            this._selectionBehavior = new com.telerik.widget.chart.visualization.behaviors.ChartSelectionBehavior();
            this._selectionBehavior.setDataPointsSelectionMode(com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.NONE);
            this._selectionBehavior.setSeriesSelectionMode(com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.NONE);
            var that = new WeakRef(this);
            this._selectionBehavior.setSelectionChangeListener(new com.telerik.widget.chart.visualization.behaviors.ChartSelectionChangeListener({
                onSelectionChanged: function (selectionContext) {
                    if (selectionContext.selectedSeries()) {
                        var args = { eventName: commonModule.RadChartBase.seriesSelectedEvent, object: that.get(), series: this.get().series, pointIndex: null, pointData: null };
                        that.get().notify(args);
                    }
                    if (selectionContext.deselectedSeries()) {
                        var args = { eventName: commonModule.RadChartBase.seriesDeselectedEvent, object: that.get(), series: this.get().series, pointIndex: null, pointData: null };
                        that.get().notify(args);
                    }
                    if (selectionContext.selectedDataPoint()) {
                        var args = { eventName: commonModule.RadChartBase.pointSelectedEvent, object: that.get(), series: that.get().series, pointIndex: selectionContext.selectedDataPoint().index(), pointData: selectionContext.selectedDataPoint() };
                        that.get().notify(args);
                    }
                    if (selectionContext.deselectedDataPoint()) {
                        var args = { eventName: commonModule.RadChartBase.pointDeselectedEvent, object: that.get(), series: that.get().series, pointIndex: selectionContext.deselectedDataPoint().index(), pointData: selectionContext.deselectedDataPoint() };
                        that.get().notify(args);
                    }
                }
            }));
            this._android.getBehaviors().add(this._selectionBehavior);
        }
    };
    RadPieChart.prototype.onSelectionModeChanged = function (data) {
    };
    return RadPieChart;
})(commonModule.RadPieChart);
exports.RadPieChart = RadPieChart;
var RadCartesianChart = (function (_super) {
    __extends(RadCartesianChart, _super);
    function RadCartesianChart() {
        _super.call(this);
    }
    Object.defineProperty(RadCartesianChart.prototype, "android", {
        get: function () {
            return this._rootLayout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChart.prototype, "androidView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChart.prototype, "rootLayout", {
        get: function () {
            return this._rootLayout;
        },
        enumerable: true,
        configurable: true
    });
    RadCartesianChart.prototype._createUI = function () {
        this._android = new com.telerik.widget.chart.visualization.cartesianChart.RadCartesianChartView(this._context);
        if (this._selectionBehavior) {
            this._android.getBehaviors().add(this._selectionBehavior);
        }
        else {
            this.initSelectionBehavior();
        }
        this._rootLayout = new android.widget.RelativeLayout(this._context);
        var lParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        this._rootLayout.addView(this._android);
        if (this.grid) {
            this._android.setGrid(null);
            this._android.setGrid(this.grid.android);
        }
        if (this.horizontalAxis) {
            this._android.setHorizontalAxis(null);
            this._android.setHorizontalAxis(this.horizontalAxis.android);
            this.initializer.updateHorizontalAxisPalette(this);
            this.horizontalAxis.owner = this;
        }
        if (this.verticalAxis) {
            this._android.setVerticalAxis(null);
            this._android.setVerticalAxis(this.verticalAxis.android);
            this.initializer.updateVerticalAxisPalette(this);
            this.verticalAxis.owner = this;
        }
        if (this.series) {
            this.initializer.loadSeries(this);
        }
        if (this.legend) {
            this.legend.updateLegendView(this);
        }
        if (this.annotations) {
            for (var i = 0; i < this.annotations.length; i++) {
                this.initNativeAnnotation(i);
                this.annotations.getItem(i)._onOwnerUICreated();
            }
            this.initializer.loadAnnotations(this);
        }
        if (this.horizontalZoom || this.verticalZoom) {
            this._android.setZoom(this.horizontalZoom ? this.horizontalZoom : 1, this.verticalZoom ? this.verticalZoom : 1);
        }
        this.updatePanZoomBehavior();
        this.setNativeTrackballBehavior(this.trackball);
    };
    //todo: consider this method to be moved in common module
    RadCartesianChart.prototype.getAxixByID = function (axisID) {
        if (this.horizontalAxis && this.horizontalAxis.id === axisID) {
            return this.horizontalAxis;
        }
        if (this.verticalAxis && this.verticalAxis.id === axisID) {
            return this.verticalAxis;
        }
        if (this.series) {
            var axis;
            for (var i = 0; i < this.series.length; ++i) {
                axis = this.series.getItem(i).horizontalAxis;
                if (axis && axis.id === axisID) {
                    return axis;
                }
                axis = this.series.getItem(i).verticalAxis;
                if (axis && axis.id === axisID) {
                    return axis;
                }
            }
        }
        return null;
    };
    RadCartesianChart.prototype._onDetach = function (force) {
        this.detachSeries();
        _super.prototype._onDetach.call(this, force);
    };
    RadCartesianChart.prototype._clearAndroidReference = function () {
        this.detachSeries();
        if (this._panZoomBehavior) {
            this._android.getBehaviors().remove(this._panZoomBehavior);
            this._panZoomBehavior = undefined;
        }
        if (this._selectionBehavior) {
            this._android.getBehaviors().remove(this._selectionBehavior);
            this._selectionBehavior = null;
        }
        _super.prototype._clearAndroidReference.call(this);
    };
    RadCartesianChart.prototype.detachSeries = function () {
        var thisAndroid = this._android;
        if (thisAndroid) {
            this._rootLayout = undefined;
            if (this.series) {
                for (var i = 0; i < this.series.length; i++) {
                    if (thisAndroid.getSeries().indexOf(this.series.getItem(i).android) !== -1) {
                        thisAndroid.getSeries().remove(this.series.getItem(i).android);
                    }
                }
            }
            thisAndroid.setHorizontalAxis(undefined);
            thisAndroid.setVerticalAxis(undefined);
            thisAndroid.setGrid(undefined);
        }
    };
    RadCartesianChart.prototype.initNativeAnnotation = function (index) {
        if (this.androidView) {
            this.annotations.getItem(index)._init(this);
            this.annotations.getItem(index)._createNative();
        }
    };
    //get allowZoom/allowPan from axes and init the chart behavior
    RadCartesianChart.prototype.updatePanZoomBehavior = function () {
        if (!this._android) {
            return;
        }
        var zoomHorizontal = false;
        var zoomVertical = false;
        var panHorizontal = false;
        var panVertical = false;
        var i = 0;
        if (this.series) {
            while ((i < this.series.length) && !(panHorizontal && panVertical && zoomHorizontal && zoomVertical)) {
                if (this.series.getItem(i).horizontalAxis) {
                    panHorizontal = panHorizontal || this.series.getItem(i).horizontalAxis.allowPan;
                    zoomHorizontal = zoomHorizontal || this.series.getItem(i).horizontalAxis.allowZoom;
                }
                if (this.series.getItem(i).verticalAxis) {
                    panVertical = panVertical || this.series.getItem(i).verticalAxis.allowPan;
                    zoomVertical = zoomVertical || this.series.getItem(i).verticalAxis.allowZoom;
                }
                i++;
            }
        }
        if (this.horizontalAxis) {
            panHorizontal = panHorizontal || this.horizontalAxis.allowPan;
            zoomHorizontal = zoomHorizontal || this.horizontalAxis.allowZoom;
        }
        if (this.verticalAxis) {
            panVertical = panVertical || this.verticalAxis.allowPan;
            zoomVertical = zoomVertical || this.verticalAxis.allowZoom;
        }
        if (panHorizontal || panVertical || zoomHorizontal || zoomVertical) {
            if (!this._panZoomBehavior) {
                this._panZoomBehavior = new com.telerik.widget.chart.visualization.behaviors.ChartPanAndZoomBehavior();
                var that = new WeakRef(this);
                this._panZoomBehavior.addPanZoomListener(new com.telerik.widget.chart.visualization.behaviors.PanZoomListener({
                    onPan: function (panX, panY) {
                        var args = { eventName: commonModule.RadChartBase.chartPannedEvent, object: that.get(), pointData: null, pointIndex: null, series: null };
                        that.get().notify(args);
                    },
                    onZoom: function (zoomX, zoomY) {
                        var args = { eventName: commonModule.RadChartBase.chartZoomedEvent, object: that.get(), pointData: null, pointIndex: null, series: null };
                        that.get().notify(args);
                    }
                }));
            }
            if (panHorizontal || panVertical) {
                var panMode = com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.NONE;
                if (panHorizontal && panVertical) {
                    panMode = com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.BOTH;
                }
                else {
                    panMode = panHorizontal ? com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.HORIZONTAL : com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.VERTICAL;
                }
                this._panZoomBehavior.setPanMode(panMode);
            }
            if (zoomHorizontal || zoomVertical) {
                var zoomMode = com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.NONE;
                if (zoomHorizontal && zoomVertical) {
                    zoomMode = com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.BOTH;
                }
                else {
                    zoomMode = zoomHorizontal ? com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.HORIZONTAL : com.telerik.widget.chart.visualization.behaviors.ChartPanZoomMode.VERTICAL;
                }
                this._panZoomBehavior.setZoomMode(zoomMode);
            }
            this._android.getBehaviors().add(this._panZoomBehavior);
        }
        else {
            if (this._panZoomBehavior) {
                this._android.getBehaviors().remove(this._panZoomBehavior);
                this._panZoomBehavior = null;
            }
        }
    };
    RadCartesianChart.prototype.initSelectionBehavior = function () {
        if (!this._selectionBehavior) {
            this._selectionBehavior = new com.telerik.widget.chart.visualization.behaviors.ChartSelectionBehavior();
            this._selectionBehavior.setDataPointsSelectionMode(com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.NONE);
            this._selectionBehavior.setSeriesSelectionMode(com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.NONE);
            var that = new WeakRef(this);
            this._selectionBehavior.setSelectionChangeListener(new com.telerik.widget.chart.visualization.behaviors.ChartSelectionChangeListener({
                onSelectionChanged: function (selectionContext) {
                    if (selectionContext.selectedSeries()) {
                        var args = { eventName: commonModule.RadChartBase.seriesSelectedEvent,
                            object: that.get(),
                            series: that.get().series[selectionContext.selectedSeries().getCollectionIndex()],
                            pointIndex: null,
                            pointData: null };
                        that.get().notify(args);
                    }
                    if (selectionContext.deselectedSeries()) {
                        var args = { eventName: commonModule.RadChartBase.seriesDeselectedEvent,
                            object: that.get(),
                            series: that.get().series[selectionContext.deselectedSeries().getCollectionIndex()],
                            pointIndex: null,
                            pointData: null };
                        that.get().notify(args);
                    }
                    if (selectionContext.selectedDataPoint()) {
                        var args = { eventName: commonModule.RadChartBase.pointSelectedEvent,
                            object: that.get(),
                            series: that.get().series.getItem(selectionContext.selectedDataPoint().getPresenter().getCollectionIndex()),
                            pointIndex: selectionContext.selectedDataPoint().index(),
                            pointData: selectionContext.selectedDataPoint() }; //NOTE: we don't have wrapper for DataPoint, so we return native object
                        that.get().notify(args);
                    }
                    if (selectionContext.deselectedDataPoint()) {
                        var args = { eventName: commonModule.RadChartBase.pointDeselectedEvent,
                            object: that.get(),
                            series: that.get().series.getItem(selectionContext.deselectedDataPoint().getPresenter().getCollectionIndex()),
                            pointIndex: selectionContext.deselectedDataPoint().index(),
                            pointData: selectionContext.deselectedDataPoint() }; //NOTE: we don't have wrapper for DataPoint, so we return native object
                        that.get().notify(args);
                    }
                }
            }));
            if (this._android) {
                this._android.getBehaviors().add(this._selectionBehavior);
            }
        }
    };
    RadCartesianChart.prototype.onSeriesSelectionModeChanged = function (data) {
        this.initSelectionBehavior();
        if (data.newValue === publicEnumModule.ChartSelectionMode.None) {
            this._selectionBehavior.setSeriesSelectionMode(com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.NONE);
        }
        if (data.newValue === publicEnumModule.ChartSelectionMode.Single) {
            this._selectionBehavior.setSeriesSelectionMode(com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.SINGLE);
        }
        if (data.newValue === publicEnumModule.ChartSelectionMode.Multiple) {
            this._selectionBehavior.setSeriesSelectionMode(com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.MULTIPLE);
        }
    };
    RadCartesianChart.prototype.onPointSelectionModeChanged = function (data) {
        this.initSelectionBehavior();
        if (data.newValue === publicEnumModule.ChartSelectionMode.None) {
            this._selectionBehavior.setDataPointsSelectionMode(com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.NONE);
        }
        if (data.newValue === publicEnumModule.ChartSelectionMode.Single) {
            this._selectionBehavior.setDataPointsSelectionMode(com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.SINGLE);
        }
        if (data.newValue === publicEnumModule.ChartSelectionMode.Multiple) {
            this._selectionBehavior.setDataPointsSelectionMode(com.telerik.widget.chart.visualization.behaviors.ChartSelectionMode.MULTIPLE);
        }
    };
    RadCartesianChart.prototype.onSelectionModeChanged = function (data) {
    };
    RadCartesianChart.prototype.onHorizontalAxisChanged = function (data) {
        _super.prototype.onHorizontalAxisChanged.call(this, data);
        if (this._android) {
            this._android.setHorizontalAxis(null);
            this._android.setHorizontalAxis(data.newValue.android);
        }
    };
    RadCartesianChart.prototype.onVerticalAxisChanged = function (data) {
        _super.prototype.onVerticalAxisChanged.call(this, data);
        if (this._android) {
            this._android.setVerticalAxis(null);
            this._android.setVerticalAxis(data.newValue.android);
        }
    };
    RadCartesianChart.prototype.onGridChanged = function (data) {
        if (this._android && data.newValue) {
            this._android.setGrid(null);
            this._android.setGrid(data.newValue.android);
        }
    };
    RadCartesianChart.prototype.onAnnotationsChanged = function (data) {
        _super.prototype.onAnnotationsChanged.call(this, data);
        if (data.newValue) {
            var newArray = data.newValue;
            for (var i = 0; i < newArray.length; i++) {
                newArray.getItem(i)._init(this);
            }
        }
    };
    RadCartesianChart.prototype.onHorizontalZoomChanged = function (data) {
        if (!this._android) {
            return;
        }
        if (!isNaN(+data.newValue) && data.newValue > 1) {
            this._android.setZoom(data.newValue, this.verticalZoom ? this.verticalZoom : 1);
        }
        else {
            console.log("WARNING: Vertical zoom must be a number greater or equal to 1");
        }
    };
    RadCartesianChart.prototype.onVerticalZoomChanged = function (data) {
        if (!this._android) {
            return;
        }
        if (!isNaN(+data.newValue) && data.newValue > 1) {
            this._android.setZoom(this.horizontalZoom ? this.horizontalZoom : 1, data.newValue);
        }
        else {
            console.log("WARNING: Vertical zoom must be a number greater or equal to 1");
        }
    };
    RadCartesianChart.prototype.onTrackballChanged = function (data) {
        if (!this._android) {
            return;
        }
        this.removeTrackball(data);
        if (data.newValue && (data.newValue instanceof trackBallCommonModule.Trackball)) {
            data.newValue.android = new com.telerik.widget.chart.visualization.behaviors.ChartTrackBallBehavior(this._context);
            this._android.getBehaviors().add(data.newValue.android);
        }
    };
    RadCartesianChart.prototype.removeTrackball = function (data) {
        if (data.oldValue && this._android.getBehaviors().indexOf(data.oldValue.android) != -1) {
            this._android.getBehaviors().remove(data.oldValue.android);
        }
    };
    RadCartesianChart.prototype.setNativeTrackballBehavior = function (trackball) {
        if (!trackball) {
            return;
        }
        trackball.android = new com.telerik.widget.chart.visualization.behaviors.ChartTrackBallBehavior(this._context);
        this._android.getBehaviors().add(trackball.android);
    };
    return RadCartesianChart;
})(commonModule.RadCartesianChart);
exports.RadCartesianChart = RadCartesianChart;
