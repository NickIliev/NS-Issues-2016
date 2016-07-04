"use strict";
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Tour of Heroes';
        this.hero = 'Windstorm';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: "\n<StackLayout>\n    <Label [text]=\"title\" class=\"title\"></Label>\n    <Label [text]=\"hero\" class=\"message\" textWrap=\"true\"></Label>\n</StackLayout>\n",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
// template: '<h1>{{title}}</h1><h2>{{hero}} details!</h2>' 
//# sourceMappingURL=app.component.js.map