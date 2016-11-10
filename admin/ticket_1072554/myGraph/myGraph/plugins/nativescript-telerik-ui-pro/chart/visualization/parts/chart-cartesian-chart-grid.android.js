var cartesianChartGridModule = require("./chart-cartesian-chart-grid-common");
var utilsModule = require("utils/utils");
var color_1 = require("color");
var RadCartesianChartGrid = (function (_super) {
    __extends(RadCartesianChartGrid, _super);
    function RadCartesianChartGrid() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(RadCartesianChartGrid.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.chart.visualization.cartesianChart.CartesianChartGrid();
                this._android.setCanApplyPalette(false);
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RadCartesianChartGrid.prototype.onVerticalLinesVisibleChanged = function (data) {
        if (data.newValue === true) {
            if (this.horizontalLinesVisible === true) {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.XY);
            }
            else {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.X);
            }
        }
        else {
            if (this.horizontalLinesVisible === true) {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.Y);
            }
            else {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.NONE);
            }
        }
    };
    RadCartesianChartGrid.prototype.onHorizontalLinesVisibleChanged = function (data) {
        if (data.newValue === true) {
            if (this.verticalLinesVisible === true) {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.XY);
            }
            else {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.Y);
            }
        }
        else {
            if (this.verticalLinesVisible === true) {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.X);
            }
            else {
                this.android.setMajorLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.NONE);
            }
        }
    };
    RadCartesianChartGrid.prototype.onHorizontalStripLinesVisibleChanged = function (data) {
        if (data.newValue === true) {
            if (this.verticalStripLinesVisible === true) {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.XY);
            }
            else {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.Y);
            }
        }
        else {
            if (this.verticalStripLinesVisible === true) {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.X);
            }
            else {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.NONE);
            }
        }
    };
    RadCartesianChartGrid.prototype.onVerticalStripLinesVisibleChanged = function (data) {
        if (data.newValue === true) {
            if (this.horizontalStripLinesVisible === true) {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.XY);
            }
            else {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.X);
            }
        }
        else {
            if (this.horizontalStripLinesVisible === true) {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.Y);
            }
            else {
                this.android.setStripLinesVisibility(com.telerik.widget.chart.visualization.cartesianChart.GridLineVisibility.NONE);
            }
        }
    };
    RadCartesianChartGrid.prototype.onVerticalStrokeColorChanged = function (data) {
        if (data.newValue) {
            this.android.setVerticalLineColor((new color_1.Color(data.newValue)).android);
            this.android.requestRender();
        }
    };
    RadCartesianChartGrid.prototype.onHorizontalStrokeColorChanged = function (data) {
        if (data.newValue) {
            this.android.setLineColor((new color_1.Color(data.newValue)).android);
            this.android.requestRender();
        }
    };
    RadCartesianChartGrid.prototype.onHorizontalStrokeWidthChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.android.setLineThickness(data.newValue * utilsModule.layout.getDisplayDensity());
            this.android.requestRender();
        }
    };
    RadCartesianChartGrid.prototype.onVerticalStrokeWidthChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.android.setVerticalLineThickness(data.newValue * utilsModule.layout.getDisplayDensity());
            this.android.requestRender();
        }
    };
    RadCartesianChartGrid.prototype.onVerticalStripLineColorChanged = function (data) {
        if (!data.newValue) {
            return;
        }
        this.android.getXStripeBrushes().clear();
        var colors = data.newValue.split(',');
        for (var i = 0; i < colors.length; i++) {
            var stripePaint = new android.graphics.Paint();
            stripePaint.setStyle(android.graphics.Paint.Style.FILL);
            stripePaint.setColor((new color_1.Color(colors[i].trim())).android);
            this.android.getXStripeBrushes().add(stripePaint);
        }
        this.android.requestRender();
    };
    RadCartesianChartGrid.prototype.onHorizontalStripLineColorChanged = function (data) {
        if (!data.newValue) {
            return;
        }
        this.android.getYStripeBrushes().clear();
        var colors = data.newValue.split(',');
        for (var i = 0; i < colors.length; i++) {
            var stripePaint = new android.graphics.Paint();
            stripePaint.setStyle(android.graphics.Paint.Style.FILL);
            stripePaint.setColor((new color_1.Color(colors[i].trim())).android);
            this.android.getYStripeBrushes().add(stripePaint);
        }
        this.android.requestRender();
    };
    return RadCartesianChartGrid;
})(cartesianChartGridModule.RadCartesianChartGrid);
exports.RadCartesianChartGrid = RadCartesianChartGrid;
