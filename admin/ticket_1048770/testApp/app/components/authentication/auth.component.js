"use strict";
//import 'reflect-meta';
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var authModel_component_1 = require("./authModel.component");
var AuthenticationPage = (function () {
    function AuthenticationPage() {
        this.authentication = new authModel_component_1.Authentication();
    }
    AuthenticationPage.prototype.onLoginTap = function (form, username, password) {
        this.authentication.username = username.toLowerCase();
        this.authentication.password = password.toLowerCase();
        var result = this.authentication.login();
        if (result == false) {
            this.animateFailedAction(form);
        }
    };
    // animation
    AuthenticationPage.prototype.animateFailedAction = function (component) {
        component.animate({
            translate: { x: 10, y: 0 },
            duration: 50,
            iterations: 5
        })
            .then(function () {
            component.animate({
                translate: { x: 0, y: 0 }
            });
        });
    };
    AuthenticationPage = __decorate([
        core_1.Component({
            selector: 'authenticationView',
            directives: [common_1.NgIf],
            template: "./components/authentication/auth.html",
        }), 
        __metadata('design:paramtypes', [])
    ], AuthenticationPage);
    return AuthenticationPage;
}());
exports.AuthenticationPage = AuthenticationPage;
//# sourceMappingURL=auth.component.js.map