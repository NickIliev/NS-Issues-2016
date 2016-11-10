var trackBallModule = require("./chart-track-ball-common");
var chart_public_enum_1 = require("../../misc/chart-public-enum");
var Trackball = (function (_super) {
    __extends(Trackball, _super);
    function Trackball() {
        _super.call(this);
    }
    Object.defineProperty(Trackball.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
            this.updateNativeSnapMode(this.snapMode);
            this.updateShowIntersectionPoints(this.showIntersectionPoints);
        },
        enumerable: true,
        configurable: true
    });
    Trackball.prototype.onSnapModeChanged = function (data) {
        if (!this._ios) {
            return;
        }
        if (data.newValue) {
            this.updateNativeSnapMode(data.newValue);
        }
    };
    Trackball.prototype.onShowIntersectionPointsChanged = function (data) {
        if (!this._ios) {
            return;
        }
        if (data.newValue) {
            this.updateShowIntersectionPoints(data.newValue);
        }
    };
    Trackball.prototype.updateShowIntersectionPoints = function (value) {
        if (value) {
            this.ios.line.style.pointShape.size = CGSizeMake(4, 4);
        }
        else {
            this.ios.line.style.pointShape.size = CGSizeZero;
        }
    };
    Trackball.prototype.updateNativeSnapMode = function (snapMode) {
        if (snapMode.toLowerCase() === chart_public_enum_1.TrackballSnapMode.ClosestPoint.toLowerCase()) {
            this.ios.snapMode = TKChartTrackballSnapMode.TKChartTrackballSnapModeClosestPoint;
        }
        else if (snapMode.toLowerCase() === chart_public_enum_1.TrackballSnapMode.AllClosestPoints.toLowerCase()) {
            this.ios.snapMode = TKChartTrackballSnapMode.TKChartTrackballSnapModeAllClosestPoints;
        }
        else {
            console.log("WARNING: Unsupported trackball snap mode set: " + snapMode);
        }
    };
    return Trackball;
})(trackBallModule.Trackball);
exports.Trackball = Trackball;
