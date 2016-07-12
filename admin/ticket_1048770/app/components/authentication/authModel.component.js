"use strict";
var Authentication = (function () {
    function Authentication() {
        this.username = "grata"; // can be any name
        this.password = "";
        this.loggedIn = false;
        this.message = "Just started";
        this.accounts = { grata: "grata16" }; // password
    }
    Authentication.prototype.login = function () {
        if (this.password === this.accounts[this.username]) {
            this.message = "Welcome " + this.username;
            this.loggedIn = true;
            return true;
        }
        this.message = "Invalid username or password. Use your GRATA account, please! ";
        return false;
    };
    Authentication.prototype.logout = function () {
        this.message = "You are logged out";
        this.loggedIn = false;
        this.password = "";
    };
    return Authentication;
}());
exports.Authentication = Authentication;
//# sourceMappingURL=authModel.component.js.map