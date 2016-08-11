"use strict";
var core_1 = require('@angular/core');
var DataItem = (function () {
    function DataItem(id, name) {
        this.id = id;
        this.name = name;
    }
    return DataItem;
}());
var ListTest = (function () {
    function ListTest() {
        this.myItems = [];
        this.counter = 0;
        for (var i = 0; i < 50; i++) {
            this.myItems.push(new DataItem(i, "data item " + i));
            this.counter = i;
        }
    }
    ListTest.prototype.onItemTap = function (args) {
        console.log("------------------------ ItemTapped: " + args.index);
    };
    ListTest = __decorate([
        core_1.Component({
            selector: 'list-test',
            styleUrls: ['list-test.css'],
            template: 'list-test.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], ListTest);
    return ListTest;
}());
exports.ListTest = ListTest;
//# sourceMappingURL=list-test.component.js.map