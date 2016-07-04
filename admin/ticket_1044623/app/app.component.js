"use strict";
var core_1 = require("@angular/core");
var segmented_bar_1 = require("ui/segmented-bar");
var AppComponent = (function () {
    function AppComponent() {
        this.segmItems = [];
        for (var i = 0; i < 3; i++) {
            var segmentedBarItem = new segmented_bar_1.SegmentedBarItem();
            segmentedBarItem.title = "Item " + (i + 1);
            this.segmItems.push(segmentedBarItem);
        }
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: "\n        <SegmentedBar [items]='segmItems'>\n        </SegmentedBar>\n",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map