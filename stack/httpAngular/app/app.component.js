"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var AppComponent = (function () {
    function AppComponent(http, change) {
        this.http = http;
        this.change = change;
        this.job = { salesAssociateName: "default job" };
        this.salesAssociateName = "default name";
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getJob();
    };
    AppComponent.prototype.getJob = function () {
        var _this = this;
        var url = "http://httpbin.org/get";
        var headers = this.createRequestHeader();
        this.http.get(url, { headers: headers })
            .map(function (response) { return response.json(); })
            .do(function (data) {
            _this.setData();
        }).subscribe(function () { return _this.success(); }, function (error) { return _this.error(); });
    };
    AppComponent.prototype.createRequestHeader = function () {
        var headers = new http_1.Headers();
        return headers;
    };
    AppComponent.prototype.setData = function () {
        this.job.salesAssociateName = "NEW job SalesAssociateName";
        this.salesAssociateName = "NEW job FullName";
        this.change.markForCheck();
    };
    AppComponent.prototype.success = function () {
        alert("success");
    };
    AppComponent.prototype.error = function () {
        alert("There was a problem retrieving your customer job.");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "job", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AppComponent.prototype, "salesAssociateName", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [http_1.Http, core_1.ChangeDetectorRef])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map