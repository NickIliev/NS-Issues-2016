"use strict";
var core_1 = require("@angular/core");
var router_deprecated_1 = require("@angular/router-deprecated");
var MainPage = (function () {
    function MainPage(router) {
        this.router = router;
        this.router = router;
    }
    MainPage.prototype.moveTo = function (where) {
        console.log("Navigating to: " + where);
        this.router.navigate([where]);
    };
    MainPage = __decorate([
        core_1.Component({
            selector: "my-main",
            templateUrl: "./Main/main.xml",
            styleUrls: ["./Main/main.css"]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], MainPage);
    return MainPage;
}());
exports.MainPage = MainPage;
//# sourceMappingURL=main.component.js.map