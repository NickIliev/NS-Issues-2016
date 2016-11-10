var commonModule = require("./calendar-common");
var color_1 = require("color");
var observable_array_1 = require("data/observable-array");
require("utils/module-merge").merge(commonModule, exports);
////////////////////////////////////////////////////////////////////////////////////////////////////
var CalendarEvent = (function (_super) {
    __extends(CalendarEvent, _super);
    function CalendarEvent() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CalendarEvent.prototype, "ios", {
        get: function () {
            if (!this._ios) {
                this._ios = TKCalendarEvent.new();
            }
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    CalendarEvent.prototype._setIsAllDay = function (value) {
        this.ios.allDay = value;
    };
    CalendarEvent.prototype._getIsAllDay = function () {
        return this.ios.allDay;
    };
    CalendarEvent.prototype._setEndDate = function (date) {
        this.ios.endDate = date;
    };
    CalendarEvent.prototype._getEndDate = function () {
        return this.ios.endDate;
    };
    CalendarEvent.prototype._setStartDate = function (date) {
        this.ios.startDate = date;
    };
    CalendarEvent.prototype._getStartDate = function () {
        return this.ios.startDate;
    };
    CalendarEvent.prototype._setTitle = function (value) {
        this.ios.title = value;
    };
    CalendarEvent.prototype._getTitle = function () {
        return this.ios.title;
    };
    CalendarEvent.prototype._setEventColor = function (value) {
        this.ios.eventColor = value.ios;
    };
    CalendarEvent.prototype._getEventColor = function () {
        if (this.ios.eventColor) {
            var a = new interop.Reference();
            var r = new interop.Reference();
            var g = new interop.Reference();
            var b = new interop.Reference();
            this.ios.eventColor.getRedGreenBlueAlpha(r, g, b, a);
            return new color_1.Color(Math.round(a.value * 255), Math.round(r.value * 255), Math.round(g.value * 255), Math.round(b.value * 255));
        }
    };
    return CalendarEvent;
})(commonModule.CalendarEvent);
exports.CalendarEvent = CalendarEvent;
/**
 * Helper methods
 */
var Tools = (function () {
    function Tools() {
    }
    Tools.createFont = function (fontName, fontStyle, fontSize) {
        var font = null;
        var size = fontSize || 10;
        if (fontName) {
            font = UIFont.fontWithNameSize(fontName, size);
        }
        else {
            font = UIFont.systemFontOfSize(size);
        }
        if (!font) {
            console.log("WARNING: Cannot create font with given name: " + font + ". System font will be used instead.");
            font = UIFont.systemFontOfSize(size);
            return;
        }
        if (fontStyle) {
            var traits = UIFontDescriptorSymbolicTraits.UIFontDescriptorClassUnknown;
            switch (fontStyle.toLowerCase()) {
                case commonModule.FontStyles.Bold.toLowerCase():
                    traits = UIFontDescriptorSymbolicTraits.UIFontDescriptorTraitBold;
                    break;
                case commonModule.FontStyles.Italic.toLowerCase():
                    traits = UIFontDescriptorSymbolicTraits.UIFontDescriptorTraitItalic;
                    break;
                case commonModule.FontStyles.BoldItalic.toLowerCase():
                    traits = UIFontDescriptorSymbolicTraits.UIFontDescriptorTraitBold | UIFontDescriptorSymbolicTraits.UIFontDescriptorTraitItalic;
                    break;
            }
            var newFont = UIFont.fontWithDescriptorSize(font.fontDescriptor().fontDescriptorWithSymbolicTraits(traits), size);
            if (newFont) {
                font = newFont;
            }
        }
        return font;
    };
    return Tools;
})();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          STYLES FOR DIFFERENT CELL TYPES 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var CellStyleInitializer = (function () {
    function CellStyleInitializer() {
    }
    CellStyleInitializer.prototype.onCellBorderWidthChanged = function (data, style) {
        if (!isNaN(+data.newValue)) {
            style.ios.leftBorderWidth = data.newValue;
            style.ios.rightBorderWidth = data.newValue;
            style.ios.topBorderWidth = data.newValue;
            style.ios.bottomBorderWidth = data.newValue;
        }
    };
    CellStyleInitializer.prototype.onCellBorderColorChanged = function (data, style) {
        if (data.newValue) {
            var color = new color_1.Color(data.newValue);
            style.ios.leftBorderColor = color.ios;
            style.ios.rightBorderColor = color.ios;
            style.ios.topBorderColor = color.ios;
            style.ios.bottomBorderColor = color.ios;
        }
    };
    CellStyleInitializer.prototype.onCellBackgroundColorChanged = function (data, style) {
        if (data.newValue) {
            style.ios.backgroundColor = (new color_1.Color(data.newValue)).ios;
        }
    };
    CellStyleInitializer.prototype.onCellAlignmentChanged = function (data, style) {
        if (!data.newValue) {
            return;
        }
        switch (data.newValue.toLowerCase()) {
            case commonModule.CalendarCellAlignment.Bottom.toLowerCase():
                style.ios.textAlignment = 8 /* Bottom */;
                break;
            case commonModule.CalendarCellAlignment.Top.toLowerCase():
                style.ios.textAlignment = 4 /* Top */;
                break;
            case commonModule.CalendarCellAlignment.Left.toLowerCase():
                style.ios.textAlignment = 1 /* Left */;
                break;
            case commonModule.CalendarCellAlignment.Right.toLowerCase():
                style.ios.textAlignment = 2 /* Right */;
                break;
            case commonModule.CalendarCellAlignment.HorizontalCenter.toLowerCase():
                style.ios.textAlignment = 16 /* HorizontalCenter */;
                break;
            case commonModule.CalendarCellAlignment.VerticalCenter.toLowerCase():
                style.ios.textAlignment = 32 /* VerticalCenter */;
                break;
            default:
                console.log("WARNING: Unsupportd cell allignment value: " + data.newValue);
        }
    };
    CellStyleInitializer.prototype.onCellPaddingHorizontalChanged = function (data, style) {
        if (!isNaN(+data.newValue)) {
            var vertPadding = (!isNaN(+style.cellPaddingVertical)) ? style.cellPaddingVertical : 0;
            style.ios.textInsets = UIEdgeInsetsFromString("{" + vertPadding + ", " + data.newValue + ", " + vertPadding + ", " + data.newValue + "}");
            // in android you cannot set event paddings exclusively, there is only cell paddings. That's why we apply the paddings to all of the cell content, including events
            if (style instanceof DayCellStyle) {
                style.ios.eventInsets = UIEdgeInsetsFromString("{" + vertPadding + ", " + data.newValue + ", " + vertPadding + ", " + data.newValue + "}");
            }
        }
    };
    CellStyleInitializer.prototype.onCellPaddingVerticalChanged = function (data, style) {
        if (!isNaN(+data.newValue)) {
            var horzPadding = (!isNaN(+style.cellPaddingHorizontal)) ? style.cellPaddingHorizontal : 0;
            style.ios.textInsets = UIEdgeInsetsFromString("{" + data.newValue + ", " + horzPadding + ", " + data.newValue + ", " + horzPadding + "}");
            // in android you cannot set event paddings exclusively, there is only cell paddings. That's why we apply the paddings to all of the cell content, including events
            if (style instanceof DayCellStyle) {
                style.ios.eventInsets = UIEdgeInsetsFromString("{" + data.newValue + ", " + horzPadding + ", " + data.newValue + ", " + horzPadding + "}");
            }
        }
    };
    CellStyleInitializer.prototype.onCellTextColorChanged = function (data, style) {
        if (data.newValue) {
            style.ios.textColor = (new color_1.Color(data.newValue)).ios;
        }
    };
    CellStyleInitializer.prototype.onCellTextFontNameChanged = function (data, style) {
        if (data.newValue) {
            style.ios.textFont = Tools.createFont(data.newValue, style.cellTextFontStyle, style.cellTextSize);
        }
    };
    CellStyleInitializer.prototype.onCellTextFontStyleChanged = function (data, style) {
        if (data.newValue) {
            style.ios.textFont = Tools.createFont(style.cellTextFontName, data.newValue, style.cellTextSize);
        }
    };
    CellStyleInitializer.prototype.onCellTextSizeChanged = function (data, style) {
        if (!isNaN(+data.newValue)) {
            style.ios.textFont = Tools.createFont(style.cellTextFontName, style.cellTextFontStyle, data.newValue);
        }
    };
    return CellStyleInitializer;
})();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var CellStyle = (function (_super) {
    __extends(CellStyle, _super);
    function CellStyle() {
        _super.call(this);
        this._ios = TKCalendarCellStyle.alloc().init();
    }
    Object.defineProperty(CellStyle.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new CellStyleInitializer();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellStyle.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.onCellBorderWidthChanged = function (data) {
        this.initializer.onCellBorderWidthChanged(data, this);
    };
    CellStyle.prototype.onCellBorderColorChanged = function (data) {
        this.initializer.onCellBorderColorChanged(data, this);
    };
    CellStyle.prototype.onCellBackgroundColorChanged = function (data) {
        this.initializer.onCellBackgroundColorChanged(data, this);
    };
    CellStyle.prototype.onCellTextColorChanged = function (data) {
        this.initializer.onCellTextColorChanged(data, this);
    };
    CellStyle.prototype.onCellTextFontNameChanged = function (data) {
        this.initializer.onCellTextFontNameChanged(data, this);
    };
    CellStyle.prototype.onCellTextFontStyleChanged = function (data) {
        this.initializer.onCellTextFontStyleChanged(data, this);
    };
    CellStyle.prototype.onCellTextSizeChanged = function (data) {
        this.initializer.onCellTextSizeChanged(data, this);
    };
    CellStyle.prototype.onCellPaddingHorizontalChanged = function (data) {
        this.initializer.onCellPaddingHorizontalChanged(data, this);
    };
    CellStyle.prototype.onCellPaddingVerticalChanged = function (data) {
        this.initializer.onCellPaddingVerticalChanged(data, this);
    };
    CellStyle.prototype.onCellAlignmentChanged = function (data) {
        this.initializer.onCellAlignmentChanged(data, this);
    };
    return CellStyle;
})(commonModule.CellStyle);
exports.CellStyle = CellStyle;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var DayCellStyle = (function (_super) {
    __extends(DayCellStyle, _super);
    function DayCellStyle() {
        _super.call(this);
        this._ios = TKCalendarDayCellStyle.alloc().init();
    }
    Object.defineProperty(DayCellStyle.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new CellStyleInitializer();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayCellStyle.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    DayCellStyle.prototype.onCellBorderWidthChanged = function (data) {
        this.initializer.onCellBorderWidthChanged(data, this);
    };
    DayCellStyle.prototype.onCellBorderColorChanged = function (data) {
        this.initializer.onCellBorderColorChanged(data, this);
    };
    DayCellStyle.prototype.onCellBackgroundColorChanged = function (data) {
        this.initializer.onCellBackgroundColorChanged(data, this);
    };
    DayCellStyle.prototype.onCellTextColorChanged = function (data) {
        this.initializer.onCellTextColorChanged(data, this);
    };
    DayCellStyle.prototype.onCellTextFontNameChanged = function (data) {
        this.initializer.onCellTextFontNameChanged(data, this);
    };
    DayCellStyle.prototype.onCellTextFontStyleChanged = function (data) {
        this.initializer.onCellTextFontStyleChanged(data, this);
    };
    DayCellStyle.prototype.onCellTextSizeChanged = function (data) {
        this.initializer.onCellTextSizeChanged(data, this);
    };
    DayCellStyle.prototype.onCellPaddingHorizontalChanged = function (data) {
        this.initializer.onCellPaddingHorizontalChanged(data, this);
    };
    DayCellStyle.prototype.onCellPaddingVerticalChanged = function (data) {
        this.initializer.onCellPaddingVerticalChanged(data, this);
    };
    DayCellStyle.prototype.onCellAlignmentChanged = function (data) {
        this.initializer.onCellAlignmentChanged(data, this);
    };
    //day cell specific properties
    DayCellStyle.prototype.onShowEventsTextChanged = function (data) {
        this.ios.displayEventsAsText = data.newValue;
    };
    DayCellStyle.prototype.onEventTextColorChanged = function (data) {
        if (data.newValue) {
            this.ios.eventTextColor = (new color_1.Color(data.newValue)).ios;
        }
    };
    DayCellStyle.prototype.onEventFontNameChanged = function (data) {
        if (data.newValue) {
            this.ios.eventFont = Tools.createFont(data.newValue, this.eventFontStyle, this.eventTextSize);
        }
    };
    DayCellStyle.prototype.onEventFontStyleChanged = function (data) {
        if (data.newValue) {
            this.ios.eventFont = Tools.createFont(this.eventFontName, data.newValue, this.eventTextSize);
        }
    };
    DayCellStyle.prototype.onEventTextSizeChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.ios.eventFont = Tools.createFont(this.eventFontName, this.eventFontStyle, data.newValue);
        }
    };
    return DayCellStyle;
})(commonModule.DayCellStyle);
exports.DayCellStyle = DayCellStyle;
/**
 * Cell style class for months in year view mode
 */
var MonthCellStyle = (function (_super) {
    __extends(MonthCellStyle, _super);
    function MonthCellStyle() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(MonthCellStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.updateNativePresenter();
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.updateNativePresenter = function () {
        if (this._owner && (this._owner.ios.presenter instanceof TKCalendarYearPresenter)) {
            if (this.dayTextColor)
                this._owner.ios.presenter.style.dayTextColor = (new color_1.Color(this.dayTextColor)).ios;
            if (this.weekendTextColor)
                this._owner.ios.presenter.style.weekendTextColor = (new color_1.Color(this.weekendTextColor)).ios;
            if (this.todayTextColor)
                this._owner.ios.presenter.style.todayTextColor = (new color_1.Color(this.todayTextColor)).ios;
            if (this.dayNameTextColor)
                this._owner.ios.presenter.style.dayNameTextColor = (new color_1.Color(this.dayNameTextColor)).ios;
            if (this.monthNameTextColor)
                this._owner.ios.presenter.style.monthNameTextColor = (new color_1.Color(this.monthNameTextColor)).ios;
            this._owner.ios.presenter.style.dayFont = Tools.createFont(this.dayFontName, this.dayFontStyle, this.dayTextSize);
            this._owner.ios.presenter.style.dayNameFont = Tools.createFont(this.dayNameFontName, this.dayNameFontStyle, this.dayNameTextSize);
            this._owner.ios.presenter.style.monthNameFont = Tools.createFont(this.monthNameFontName, this.monthNameFontStyle, this.monthNameTextSize);
            //note: since android calendar in year view doesn't support shape color, we disable it for ios too
            this._owner.ios.presenter.style.todayShapeFill = null;
        }
    };
    MonthCellStyle.prototype.onWeekendTextColorChanged = function (data) {
        if (data.newValue && this._owner) {
            this._owner.ios.presenter.style.weekendTextColor = (new color_1.Color(data.newValue)).ios;
        }
    };
    MonthCellStyle.prototype.onTodayTextColorChanged = function (data) {
        if (data.newValue && this._owner) {
            this._owner.ios.presenter.style.todayTextColor = (new color_1.Color(data.newValue)).ios;
        }
    };
    MonthCellStyle.prototype.onDayTextColorChanged = function (data) {
        if (data.newValue && this._owner) {
            this._owner.ios.presenter.style.dayTextColor = (new color_1.Color(data.newValue)).ios;
        }
    };
    MonthCellStyle.prototype.onDayFontNameChanged = function (data) {
        if (this._owner && data.newValue) {
            this._owner.ios.presenter.style.dayFont = Tools.createFont(data.newValue, this.dayFontStyle, this.dayTextSize);
        }
    };
    MonthCellStyle.prototype.onDayFontStyleChanged = function (data) {
        if (this._owner && data.newValue) {
            this._owner.ios.presenter.style.dayFont = Tools.createFont(this.dayFontName, data.newValue, this.dayTextSize);
        }
    };
    MonthCellStyle.prototype.onDayTextSizeChanged = function (data) {
        if (this._owner && !isNaN(+data.newValue)) {
            this._owner.ios.presenter.style.dayFont = Tools.createFont(this.dayFontName, this.dayFontStyle, data.newValue);
        }
    };
    MonthCellStyle.prototype.onDayNameTextColorChanged = function (data) {
        if (data.newValue && this._owner) {
            this._owner.ios.presenter.style.dayNameTextColor = (new color_1.Color(data.newValue)).ios;
        }
    };
    MonthCellStyle.prototype.onDayNameFontNameChanged = function (data) {
        if (this._owner && data.newValue) {
            this._owner.ios.presenter.style.dayNameFont = Tools.createFont(data.newValue, this.dayNameFontStyle, this.dayNameTextSize);
        }
    };
    MonthCellStyle.prototype.onDayNameFontStyleChanged = function (data) {
        if (this._owner && data.newValue) {
            this._owner.ios.presenter.style.dayNameFont = Tools.createFont(this.dayNameFontName, data.newValue, this.dayNameTextSize);
        }
    };
    MonthCellStyle.prototype.onDayNameTextSizeChanged = function (data) {
        if (this._owner && !isNaN(+data.newValue)) {
            this._owner.ios.presenter.style.dayNameFont = Tools.createFont(this.dayNameFontName, this.dayNameFontStyle, data.newValue);
        }
    };
    MonthCellStyle.prototype.onMonthNameTextColorChanged = function (data) {
        if (data.newValue && this._owner) {
            this._owner.ios.presenter.style.monthNameTextColor = (new color_1.Color(data.newValue)).ios;
        }
    };
    MonthCellStyle.prototype.onMonthNameFontNameChanged = function (data) {
        if (this._owner && data.newValue) {
            this._owner.ios.presenter.style.monthNameFont = Tools.createFont(data.newValue, this.monthNameFontStyle, this.monthNameTextSize);
        }
    };
    MonthCellStyle.prototype.onMonthNameFontStyleChanged = function (data) {
        if (this._owner && data.newValue) {
            this._owner.ios.presenter.style.monthNameFont = Tools.createFont(this.monthNameFontName, data.newValue, this.monthNameTextSize);
        }
    };
    MonthCellStyle.prototype.onMonthNameTextSizeChanged = function (data) {
        if (this._owner && !isNaN(+data.newValue)) {
            this._owner.ios.presenter.style.monthNameFont = Tools.createFont(this.monthNameFontName, this.monthNameFontStyle, data.newValue);
        }
    };
    return MonthCellStyle;
})(commonModule.MonthCellStyle);
exports.MonthCellStyle = MonthCellStyle;
/**
 * Cell style class for inline events cells in month view
 * property values are used by TKCalendarMonthPresenterDelegateImplementation delegate that's why we don't need extra actions for update
 */
var InlineEventCellStyle = (function (_super) {
    __extends(InlineEventCellStyle, _super);
    function InlineEventCellStyle() {
        _super.apply(this, arguments);
    }
    InlineEventCellStyle.prototype.onCellBackgroundColorChanged = function (data) { };
    InlineEventCellStyle.prototype.onEventTextColorChanged = function (data) { };
    InlineEventCellStyle.prototype.onEventFontNameChanged = function (data) { };
    InlineEventCellStyle.prototype.onEventFontStyleChanged = function (data) { };
    InlineEventCellStyle.prototype.onEventTextSizeChanged = function (data) { };
    InlineEventCellStyle.prototype.onTimeTextColorChanged = function (data) { };
    InlineEventCellStyle.prototype.onTimeFontNameChanged = function (data) { };
    InlineEventCellStyle.prototype.onTimeFontStyleChanged = function (data) { };
    InlineEventCellStyle.prototype.onTimeTextSizeChanged = function (data) { };
    return InlineEventCellStyle;
})(commonModule.InlineEventCellStyle);
exports.InlineEventCellStyle = InlineEventCellStyle;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          STYLES FOR DIFFERENT VIEW MODES 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Class for month view style
 */
var CalendarMonthViewStyle = (function (_super) {
    __extends(CalendarMonthViewStyle, _super);
    function CalendarMonthViewStyle() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CalendarMonthViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.updateNativeOwner();
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.updateViewStyles = function (forceUpdate) {
        this.updateNativeOwner();
    };
    CalendarMonthViewStyle.prototype.updateNativeOwner = function () {
        if (this._owner && this._owner.ios && (this._owner.ios.presenter instanceof TKCalendarMonthPresenter)) {
            if (this.showWeekNumbers != undefined)
                this._owner.ios.presenter.weekNumbersHidden = !this.showWeekNumbers;
            if (this.showTitle != undefined)
                this._owner.ios.presenter.titleHidden = !this.showTitle;
            if (this.showDayNames != undefined)
                this._owner.ios.presenter.dayNamesHidden = !this.showDayNames;
            if (this.backgroundColor)
                this._owner.ios.presenter.style.backgroundColor = (new color_1.Color(this.backgroundColor)).ios;
            this._owner.updateCalendar();
        }
    };
    CalendarMonthViewStyle.prototype.updateOwner = function () {
        if (this._owner) {
            this._owner.updateCalendar();
        }
    };
    CalendarMonthViewStyle.prototype.onShowWeekNumbersChanged = function (data) {
        if (this._owner && this._owner.ios && (this._owner.ios.presenter instanceof TKCalendarMonthPresenter)) {
            this._owner.ios.presenter.weekNumbersHidden = !data.newValue;
        }
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onShowTitleChanged = function (data) {
        if (this._owner && this._owner.ios && (this._owner.ios.presenter instanceof TKCalendarMonthPresenter)) {
            this._owner.ios.presenter.titleHidden = !data.newValue;
        }
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onShowDayNamesChanged = function (data) {
        if (this._owner && this._owner.ios && (this._owner.ios.presenter instanceof TKCalendarMonthPresenter)) {
            this._owner.ios.presenter.dayNamesHidden = !data.newValue;
        }
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onBackgroundColorChanged = function (data) {
        if (data.newValue && this._owner && this._owner.ios && (this._owner.ios.presenter instanceof TKCalendarMonthPresenter)) {
            this._owner.ios.presenter.style.backgroundColor = (new color_1.Color(data.newValue)).ios;
        }
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onDayCellStyleChanged = function (data) {
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onSelectedDayCellStyleChanged = function (data) {
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onTodayCellStyleChanged = function (data) {
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onWeekNumberCellStyleChanged = function (data) {
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onWeekendCellStyleChanged = function (data) {
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onDayNameCellStyleChanged = function (data) {
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onTitleCellStyleChanged = function (data) {
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onInlineEventCellStyleChanged = function (data) {
        this.updateOwner();
    };
    return CalendarMonthViewStyle;
})(commonModule.CalendarMonthViewStyle);
exports.CalendarMonthViewStyle = CalendarMonthViewStyle;
/**
 * The style class for week mode.
 * NOTE: we should consider if we need an explicit class that is the same as the base one
 */
var CalendarWeekViewStyle = (function (_super) {
    __extends(CalendarWeekViewStyle, _super);
    function CalendarWeekViewStyle() {
        _super.apply(this, arguments);
    }
    CalendarWeekViewStyle.prototype.updateNativeOwner = function () {
        if (this._owner && (this._owner.ios.presenter instanceof TKCalendarWeekPresenter)) {
            _super.prototype.updateNativeOwner.call(this);
        }
    };
    return CalendarWeekViewStyle;
})(CalendarMonthViewStyle);
exports.CalendarWeekViewStyle = CalendarWeekViewStyle;
/**
 * The style class for month name view mode.
 * NOTE: we should consider if we need an explicit class that is the same as the base one
 */
var CalendarMonthNamesViewStyle = (function (_super) {
    __extends(CalendarMonthNamesViewStyle, _super);
    function CalendarMonthNamesViewStyle() {
        _super.call(this);
    }
    Object.defineProperty(CalendarMonthNamesViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthNamesViewStyle.prototype.updateViewStyles = function (forceUpdate) {
        this.updateOwner();
    };
    CalendarMonthNamesViewStyle.prototype.updateOwner = function () {
        if (this._owner && this._owner.viewMode == commonModule.CalendarViewMode.MonthNames) {
            this._owner.updateCalendar();
        }
    };
    CalendarMonthNamesViewStyle.prototype.onTitleCellStyleChanged = function (data) {
        this.updateOwner();
    };
    CalendarMonthNamesViewStyle.prototype.onMonthNameCellStyleChanged = function (data) {
        this.updateOwner();
    };
    return CalendarMonthNamesViewStyle;
})(commonModule.CalendarMonthNamesViewStyle);
exports.CalendarMonthNamesViewStyle = CalendarMonthNamesViewStyle;
/**
 * The year mode style class
 */
var CalendarYearViewStyle = (function (_super) {
    __extends(CalendarYearViewStyle, _super);
    function CalendarYearViewStyle() {
        _super.call(this);
    }
    Object.defineProperty(CalendarYearViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            if (this.monthCellStyle) {
                this.monthCellStyle.owner = this._owner;
            }
        },
        enumerable: true,
        configurable: true
    });
    CalendarYearViewStyle.prototype.updateViewStyles = function (forceUpdate) {
        this.monthCellStyle.updateNativePresenter();
        this.updateOwner();
    };
    CalendarYearViewStyle.prototype.updateOwner = function () {
        if (this._owner) {
            this._owner.updateCalendar();
        }
    };
    CalendarYearViewStyle.prototype.onTitleCellStyleChanged = function (data) {
        this.updateOwner();
    };
    CalendarYearViewStyle.prototype.onMonthCellStyleChanged = function (data) {
        if (data.newValue && this._owner) {
            this.monthCellStyle.owner = this._owner;
        }
        this.updateOwner();
    };
    return CalendarYearViewStyle;
})(commonModule.CalendarYearViewStyle);
exports.CalendarYearViewStyle = CalendarYearViewStyle;
////////////////////////////////////////////////////////////////////////////////////////////////////
var RadCalendar = (function (_super) {
    __extends(RadCalendar, _super);
    function RadCalendar() {
        _super.call(this);
        debugger;
        this._ios = TKCalendar.alloc().init();
        this._nativeDelegate = TKCalendarNativeDelegateImplementation.alloc().initWithOwner(this);
        this._nativePresenterDelegate = TKCalendarMonthPresenterDelegateImplementation.alloc().initWithOwner(this);
        this._ios.delegate = this._nativeDelegate;
        if (this.displayedDate == undefined) {
            this.loadNativeDisplayedDate();
        }
    }
    Object.defineProperty(RadCalendar.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this._ios.delegate = this._nativeDelegate;
        this._ios.dataSource = this._dataSource;
        this.ios.presenter.delegate = this._nativePresenterDelegate;
        this._calendarLoaded = true;
    };
    RadCalendar.prototype.onUnloaded = function () {
        this._ios.delegate = null;
        this._ios.dataSource = null;
        this._calendarLoaded = false;
        if (this._ios.presenter) {
            this.ios.presenter.delegate = null;
        }
    };
    RadCalendar.prototype.updateCalendar = function () {
        if (this._calendarLoaded && this.ios.presenter) {
            this.ios.presenter.update(false);
        }
    };
    RadCalendar.prototype.onDisplayedDateChanged = function (data) {
        if (data.newValue) {
            this.ios.navigateToDateAnimated(this.parseDate(data.newValue), false);
        }
    };
    RadCalendar.prototype.getDisplayedDate = function () {
        return this.ios.displayedDate;
    };
    RadCalendar.prototype.onSelectionModeChanged = function (data) {
        if (data.newValue) {
            var selectionMode = data.newValue.toLowerCase();
            switch (selectionMode) {
                case commonModule.CalendarSelectionMode.None.toLowerCase():
                    this.ios.selectionMode = 0 /* None */;
                    break;
                case commonModule.CalendarSelectionMode.Single.toLowerCase():
                    this.ios.selectionMode = 1 /* Single */;
                    break;
                case commonModule.CalendarSelectionMode.Multiple.toLowerCase():
                    this.ios.selectionMode = 2 /* Multiple */;
                    break;
                case commonModule.CalendarSelectionMode.Range.toLowerCase():
                    this.ios.selectionMode = 3 /* Range */;
                    break;
                default:
                    console.log("WARNING: Unsupported selection mode: " + data.newValue);
            }
        }
    };
    RadCalendar.prototype.onTransitionModeChanged = function (data) {
        if (data.newValue) {
            var transitionMode = data.newValue.toLowerCase();
            switch (transitionMode) {
                case commonModule.CalendarTransitionMode.None.toLowerCase():
                    this.ios.presenter.transitionMode = 0 /* None */;
                    break;
                case commonModule.CalendarTransitionMode.Slide.toLowerCase():
                    this.ios.presenter.transitionMode = 6 /* Scroll */;
                    break;
                case commonModule.CalendarTransitionMode.Stack.toLowerCase():
                    this.ios.presenter.transitionMode = 4 /* Card */;
                    break;
                case commonModule.CalendarTransitionMode.Flip.toLowerCase():
                    this.ios.presenter.transitionMode = 1 /* Flip */;
                    break;
                case commonModule.CalendarTransitionMode.Fold.toLowerCase():
                    this.ios.presenter.transitionMode = 2 /* Fold */;
                    break;
                case commonModule.CalendarTransitionMode.Float.toLowerCase():
                    this.ios.presenter.transitionMode = 3 /* Float */;
                    break;
                case commonModule.CalendarTransitionMode.Rotate.toLowerCase():
                    this.ios.presenter.transitionMode = 5 /* Rotate */;
                    break;
                default:
                    console.log("WARNING: Unsupported transitionMode mode: " + data.newValue);
            }
        }
    };
    RadCalendar.prototype.onViewModeChanged = function (data) {
        if (data.newValue) {
            var viewStyle;
            var modeString = data.newValue.toLowerCase();
            switch (modeString) {
                case commonModule.CalendarViewMode.Month.toLowerCase():
                    this.ios.viewMode = TKCalendarViewMode.TKCalendarViewModeMonth;
                    viewStyle = this.monthViewStyle;
                    break;
                case commonModule.CalendarViewMode.MonthNames.toLowerCase():
                    this.ios.viewMode = TKCalendarViewMode.TKCalendarViewModeMonthNames;
                    viewStyle = this.monthNamesViewStyle;
                    break;
                case commonModule.CalendarViewMode.Week.toLowerCase():
                    this.ios.viewMode = TKCalendarViewMode.TKCalendarViewModeWeek;
                    viewStyle = this.weekViewStyle;
                    break;
                case commonModule.CalendarViewMode.Year.toLowerCase():
                    this.ios.viewMode = TKCalendarViewMode.TKCalendarViewModeYear;
                    viewStyle = this.yearViewStyle;
                    break;
                // case commonModule.CalendarViewMode.Flow.toLocaleLowerCase():
                //     this.ios.viewMode = TKCalendarViewMode.TKCalendarViewModeFlow;
                //     break;
                // case commonModule.CalendarViewMode.YearNumbers.toLocaleLowerCase():
                // 	this.ios.viewMode = TKCalendarViewMode.TKCalendarViewModeYearNumbers;
                // 	break;
                default:
                    console.log("WARNING: Unsupported view mode: " + data.newValue);
            }
            if (viewStyle) {
                viewStyle.updateViewStyles();
            }
        }
    };
    RadCalendar.prototype.onEventsViewModeChanged = function (data) {
        if (this.ios.viewMode !== 1 /* Month */ || data.newValue === undefined) {
            return;
        }
        var eventsViewMode = data.newValue.toLowerCase();
        switch (eventsViewMode) {
            case commonModule.CalendarEventsViewMode.None.toLowerCase():
                this.ios.presenter.inlineEventsViewMode = 0 /* None */;
                break;
            case commonModule.CalendarEventsViewMode.Inline.toLowerCase():
                this.ios.presenter.inlineEventsViewMode = 1 /* Inline */;
                break;
            case commonModule.CalendarEventsViewMode.Popover.toLowerCase():
                this.ios.presenter.inlineEventsViewMode = 2 /* Popover */;
                console.log("WARNING: Popover mode for events is not supported for iPhone.");
                break;
            default:
                console.log("WARNING: Unsupported events view mode: " + data.newValue);
        }
    };
    RadCalendar.prototype.onSelectedDateRangeChanged = function (data) {
        if (this._forbidDateSelection) {
            return;
        }
        if (data.newValue instanceof commonModule.DateRange) {
            var tkDateRange = TKDateRange.alloc().initWithStartEnd(this.parseDate(data.newValue.startDate), this.parseDate(data.newValue.endDate));
            this.ios.selectedDatesRange = tkDateRange;
        }
    };
    RadCalendar.prototype.onSelectedDatesChanged = function (data) {
        if (this._forbidDateSelection) {
            return;
        }
        var newDates = data.newValue;
        if (typeof (newDates) === "string") {
            newDates = newDates.split(",");
        }
        var selectedDates = new Array();
        for (var i = 0; i < newDates.length; i++) {
            var date = this.parseDate(newDates[i]);
            selectedDates.push(date);
        }
        this.ios.selectedDates = selectedDates;
    };
    RadCalendar.prototype.onSelectedDateChanged = function (data) {
        if (this._forbidDateSelection) {
            return;
        }
        this.ios.selectedDate = this.parseDate(data.newValue);
    };
    RadCalendar.prototype.onMaxDateChanged = function (eventData) {
        this.ios.maxDate = this.parseDate(eventData.newValue);
    };
    RadCalendar.prototype.onMinDateChanged = function (data) {
        this.ios.minDate = this.parseDate(data.newValue);
    };
    RadCalendar.prototype.updateEventSource = function () {
        if (!this.ios) {
            return;
        }
        if (this.eventSource) {
            if (!this._dataSource) {
                this._dataSource = CalendarNativeDataSourceImplementation.alloc().initWithOwner(this);
                this._dataSource.itemsSource = this.eventSource;
                this._ios.dataSource = this._dataSource;
            }
            else {
                this._dataSource.itemsSource = this.eventSource;
                this._ios.presenter.update(false);
            }
        }
    };
    RadCalendar.prototype.onHorizontalTransitionChanged = function (data) {
        var horizontalTransition = data.newValue;
        this.ios.presenter.transitionIsVertical = !horizontalTransition;
    };
    RadCalendar.prototype.onMonthViewStyleChanged = function (data) {
        if (data.newValue && (data.newValue instanceof CalendarMonthViewStyle)) {
            this.monthViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.onMonthNamesViewStyleChanged = function (data) {
        if (data.newValue && (data.newValue instanceof CalendarMonthNamesViewStyle)) {
            this.monthNamesViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.onWeekViewStyleChanged = function (data) {
        if (data.newValue && (data.newValue instanceof CalendarWeekViewStyle)) {
            this.weekViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.onYearViewStyleChanged = function (data) {
        if (data.newValue && (data.newValue instanceof CalendarYearViewStyle)) {
            this.yearViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.loadNativeDisplayedDate = function () {
        var nativeDate = RadCalendar.dateWithoutHours(this._ios.displayedDate);
        if (this.displayedDate != nativeDate) {
            this.displayedDate = nativeDate;
        }
    };
    RadCalendar.dateWithoutHours = function (originalDate) {
        return new Date(originalDate.getFullYear(), originalDate.getMonth(), originalDate.getDate());
    };
    RadCalendar.prototype.reload = function () {
        if (this.ios) {
            this.ios.reloadData();
        }
    };
    RadCalendar.prototype.navigateForward = function () {
        this.ios.navigateForward(true);
    };
    RadCalendar.prototype.navigateBack = function () {
        this.ios.navigateBack(true);
    };
    RadCalendar.prototype.goToDate = function (date) {
        this.ios.navigateToDateAnimated(date, true);
    };
    RadCalendar.prototype.getEventsForDate = function (date) {
        var nativeResult = this.ios.eventsForDate(date);
        var result = new Array();
        var a = new interop.Reference();
        var r = new interop.Reference();
        var g = new interop.Reference();
        var b = new interop.Reference();
        var nativeEvent;
        var event;
        for (var i = 0; i < nativeResult.count; i++) {
            nativeEvent = nativeResult.objectAtIndex(i);
            if (nativeEvent.eventColor) {
                nativeEvent.eventColor.getRedGreenBlueAlpha(r, g, b, a);
            }
            var color = nativeEvent.eventColor ? new color_1.Color(Math.round(a.value * 255), Math.round(r.value * 255), Math.round(g.value * 255), Math.round(b.value * 255)) : null;
            event = new CalendarEvent(nativeEvent.title, nativeEvent.startDate, nativeEvent.endDate, nativeEvent.allDay, color);
            result.push(event);
        }
        return result;
    };
    return RadCalendar;
})(commonModule.RadCalendar);
exports.RadCalendar = RadCalendar;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var CalendarNativeDataSourceImplementation = (function (_super) {
    __extends(CalendarNativeDataSourceImplementation, _super);
    function CalendarNativeDataSourceImplementation() {
        _super.apply(this, arguments);
    }
    CalendarNativeDataSourceImplementation.prototype.initWithSourceAndOwner = function (source, owner) {
        this.itemsSource = source;
        this._owner = owner;
        return this;
    };
    CalendarNativeDataSourceImplementation.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    Object.defineProperty(CalendarNativeDataSourceImplementation.prototype, "itemsSource", {
        get: function () {
            return this._itemsSource;
        },
        set: function (value) {
            if (value instanceof observable_array_1.ObservableArray) {
                var list = new Array();
                for (var i = 0; i < value.length; i++) {
                    list.push(value.getItem(i));
                }
                this._itemsSource = list;
            }
            else {
                this._itemsSource = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    CalendarNativeDataSourceImplementation.prototype.calendarEventsForDate = function (calendar, date) {
        var nativeEvents = NSMutableArray.alloc().init();
        for (var event_1 in this.itemsSource) {
            var startDate = this.itemsSource[event_1].startDate;
            var endDate = this.itemsSource[event_1].endDate;
            if (startDate && endDate) {
                if ((startDate.getDate() == date.getDate() && startDate.getMonth() == date.getMonth() && startDate.getFullYear() == date.getFullYear()) ||
                    (startDate.getDate() == date.getDate() && startDate.getMonth() == date.getMonth() && startDate.getFullYear() == date.getFullYear())) {
                    nativeEvents.addObject(this.itemsSource[event_1].ios);
                }
            }
        }
        return nativeEvents;
    };
    CalendarNativeDataSourceImplementation.prototype.calendarEventsFromDateToDateWithCallback = function (calendar, fromDate, toDate, callback) {
        var nativeEvents = NSMutableArray.alloc().init();
        for (var event_2 in this.itemsSource) {
            var startDate = this.itemsSource[event_2].startDate;
            var endDate = this.itemsSource[event_2].endDate;
            // SD - startDate
            // ED - endDate
            // FD - fromDate
            // TD - toDate
            // -----SD----FD--------ED-----------------------------------------TD---------
            if ((startDate.getTime() <= fromDate.getTime() && endDate.getTime() >= fromDate.getTime()) ||
                // -----SD----FD---------------------------------------------------TD--ED-----
                (startDate.getTime() <= fromDate.getTime() && endDate.getTime() >= toDate.getTime()) ||
                // -----------FD--------------------------------------------SD-----TD--ED-----
                (startDate.getTime() <= toDate.getTime() && endDate.getTime() >= toDate.getTime()) ||
                // -----------FD---SD---------------------------------------ED-----TD---------
                (startDate.getTime() >= fromDate.getTime() && endDate.getTime() <= toDate.getTime())) {
                nativeEvents.addObject(this.itemsSource[event_2].ios);
            }
        }
        return nativeEvents;
    };
    CalendarNativeDataSourceImplementation.ObjCProtocols = [TKCalendarDataSource];
    return CalendarNativeDataSourceImplementation;
})(NSObject);
exports.CalendarNativeDataSourceImplementation = CalendarNativeDataSourceImplementation;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var TKCalendarMonthPresenterDelegateImplementation = (function (_super) {
    __extends(TKCalendarMonthPresenterDelegateImplementation, _super);
    function TKCalendarMonthPresenterDelegateImplementation() {
        _super.apply(this, arguments);
    }
    TKCalendarMonthPresenterDelegateImplementation.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    TKCalendarMonthPresenterDelegateImplementation.prototype.monthPresenterInlineEventSelected = function (presenter, event) {
        var inlineEventData = new CalendarEvent(event.title, event.startDate, event.endDate, event.allDay);
        var args = {
            eventName: commonModule.RadCalendar.inlineEventSelectedEvent,
            object: this._owner,
            eventData: inlineEventData
        };
        this._owner.notify(args);
    };
    //called for every inline event cell and we use to set the styling properties if any. 
    TKCalendarMonthPresenterDelegateImplementation.prototype.monthPresenterUpdateVisualsForInlineEventCell = function (presenter, cell) {
        if (this._owner.monthViewStyle) {
            var style = this._owner.monthViewStyle.inlineEventCellStyle;
            if (style) {
                if (style.cellBackgroundColor) {
                    cell.style.backgroundColor = (new color_1.Color(style.cellBackgroundColor)).ios;
                }
                if (style.eventTextColor) {
                    cell.style.eventColor = (new color_1.Color(style.eventTextColor)).ios;
                }
                if (style.timeTextColor) {
                    cell.style.timeColor = (new color_1.Color(style.timeTextColor)).ios;
                }
                if (style.eventFontName || style.eventFontStyle || style.eventTextSize) {
                    cell.style.eventFont = Tools.createFont(style.eventFontName, style.eventFontStyle, style.eventTextSize);
                }
                if (style.timeTextColor || style.timeFontName || style.timeFontStyle) {
                    cell.style.timeFont = Tools.createFont(style.timeFontName, style.timeFontStyle, style.timeTextSize);
                }
            }
        }
    };
    TKCalendarMonthPresenterDelegateImplementation.ObjCProtocols = [TKCalendarMonthPresenterDelegate];
    return TKCalendarMonthPresenterDelegateImplementation;
})(NSObject);
exports.TKCalendarMonthPresenterDelegateImplementation = TKCalendarMonthPresenterDelegateImplementation;
var TKCalendarNativeDelegateImplementation = (function (_super) {
    __extends(TKCalendarNativeDelegateImplementation, _super);
    function TKCalendarNativeDelegateImplementation() {
        _super.apply(this, arguments);
    }
    TKCalendarNativeDelegateImplementation.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    TKCalendarNativeDelegateImplementation.prototype.calendarDidChangedViewModeFromTo = function (calendar, previousViewMode, viewMode) {
        var args = {
            eventName: commonModule.RadCalendar.viewModeChangedEvent,
            object: this._owner,
            oldValue: this.getViewModeFromTKCalendarViewMode(previousViewMode),
            newValue: this.getViewModeFromTKCalendarViewMode(viewMode)
        };
        this._owner.notify(args);
        //this update will trigger update of UI styles for new view mode        
        if (this._owner.viewMode != args.newValue) {
            this._owner.viewMode = args.newValue;
        }
    };
    TKCalendarNativeDelegateImplementation.prototype.calendarDidDeselectedDate = function (calendar, date) {
        if (this._owner.selectionMode === commonModule.CalendarSelectionMode.Multiple) {
            this._owner._forbidDateSelection = true;
            this._owner._removeSelectedDate(date);
            this._owner._forbidDateSelection = false;
        }
        var args = {
            eventName: commonModule.RadCalendar.dateDeselectedEvent,
            object: this._owner,
            date: date
        };
        this._owner.notify(args);
    };
    // Android currently doesn't supoort this event. will implement on a later stage.
    TKCalendarNativeDelegateImplementation.prototype.calendarShouldSelectDate = function (calendar, date) {
        return true;
    };
    // NOTE: In range selection this method is called once for the end date.
    TKCalendarNativeDelegateImplementation.prototype.calendarDidSelectDate = function (calendar, date) {
        this._owner._forbidDateSelection = true;
        if (!this._owner.selectedDate || date.getTime() !== this._owner.parseDate(this._owner.selectedDate).getTime()) {
            this._owner.selectedDate = date;
        }
        if (this._owner.selectionMode === commonModule.CalendarSelectionMode.Range) {
            this.handleRangeSelection(date);
        }
        else if (this._owner.selectionMode === commonModule.CalendarSelectionMode.Multiple) {
            this._owner._addSelectedDate(date);
        }
        this._owner._forbidDateSelection = false;
        var args = {
            eventName: commonModule.RadCalendar.dateSelectedEvent,
            object: this._owner,
            date: date
        };
        this._owner.notify(args);
    };
    TKCalendarNativeDelegateImplementation.prototype.calendarDidNavigateToDate = function (calendar, date) {
        var nativeDate = RadCalendar.dateWithoutHours(date);
        var args = {
            eventName: commonModule.RadCalendar.navigatedToDateEvent,
            object: this._owner,
            date: nativeDate
        };
        if (this._owner.displayedDate != args.date) {
            this._owner.displayedDate = args.date;
        }
        this._owner.notify(args);
    };
    TKCalendarNativeDelegateImplementation.prototype.calendarWillNavigateToDate = function (calendar, date) {
        var nativeDate = RadCalendar.dateWithoutHours(date);
        var args = {
            eventName: commonModule.RadCalendar.navigatingToDateStartedEvent,
            object: this._owner,
            date: nativeDate
        };
        this._owner.notify(args);
    };
    TKCalendarNativeDelegateImplementation.prototype.calendarUpdateVisualsForCell = function (calendar, cell) {
        switch (this._owner.viewMode.toLowerCase()) {
            case commonModule.CalendarViewMode.Month.toLowerCase():
                this.applyMonthViewCellStyles(cell);
                break;
            case commonModule.CalendarViewMode.Year.toLowerCase():
                this.applyYearViewCellStyles(cell);
                break;
            case commonModule.CalendarViewMode.Week.toLowerCase():
                this.applyWeekViewCellStyles(cell);
                break;
            case commonModule.CalendarViewMode.MonthNames.toLowerCase():
                this.applyMonthNamesViewCellStyles(cell);
                break;
        }
    };
    TKCalendarNativeDelegateImplementation.prototype.applyWeekViewCellStyles = function (cell) {
        if ((this._owner.viewMode != commonModule.CalendarViewMode.Week) ||
            (!this._owner.weekViewStyle)) {
            return;
        }
        if (cell instanceof TKCalendarDayCell) {
            this.applyDayCellStyleToCell(this._owner.weekViewStyle, cell);
        }
        else if (cell instanceof TKCalendarWeekNumberCell) {
            this.applyWeekNumberCellStyleToCell(this._owner.weekViewStyle, cell);
        }
        else if (cell instanceof TKCalendarDayNameCell) {
            this.applyDayNameCellStyleToCell(this._owner.weekViewStyle, cell);
        }
        else if (cell instanceof TKCalendarTitleCell) {
            this.applyTitleCellStyleToCell(this._owner.weekViewStyle, cell);
        }
    };
    TKCalendarNativeDelegateImplementation.prototype.applyYearViewCellStyles = function (cell) {
        if ((this._owner.viewMode != commonModule.CalendarViewMode.Year) ||
            (!this._owner.yearViewStyle)) {
            return;
        }
        //NOTE: only title cell is styled on delegate call, months use presenter members
        if (cell instanceof TKCalendarTitleCell) {
            this.applyTitleCellStyleToCell(this._owner.yearViewStyle, cell);
        }
    };
    TKCalendarNativeDelegateImplementation.prototype.applyMonthNamesViewCellStyles = function (cell) {
        if ((this._owner.viewMode != commonModule.CalendarViewMode.MonthNames) ||
            (!this._owner.monthNamesViewStyle)) {
            return;
        }
        if (cell instanceof TKCalendarTitleCell) {
            this.applyTitleCellStyleToCell(this._owner.monthNamesViewStyle, cell);
        }
        if (cell instanceof TKCalendarMonthNameCell) {
            this.applyMonthNameCellStyleToCell(this._owner.monthNamesViewStyle, cell);
        }
    };
    TKCalendarNativeDelegateImplementation.prototype.applyMonthViewCellStyles = function (cell) {
        if ((this._owner.viewMode != commonModule.CalendarViewMode.Month) ||
            (!this._owner.monthViewStyle)) {
            return;
        }
        if (cell instanceof TKCalendarDayCell) {
            this.applyDayCellStyleToCell(this._owner.monthViewStyle, cell);
        }
        else if (cell instanceof TKCalendarWeekNumberCell) {
            this.applyWeekNumberCellStyleToCell(this._owner.monthViewStyle, cell);
        }
        else if (cell instanceof TKCalendarDayNameCell) {
            this.applyDayNameCellStyleToCell(this._owner.monthViewStyle, cell);
        }
        else if (cell instanceof TKCalendarTitleCell) {
            this.applyTitleCellStyleToCell(this._owner.monthViewStyle, cell);
        }
    };
    // Private methods
    TKCalendarNativeDelegateImplementation.prototype.handleRangeSelection = function (date) {
        // selected through xml or code. Notify about start date.
        if (this._owner.selectedDateRange && this._owner.parseDate(this._owner.selectedDateRange.endDate).getTime() === date.getTime()) {
            var args = {
                eventName: commonModule.RadCalendar.dateSelectedEvent,
                object: this._owner,
                date: this._owner.parseDate(this._owner.selectedDateRange.startDate),
            };
            this._owner.notify(args);
            return;
        }
        if (this._rangeSelectionStarted) {
            this._rangeSelectionStarted = false;
            this._owner.selectedDateRange = new commonModule.DateRange(this._owner.selectedDateRange.startDate, date);
        }
        else {
            this._rangeSelectionStarted = true;
            this._owner.selectedDateRange = new commonModule.DateRange(date, date);
        }
    };
    /**
     * Generic method that applies regular day style to cell of given view mode
     */
    TKCalendarNativeDelegateImplementation.prototype.applyDayCellStyleToCell = function (viewModeStyle, cell) {
        if (!viewModeStyle) {
            return;
        }
        //styles applied by priority: selected, weekend, today, regular day
        var dayCellStyle = null;
        if (viewModeStyle.selectedDayCellStyle &&
            (cell.state & TKCalendarDayStateSelected || cell.state & TKCalendarDayStateMidInSelection ||
                cell.state & TKCalendarDayStateFirstInSelection || cell.state & TKCalendarDayStateLastInSelection)) {
            dayCellStyle = viewModeStyle.selectedDayCellStyle;
        }
        else if (cell.state & TKCalendarDayStateWeekend && viewModeStyle.weekendCellStyle) {
            dayCellStyle = viewModeStyle.weekendCellStyle;
        }
        else if (cell.state & TKCalendarDayStateToday && viewModeStyle.todayCellStyle) {
            dayCellStyle = viewModeStyle.todayCellStyle;
        }
        else {
            dayCellStyle = viewModeStyle.dayCellStyle;
        }
        if (!dayCellStyle) {
            return;
        }
        this.applyCommonCellStyleProperties(cell, dayCellStyle);
        //apply day specific properties
        if (dayCellStyle instanceof DayCellStyle) {
            cell.style().displayEventsAsText = dayCellStyle.ios.displayEventsAsText;
            cell.style().eventInsets = dayCellStyle.ios.eventInsets;
            cell.style().eventTextColor = dayCellStyle.ios.eventTextColor;
            cell.style().eventFont = dayCellStyle.ios.eventFont;
            //Note: the shape drown for selected date is not available for Android and we remove it from iOS too
            if (cell.style().shape) {
                cell.style().shape = null;
            }
        }
    };
    TKCalendarNativeDelegateImplementation.prototype.applyTitleCellStyleToCell = function (viewModeStyle, cell) {
        if (!viewModeStyle || !viewModeStyle.titleCellStyle) {
            return;
        }
        this.applyCommonCellStyleProperties(cell, viewModeStyle.titleCellStyle);
    };
    TKCalendarNativeDelegateImplementation.prototype.applyDayNameCellStyleToCell = function (viewModeStyle, cell) {
        if (!viewModeStyle || !viewModeStyle.dayNameCellStyle) {
            return;
        }
        this.applyCommonCellStyleProperties(cell, viewModeStyle.dayNameCellStyle);
    };
    TKCalendarNativeDelegateImplementation.prototype.applyMonthNameCellStyleToCell = function (viewModeStyle, cell) {
        if (!viewModeStyle || !viewModeStyle.monthNameCellStyle) {
            return;
        }
        this.applyCommonCellStyleProperties(cell, viewModeStyle.monthNameCellStyle);
    };
    TKCalendarNativeDelegateImplementation.prototype.applyWeekNumberCellStyleToCell = function (viewModeStyle, cell) {
        if (!viewModeStyle || !viewModeStyle.weekNumberCellStyle) {
            return;
        }
        this.applyCommonCellStyleProperties(cell, viewModeStyle.weekNumberCellStyle);
    };
    TKCalendarNativeDelegateImplementation.prototype.applyCommonCellStyleProperties = function (cell, cellStyle) {
        if (cell && cellStyle) {
            cell.style().backgroundColor = cellStyle.ios.backgroundColor;
            cell.style().topBorderColor = cellStyle.ios.topBorderColor;
            cell.style().topBorderWidth = cellStyle.ios.topBorderWidth;
            cell.style().bottomBorderWidth = cellStyle.ios.bottomBorderWidth;
            cell.style().bottomBorderColor = cellStyle.ios.bottomBorderColor;
            cell.style().leftBorderColor = cellStyle.ios.leftBorderColor;
            cell.style().leftBorderWidth = cellStyle.ios.leftBorderWidth;
            cell.style().rightBorderWidth = cellStyle.ios.rightBorderWidth;
            cell.style().rightBorderColor = cellStyle.ios.rightBorderColor;
            cell.style().textColor = cellStyle.ios.textColor;
            cell.style().textFont = cellStyle.ios.textFont;
            cell.style().textInsets = cellStyle.ios.textInsets;
            cell.style().textAlignment = cellStyle.ios.textAlignment;
        }
    };
    TKCalendarNativeDelegateImplementation.prototype.getViewModeFromTKCalendarViewMode = function (viewMode) {
        switch (viewMode) {
            // case TKCalendarViewMode.TKCalendarViewModeFlow: return  commonModule.CalendarViewMode.Flow;
            // case TKCalendarViewMode.TKCalendarViewModeYearNumbers: return = commonModule.CalendarViewMode.YearNumbers;
            case TKCalendarViewMode.TKCalendarViewModeMonth:
                return commonModule.CalendarViewMode.Month;
            case TKCalendarViewMode.TKCalendarViewModeMonthNames:
                return commonModule.CalendarViewMode.MonthNames;
            case TKCalendarViewMode.TKCalendarViewModeWeek:
                return commonModule.CalendarViewMode.Week;
            case TKCalendarViewMode.TKCalendarViewModeYear:
                return commonModule.CalendarViewMode.Year;
        }
    };
    TKCalendarNativeDelegateImplementation.ObjCProtocols = [TKCalendarDelegate];
    return TKCalendarNativeDelegateImplementation;
})(NSObject);
exports.TKCalendarNativeDelegateImplementation = TKCalendarNativeDelegateImplementation;
