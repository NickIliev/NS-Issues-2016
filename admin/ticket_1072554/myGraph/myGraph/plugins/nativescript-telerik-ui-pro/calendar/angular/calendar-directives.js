var core_1 = require("@angular/core");
var _1 = require("./../");
var elementRegistry = require('nativescript-angular/element-registry');
var observable_array_1 = require('data/observable-array');
var RadCalendarComponent = (function () {
    function RadCalendarComponent(_elementRef, _iterableDiffers, _cdr) {
        this._elementRef = _elementRef;
        this._iterableDiffers = _iterableDiffers;
        this._cdr = _cdr;
        this.doCheckDelay = 5;
        this._calendar = _elementRef.nativeElement;
    }
    Object.defineProperty(RadCalendarComponent.prototype, "eventSource", {
        set: function (value) {
            this._eventSource = value;
            var needDiffer = true;
            if (value instanceof observable_array_1.ObservableArray) {
                needDiffer = false;
            }
            if (needDiffer && !this._differ && CollectionUtils.isListLikeIterable(value)) {
                this._differ = this._iterableDiffers.find(this._eventSource).create(this._cdr, function (index, item) { return item; });
            }
            this._calendar.eventSource = this._eventSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCalendarComponent.prototype, "calendar", {
        get: function () {
            return this._calendar;
        },
        enumerable: true,
        configurable: true
    });
    RadCalendarComponent.prototype.ngDoCheck = function () {
        var _this = this;
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        this.timerId = setTimeout(function () {
            clearTimeout(_this.timerId);
            if (_this._differ) {
                var changes = _this._differ.diff(_this._eventSource);
                if (changes) {
                    _this._calendar.reload();
                }
            }
        }, this.doCheckDelay);
    };
    Object.defineProperty(RadCalendarComponent.prototype, "eventSource",
        __decorate([
            core_1.Input()
        ], RadCalendarComponent.prototype, "eventSource", Object.getOwnPropertyDescriptor(RadCalendarComponent.prototype, "eventSource")));
    RadCalendarComponent = __decorate([
        core_1.Component({
            selector: 'RadCalendar',
            template: '',
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __param(1, core_1.Inject(core_1.IterableDiffers)),
        __param(2, core_1.Inject(core_1.ChangeDetectorRef))
    ], RadCalendarComponent);
    return RadCalendarComponent;
})();
exports.RadCalendarComponent = RadCalendarComponent;
////////////////////
// Copied from angular 2 @angular/common/src/facade/collection
var CollectionUtils;
(function (CollectionUtils) {
    function isPresent(obj) {
        return obj !== undefined && obj !== null;
    }
    function isBlank(obj) {
        return obj === undefined || obj === null;
    }
    var _symbolIterator = null;
    var globalScope;
    function getSymbolIterator() {
        if (isBlank(_symbolIterator)) {
            if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
                _symbolIterator = Symbol.iterator;
            }
            else {
                // es6-shim specific logic
                var keys = Object.getOwnPropertyNames(Map.prototype);
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (key !== 'entries' && key !== 'size' &&
                        Map.prototype[key] === Map.prototype['entries']) {
                        _symbolIterator = key;
                    }
                }
            }
        }
        return _symbolIterator;
    }
    function isJsObject(o) {
        return o !== null && (typeof o === 'function' || typeof o === 'object');
    }
    function isArray(obj) {
        return Array.isArray(obj);
    }
    function isListLikeIterable(obj) {
        if (!isJsObject(obj))
            return false;
        return isArray(obj) ||
            (!(obj instanceof Map) &&
                getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
    }
    CollectionUtils.isListLikeIterable = isListLikeIterable;
})(CollectionUtils || (CollectionUtils = {}));
////////////////////
exports.CALENDAR_DIRECTIVES = [RadCalendarComponent];
elementRegistry.registerElement("RadCalendar", function () { return _1.RadCalendar; });
