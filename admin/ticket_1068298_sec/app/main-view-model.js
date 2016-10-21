var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var observable = require("data/observable");
var WebViewSampleModel = (function (_super) {
    __extends(WebViewSampleModel, _super);
    function WebViewSampleModel() {
        _super.call(this);
        this.set("url", "https://docs.nativescript.org/");
    }
    WebViewSampleModel.prototype.loadAction = function () {
        this.set("url");
    };
    return WebViewSampleModel;
})(observable.Observable);

exports.WebViewSampleModel = WebViewSampleModel;
exports.mainViewModel = new WebViewSampleModel();