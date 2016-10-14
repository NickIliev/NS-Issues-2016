"use strict";
var app = require('application');
var frame_1 = require("ui/frame");
var Activity = (function (_super) {
    __extends(Activity, _super);
    function Activity() {
        _super.apply(this, arguments);
    }
    Activity.prototype.onUserInteraction = function () {
        console.log("onUserInteraction overwritten from app.ts"); // OVERWRITTEN BEHAVIOUR
    };
    Activity.prototype.onCreate = function (savedInstanceState) {
        if (!this._callbacks) {
            frame_1.setActivityCallbacks(this);
        }
        this._callbacks.onCreate(this, savedInstanceState, _super.prototype.onCreate);
    };
    Activity.prototype.onSaveInstanceState = function (outState) {
        this._callbacks.onSaveInstanceState(this, outState, _super.prototype.onSaveInstanceState);
    };
    Activity.prototype.onStart = function () {
        this._callbacks.onStart(this, _super.prototype.onStart);
    };
    Activity.prototype.onStop = function () {
        this._callbacks.onStop(this, _super.prototype.onStop);
    };
    Activity.prototype.onDestroy = function () {
        this._callbacks.onDestroy(this, _super.prototype.onDestroy);
    };
    Activity.prototype.onBackPressed = function () {
        this._callbacks.onBackPressed(this, _super.prototype.onBackPressed);
    };
    Activity.prototype.onRequestPermissionsResult = function (requestCode, permissions, grantResults) {
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
    };
    Activity.prototype.onActivityResult = function (requestCode, resultCode, data) {
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, _super.prototype.onActivityResult);
    };
    Activity = __decorate([
        JavaProxy("com.tns.NativeScriptActivity"), 
        __metadata('design:paramtypes', [])
    ], Activity);
    return Activity;
}(android.app.Activity));
app.start({ moduleName: 'main-page' });
//# sourceMappingURL=app.js.map