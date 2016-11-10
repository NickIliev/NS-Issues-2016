var dependencyObservable = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var bindable_1 = require("ui/core/bindable");
var Palette = (function (_super) {
    __extends(Palette, _super);
    function Palette() {
        _super.call(this);
        this.entries = new Array();
    }
    Palette.prototype._addArrayFromBuilder = function (name, value) {
        if (name === "entries") {
            this.entries = value;
        }
    };
    Palette.entriesCollectionChanged = function (data) {
        var palette = data.object;
        palette.onEntriesCollectionChanged(data);
    };
    Palette.prototype.onEntriesCollectionChanged = function (data) {
        this.updateOwner();
    };
    Palette.seriesNamePropertyChanged = function (data) {
        var palette = data.object;
        palette.onSeriesNamePropertyChanged(data);
    };
    Palette.prototype.onSeriesNamePropertyChanged = function (data) {
        this.updateOwner();
    };
    Palette.seriesStatePropertyChanged = function (data) {
        var palette = data.object;
        palette.onSeriesStatePropertyChanged(data);
    };
    Palette.prototype.onSeriesStatePropertyChanged = function (data) {
        this.updateOwner();
    };
    Palette.prototype.updateOwner = function () {
        if (this.owner && this.owner.reloadPalettes) {
            this.owner.reloadPalettes();
        }
    };
    Object.defineProperty(Palette.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Palette.prototype, "entries", {
        get: function () {
            return this._getValue(Palette.entriesProperty);
        },
        set: function (value) {
            this._setValue(Palette.entriesProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Palette.prototype, "seriesName", {
        get: function () {
            return this._getValue(Palette.seriesNameProperty);
        },
        set: function (value) {
            this._setValue(Palette.seriesNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Palette.prototype, "seriesState", {
        get: function () {
            return this._getValue(Palette.seriesStateProperty);
        },
        set: function (value) {
            this._setValue(Palette.seriesStateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Palette.entriesProperty = new dependencyObservable.Property("entries", "Palette", new proxy_1.PropertyMetadata(undefined, undefined, Palette.entriesCollectionChanged));
    Palette.seriesNameProperty = new dependencyObservable.Property("seriesName", "Palette", new proxy_1.PropertyMetadata(undefined, undefined, Palette.seriesNamePropertyChanged));
    Palette.seriesStateProperty = new dependencyObservable.Property("seriesState", "PaletteEntry", new proxy_1.PropertyMetadata(undefined, undefined, Palette.seriesStatePropertyChanged));
    return Palette;
})(bindable_1.Bindable);
exports.Palette = Palette;
var PaletteEntry = (function (_super) {
    __extends(PaletteEntry, _super);
    function PaletteEntry() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PaletteEntry.prototype, "fillColor", {
        get: function () {
            return this._getValue(PaletteEntry.fillColorProperty);
        },
        set: function (value) {
            this._setValue(PaletteEntry.fillColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaletteEntry.prototype, "strokeColor", {
        get: function () {
            return this._getValue(PaletteEntry.strokeColorProperty);
        },
        set: function (value) {
            this._setValue(PaletteEntry.strokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaletteEntry.prototype, "strokeWidth", {
        get: function () {
            return this._getValue(PaletteEntry.strokeWidthProperty);
        },
        set: function (value) {
            this._setValue(PaletteEntry.strokeWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    PaletteEntry.fillColorProperty = new dependencyObservable.Property("fillColor", "PaletteEntry", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    PaletteEntry.strokeWidthProperty = new dependencyObservable.Property("strokeWidth", "PaletteEntry", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    PaletteEntry.strokeColorProperty = new dependencyObservable.Property("strokeColor", "PaletteEntry", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    return PaletteEntry;
})(bindable_1.Bindable);
exports.PaletteEntry = PaletteEntry;
