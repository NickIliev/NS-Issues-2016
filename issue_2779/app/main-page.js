"use strict";
var observable_1 = require('data/observable');
function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = new Index(page);
}
exports.onNavigatingTo = onNavigatingTo;
var Index = (function (_super) {
    __extends(Index, _super);
    function Index(_page) {
        _super.call(this);
        this._page = _page;
        this._digits = [];
    }
    Object.defineProperty(Index.prototype, "digits", {
        get: function () {
            return this._digits;
        },
        set: function (value) {
            this._digits = value;
            this.notifyPropertyChange('digits', value);
        },
        enumerable: true,
        configurable: true
    });
    Index.prototype.tapped = function (args) {
        if (this.digits.length == 4) {
            return;
        }
        var btn = args.object;
        var iosButton = btn.ios;
        // console.log('label.text', label.text)
        // console.dir('ioslabel.frame.origin', ioslabel.frame.origin)
        console.log("X: " + iosButton.frame.origin.x);
        console.log("Y: " + iosButton.frame.origin.y); // this is always 0
        if (this.digits.length < 4) {
            this._digits.push(btn.text);
            this.digits = this._digits;
        }
    };
    Index.prototype.clear = function () {
        if (this.digits.length > 0) {
            this._digits.pop();
            this.digits = this._digits;
        }
    };
    return Index;
}(observable_1.Observable));
//# sourceMappingURL=main-page.js.map