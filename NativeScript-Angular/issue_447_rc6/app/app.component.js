var core_1 = require('@angular/core');
var FirstComponent = (function () {
    function FirstComponent() {
    }
    FirstComponent = __decorate([
        core_1.Component({
            selector: "first",
            template: "\n    <StackLayout>\n        <Label text=\"First component\" class=\"title\"></Label>\n        <Button text=\"GO TO SECOND\" [nsRouterLink]=\"['/second']\" class=\"link\"></Button>\n    </StackLayout>"
        }), 
        __metadata('design:paramtypes', [])
    ], FirstComponent);
    return FirstComponent;
}());
exports.FirstComponent = FirstComponent;
var SecondComponent = (function () {
    function SecondComponent() {
    }
    SecondComponent = __decorate([
        core_1.Component({
            selector: "second",
            template: "\n    <StackLayout>\n        <Label text=\"Second component\" class=\"title\"></Label>\n        <Button text=\"GO TO FIRST\" [nsRouterLink]=\"['/first']\" class=\"link\"></Button>\n    </StackLayout>"
        }), 
        __metadata('design:paramtypes', [])
    ], SecondComponent);
    return SecondComponent;
}());
exports.SecondComponent = SecondComponent;
//# sourceMappingURL=app.component.js.map