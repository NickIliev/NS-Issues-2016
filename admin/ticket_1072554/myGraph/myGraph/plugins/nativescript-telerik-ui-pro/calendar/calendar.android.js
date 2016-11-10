var commonModule = require("./calendar-common");
var utilsModule = require("utils/utils");
var color_1 = require("color");
var observable_array_1 = require("data/observable-array");
require("utils/module-merge").merge(commonModule, exports);
var CalendarEvent = (function (_super) {
    __extends(CalendarEvent, _super);
    function CalendarEvent() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CalendarEvent.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.calendar.events.Event("default", new Date(1990, 0, 1).getTime(), new Date(1990, 0, 2).getTime());
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    CalendarEvent.prototype._setIsAllDay = function (value) {
        this.android.setAllDay(value);
    };
    CalendarEvent.prototype._getIsAllDay = function () {
        return this.android.isAllDay();
    };
    CalendarEvent.prototype._setEndDate = function (date) {
        this.android.setEndDate(date.getTime());
    };
    CalendarEvent.prototype._getEndDate = function () {
        return new Date(this.android.getEndDate());
    };
    CalendarEvent.prototype._setStartDate = function (date) {
        this.android.setStartDate(date.getTime());
    };
    CalendarEvent.prototype._getStartDate = function () {
        return new Date(this.android.getStartDate());
    };
    CalendarEvent.prototype._setTitle = function (value) {
        this.android.setTitle(value);
    };
    CalendarEvent.prototype._getTitle = function () {
        return this.android.getTitle();
    };
    CalendarEvent.prototype._setEventColor = function (value) {
        this.android.setEventColor(value.argb);
    };
    CalendarEvent.prototype._getEventColor = function () {
        return new color_1.Color(this.android.getEventColor());
    };
    return CalendarEvent;
})(commonModule.CalendarEvent);
exports.CalendarEvent = CalendarEvent;
/**
 * Helper methods
 */
var Tool = (function () {
    function Tool() {
    }
    Tool.createTypeface = function (name, style) {
        var fontStyle = android.graphics.Typeface.NORMAL;
        if (style) {
            switch (style.toLowerCase()) {
                case commonModule.FontStyles.Bold.toLowerCase():
                    fontStyle = android.graphics.Typeface.BOLD;
                    break;
                case commonModule.FontStyles.Italic.toLowerCase():
                    fontStyle = android.graphics.Typeface.ITALIC;
                    break;
                case commonModule.FontStyles.BoldItalic.toLowerCase():
                    fontStyle = android.graphics.Typeface.BOLD_ITALIC;
                    break;
                default:
                    console.log("WARNING: Unsupported typeface style: " + style);
            }
        }
        return android.graphics.Typeface.create(name ? name : android.graphics.Typeface.DEFAULT, fontStyle);
    };
    return Tool;
})();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          STYLES FOR DIFFERENT CELL TYPES
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Enum values identify to what type of cells is related the style object
 */
var CellStyleType;
(function (CellStyleType) {
    CellStyleType[CellStyleType["RegularDayStyle"] = 0] = "RegularDayStyle";
    CellStyleType[CellStyleType["SelectedDayStyle"] = 1] = "SelectedDayStyle";
    CellStyleType[CellStyleType["TodayStyle"] = 2] = "TodayStyle";
    CellStyleType[CellStyleType["WeekNumberStyle"] = 3] = "WeekNumberStyle";
    CellStyleType[CellStyleType["WeekendStyle"] = 4] = "WeekendStyle";
    CellStyleType[CellStyleType["DayNameStyle"] = 5] = "DayNameStyle";
    CellStyleType[CellStyleType["TitleStyle"] = 6] = "TitleStyle";
    CellStyleType[CellStyleType["MonthNameStyle"] = 7] = "MonthNameStyle"; //cell for month name in compact Year view mode
})(CellStyleType || (CellStyleType = {}));
var CellStyleInitializer = (function () {
    function CellStyleInitializer() {
    }
    CellStyleInitializer.prototype.applyStyle = function (value) {
        this.changeCellBorderWidth(value.cellBorderWidth, value);
        this.changeCellBorderColor(value.cellBorderColor, value);
        this.changeCellBackgroundColor(value.cellBackgroundColor, value);
        this.changeCellAlignment(value.cellAlignment, value);
        this.changeCellPaddingHorizontal(value.cellPaddingHorizontal, value);
        this.changeCellPaddingVertical(value.cellPaddingVertical, value);
        this.changeCellTextColor(value.cellTextColor, value);
        this.changeCellTextFontName(value.cellTextFontName, value);
        this.changeCellTextFontStyle(value.cellTextFontStyle, value);
        this.changeCellTextSize(value.cellTextSize, value);
        value.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellBorderWidth = function (value, style) {
        if (isNaN(value)) {
            return;
        }
        var borderWidth = new java.lang.Float(value * utilsModule.layout.getDisplayDensity());
        style.android.setBorderWidth(borderWidth);
    };
    CellStyleInitializer.prototype.onCellBorderWidthChanged = function (value, style) {
        this.changeCellBorderWidth(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellBorderColor = function (value, style) {
        if (!value) {
            return;
        }
        var color = (new color_1.Color(value)).argb;
        var borderColor = new java.lang.Integer(color);
        style.android.setBorderColor(borderColor);
    };
    CellStyleInitializer.prototype.onCellBorderColorChanged = function (value, style) {
        this.changeCellBorderColor(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellBackgroundColor = function (value, style) {
        if (!value) {
            return;
        }
        var color = (new color_1.Color(value)).argb;
        var backgroundColor = new java.lang.Integer(color);
        style.android.setBackgroundColor(backgroundColor);
    };
    CellStyleInitializer.prototype.onCellBackgroundColorChanged = function (value, style) {
        this.changeCellBackgroundColor(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellAlignment = function (value, style) {
        if (!value) {
            return;
        }
        var position;
        switch (value.toLowerCase()) {
            case commonModule.CalendarCellAlignment.Bottom.toLowerCase():
                position = com.telerik.widget.calendar.CalendarElement.BOTTOM;
                break;
            case commonModule.CalendarCellAlignment.Top.toLowerCase():
                position = com.telerik.widget.calendar.CalendarElement.TOP;
                break;
            case commonModule.CalendarCellAlignment.Left.toLowerCase():
                position = com.telerik.widget.calendar.CalendarElement.LEFT;
                break;
            case commonModule.CalendarCellAlignment.Right.toLowerCase():
                position = com.telerik.widget.calendar.CalendarElement.RIGHT;
                break;
            case commonModule.CalendarCellAlignment.HorizontalCenter.toLowerCase():
                position = com.telerik.widget.calendar.CalendarElement.CENTER_HORIZONTAL;
                break;
            case commonModule.CalendarCellAlignment.VerticalCenter.toLowerCase():
                position = com.telerik.widget.calendar.CalendarElement.CENTER_VERTICAL;
                break;
            default:
                position = com.telerik.widget.calendar.CalendarElement.CENTER;
        }
        var positionValue = new java.lang.Integer(position);
        style.android.setTextPosition(positionValue);
    };
    CellStyleInitializer.prototype.onCellAlignmentChanged = function (value, style) {
        this.changeCellAlignment(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellPaddingHorizontal = function (value, style) {
        if (isNaN(value)) {
            return;
        }
        var paddingVal = value * utilsModule.layout.getDisplayDensity();
        var padding = new java.lang.Integer(paddingVal);
        style.android.setPaddingHorizontal(padding);
    };
    CellStyleInitializer.prototype.onCellPaddingHorizontalChanged = function (value, style) {
        this.changeCellPaddingHorizontal(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellPaddingVertical = function (value, style) {
        if (isNaN(value)) {
            return;
        }
        var paddingVal = value * utilsModule.layout.getDisplayDensity();
        var padding = new java.lang.Integer(paddingVal);
        style.android.setPaddingVertical(padding);
    };
    CellStyleInitializer.prototype.onCellPaddingVerticalChanged = function (value, style) {
        this.changeCellPaddingVertical(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellTextColor = function (value, style) {
        if (!value) {
            return;
        }
        var color = (new color_1.Color(value)).argb;
        var textColor = new java.lang.Integer(color);
        style.android.setTextColor(textColor);
    };
    CellStyleInitializer.prototype.onCellTextColorChanged = function (value, style) {
        this.changeCellTextColor(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellTextFontName = function (value, style) {
        if (!value) {
            return;
        }
        var font = Tool.createTypeface(value, style.cellTextFontStyle);
        style.android.setFontName(value);
    };
    CellStyleInitializer.prototype.onCellTextFontNameChanged = function (value, style) {
        this.changeCellTextFontName(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellTextFontStyle = function (value, style) {
        if (!value) {
            return;
        }
        var font = Tool.createTypeface(style.cellTextFontName, value);
        var fontStyle = new java.lang.Integer(font.getStyle());
        style.android.setFontStyle(fontStyle);
    };
    CellStyleInitializer.prototype.onCellTextFontStyleChanged = function (value, style) {
        this.changeCellTextFontStyle(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellTextSize = function (value, style) {
        if (isNaN(value)) {
            return;
        }
        var size = value * utilsModule.layout.getDisplayDensity();
        var textSize = new java.lang.Float(size);
        style.android.setTextSize(textSize);
    };
    CellStyleInitializer.prototype.onCellTextSizeChanged = function (value, style) {
        this.changeCellTextSize(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.makeDayCellFilter = function (cellStyleType, displayMode) {
        var cellFilter = new com.telerik.widget.calendar.CalendarDayCellFilter();
        var possitiveFilter = new java.lang.Boolean(true);
        switch (cellStyleType) {
            case CellStyleType.TodayStyle:
                cellFilter.setIsToday(possitiveFilter);
            case CellStyleType.RegularDayStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Date);
                break;
            case CellStyleType.WeekendStyle:
                cellFilter.setIsWeekend(possitiveFilter);
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Date);
                break;
            case CellStyleType.DayNameStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.DayName);
                break;
            case CellStyleType.WeekNumberStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.WeekNumber);
                break;
            case CellStyleType.TitleStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Title);
                break;
            case CellStyleType.SelectedDayStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Date);
                cellFilter.setIsSelected(possitiveFilter);
                break;
        }
        if (displayMode) {
            cellFilter.setCalendarDisplayMode(displayMode);
        }
        return cellFilter;
    };
    CellStyleInitializer.prototype.makeMonthCellFilter = function () {
        var cellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
        var possitiveFilter = new java.lang.Boolean(true);
        cellFilter.setMonthIsCompact(possitiveFilter);
        return cellFilter;
    };
    return CellStyleInitializer;
})();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var CellStyle = (function (_super) {
    __extends(CellStyle, _super);
    function CellStyle() {
        _super.apply(this, arguments);
        this._nativeIsYear = false;
    }
    Object.defineProperty(CellStyle.prototype, "nativeIsYear", {
        set: function (value) {
            if (this._nativeIsYear != value) {
                this._nativeIsYear = value;
                this._android = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(CellStyle.prototype, "android", {
        get: function () {
            if (!this._android) {
                if (this._nativeIsYear) {
                    this._android = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                    this.initializer.applyStyle(this);
                }
                else {
                    this._android = new com.telerik.widget.calendar.CalendarDayCellStyle();
                }
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.updateNativeStyleFilters = function (cellStyleType, displayMode) {
        if (!this._owner) {
            return;
        }
        if (this._nativeIsYear) {
            var filter = this.initializer.makeMonthCellFilter();
            this.android.setFilter(filter);
        }
        else {
            var filter = this.initializer.makeDayCellFilter(cellStyleType, displayMode);
            this.android.setFilter(filter);
        }
    };
    CellStyle.prototype.onStyleChanged = function () {
        if (this._owner) {
            this._owner.updateCalendar();
        }
    };
    CellStyle.prototype.onCellBorderWidthChanged = function (data) {
        this.initializer.onCellBorderWidthChanged(data.newValue, this);
    };
    CellStyle.prototype.onCellBorderColorChanged = function (data) {
        this.initializer.onCellBorderColorChanged(data.newValue, this);
    };
    CellStyle.prototype.onCellBackgroundColorChanged = function (data) {
        this.initializer.onCellBackgroundColorChanged(data.newValue, this);
    };
    CellStyle.prototype.onCellTextColorChanged = function (data) {
        this.initializer.onCellTextColorChanged(data.newValue, this);
    };
    CellStyle.prototype.onCellTextFontNameChanged = function (data) {
        this.initializer.onCellTextFontNameChanged(data.newValue, this);
    };
    CellStyle.prototype.onCellTextFontStyleChanged = function (data) {
        this.initializer.onCellTextFontStyleChanged(data.newValue, this);
    };
    CellStyle.prototype.onCellTextSizeChanged = function (data) {
        this.initializer.onCellTextSizeChanged(data.newValue, this);
    };
    CellStyle.prototype.onCellPaddingHorizontalChanged = function (data) {
        this.initializer.onCellPaddingHorizontalChanged(data.newValue, this);
    };
    CellStyle.prototype.onCellPaddingVerticalChanged = function (data) {
        this.initializer.onCellPaddingVerticalChanged(data.newValue, this);
    };
    CellStyle.prototype.onCellAlignmentChanged = function (data) {
        this.initializer.onCellAlignmentChanged(data.newValue, this);
    };
    return CellStyle;
})(commonModule.CellStyle);
exports.CellStyle = CellStyle;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var DayCellStyle = (function (_super) {
    __extends(DayCellStyle, _super);
    function DayCellStyle() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(DayCellStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayCellStyle.prototype, "eventAdapter", {
        set: function (value) {
            this._eventAdapter = value;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(DayCellStyle.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.calendar.CalendarDayCellStyle();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    DayCellStyle.prototype.updateNativeStyleFilters = function (cellStyleType, displayMode) {
        if (!this._owner) {
            return;
        }
        var filter = this.initializer.makeDayCellFilter(cellStyleType, displayMode);
        this.android.setFilter(filter);
    };
    DayCellStyle.prototype.onCellBorderWidthChanged = function (data) {
        this.initializer.onCellBorderWidthChanged(data.newValue, this);
    };
    DayCellStyle.prototype.onCellBorderColorChanged = function (data) {
        this.initializer.onCellBorderColorChanged(data.newValue, this);
    };
    DayCellStyle.prototype.onCellBackgroundColorChanged = function (data) {
        this.initializer.onCellBackgroundColorChanged(data.newValue, this);
    };
    DayCellStyle.prototype.onCellTextColorChanged = function (data) {
        this.initializer.onCellTextColorChanged(data.newValue, this);
    };
    DayCellStyle.prototype.onCellTextFontNameChanged = function (data) {
        this.initializer.onCellTextFontNameChanged(data.newValue, this);
    };
    DayCellStyle.prototype.onCellTextFontStyleChanged = function (data) {
        this.initializer.onCellTextFontStyleChanged(data.newValue, this);
    };
    DayCellStyle.prototype.onCellTextSizeChanged = function (data) {
        this.initializer.onCellTextSizeChanged(data.newValue, this);
    };
    DayCellStyle.prototype.onCellPaddingHorizontalChanged = function (data) {
        this.initializer.onCellPaddingHorizontalChanged(data.newValue, this);
    };
    DayCellStyle.prototype.onCellPaddingVerticalChanged = function (data) {
        this.initializer.onCellPaddingVerticalChanged(data.newValue, this);
    };
    DayCellStyle.prototype.onCellAlignmentChanged = function (data) {
        this.initializer.onCellAlignmentChanged(data.newValue, this);
    };
    DayCellStyle.prototype.onStyleChanged = function () {
        if (this._owner) {
            this._owner.updateCalendar();
        }
    };
    //day cell specific properties
    DayCellStyle.prototype.onShowEventsTextChanged = function (data) {
        if (data.newValue == undefined || data.newValue == null || !this.eventAdapter) {
            return;
        }
        this.eventAdapter.getRenderer().setEventRenderMode(data.newValue ? com.telerik.widget.calendar.events.EventRenderMode.Shape_And_Text : com.telerik.widget.calendar.events.EventRenderMode.Shape);
    };
    DayCellStyle.prototype.onEventTextColorChanged = function (data) {
        if (!data.newValue || !this.eventAdapter) {
            return;
        }
        //TODO: Event text color property not supported in Android.
    };
    DayCellStyle.prototype.onEventFontNameChanged = function (data) {
        if (!data.newValue || !this.eventAdapter) {
            return;
        }
        //TODO: Event font name property not supported in Android.
    };
    DayCellStyle.prototype.onEventFontStyleChanged = function (data) {
        if (!data.newValue || !this.eventAdapter) {
            return;
        }
        //TODO: Event font style property not supported in Android.
    };
    DayCellStyle.prototype.onEventTextSizeChanged = function (data) {
        if (isNaN(data.newValue) || !this.eventAdapter) {
            return;
        }
        this.eventAdapter.getRenderer().setEventTextSize(data.newValue * utilsModule.layout.getDisplayDensity());
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "regularDayStyle", {
        get: function () {
            if (!this._regularDayStyle) {
                this._regularDayStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                var dateMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
                var possitiveFilter = new java.lang.Boolean(true);
                dateMonthCellFilter.setTextIsDate(possitiveFilter);
                this._regularDayStyle.setFilter(dateMonthCellFilter);
            }
            return this._regularDayStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "weekendStyle", {
        get: function () {
            if (!this._weekendStyle) {
                this._weekendStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                var weekendMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
                var possitiveFilter = new java.lang.Boolean(true);
                weekendMonthCellFilter.setTextIsWeekend(possitiveFilter);
                this._weekendStyle.setFilter(weekendMonthCellFilter);
            }
            return this._weekendStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "todayStyle", {
        get: function () {
            if (!this._todayStyle) {
                this._todayStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                var todayMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
                var possitiveFilter = new java.lang.Boolean(true);
                todayMonthCellFilter.setTextIsToday(possitiveFilter);
                this._todayStyle.setFilter(todayMonthCellFilter);
            }
            return this._todayStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "dayNameStyle", {
        get: function () {
            if (!this._dayNameStyle) {
                this._dayNameStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                var dayNameMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
                var possitiveFilter = new java.lang.Boolean(true);
                dayNameMonthCellFilter.setTextIsDayName(possitiveFilter);
                this._dayNameStyle.setFilter(dayNameMonthCellFilter);
            }
            return this._dayNameStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "monthNameStyle", {
        get: function () {
            if (!this._monthNameStyle) {
                this._monthNameStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                var monthNameMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
                var possitiveFilter = new java.lang.Boolean(true);
                monthNameMonthCellFilter.setTextIsMonthName(possitiveFilter);
                this._monthNameStyle.setFilter(monthNameMonthCellFilter);
            }
            return this._monthNameStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "monthCellStyle", {
        get: function () {
            if (!this._monthCellStyle) {
                this._monthCellStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
            }
            return this._monthCellStyle;
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onStyleChanged = function () {
        if (this._owner && this._owner.getDisplayMode === com.telerik.widget.calendar.CalendarDisplayMode.Year) {
            this._owner.updateCalendar();
        }
    };
    MonthCellStyle.prototype.onWeekendTextColorChanged = function (data) {
        if (data.newValue) {
            var color = (new color_1.Color(data.newValue)).argb;
            var textColor = new java.lang.Integer(color);
            this.weekendStyle.setTextColor(textColor);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onTodayTextColorChanged = function (data) {
        if (data.newValue) {
            var color = (new color_1.Color(data.newValue)).argb;
            var textColor = new java.lang.Integer(color);
            this.todayStyle.setTextColor(textColor);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayTextColorChanged = function (data) {
        if (data.newValue) {
            var color = (new color_1.Color(data.newValue)).argb;
            var textColor = new java.lang.Integer(color);
            this.regularDayStyle.setTextColor(textColor);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayFontNameChanged = function (data) {
        if (data.newValue) {
            this.regularDayStyle.setFontName(data.newValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayFontStyleChanged = function (data) {
        if (data.newValue) {
            var font = Tool.createTypeface(this.dayFontName, data.newValue);
            var fontStyle = new java.lang.Integer(font.getStyle());
            this.regularDayStyle.setFontStyle(fontStyle);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayTextSizeChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            var size = data.newValue * utilsModule.layout.getDisplayDensity();
            var sizeValue = new java.lang.Float(size);
            this.regularDayStyle.setTextSize(sizeValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayNameTextColorChanged = function (data) {
        if (data.newValue) {
            var color = (new color_1.Color(data.newValue)).argb;
            var colorValue = new java.lang.Integer(color);
            this.dayNameStyle.setTextColor(colorValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayNameFontNameChanged = function (data) {
        if (data.newValue) {
            this.dayNameStyle.setFontName(data.newValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayNameFontStyleChanged = function (data) {
        if (data.newValue) {
            var font = Tool.createTypeface(this.dayNameFontName, data.newValue);
            var fontStyle = new java.lang.Integer(font.getStyle());
            this.dayNameStyle.setFontStyle(fontStyle);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayNameTextSizeChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            var size = data.newValue * utilsModule.layout.getDisplayDensity();
            var sizeValue = new java.lang.Float(size);
            this.dayNameStyle.setTextSize(sizeValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onMonthNameTextColorChanged = function (data) {
        if (data.newValue) {
            var color = (new color_1.Color(data.newValue)).argb;
            var colorValue = new java.lang.Integer(color);
            this.monthNameStyle.setTextColor(colorValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onMonthNameFontNameChanged = function (data) {
        if (data.newValue) {
            this.monthNameStyle.setFontName(data.newValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onMonthNameFontStyleChanged = function (data) {
        if (data.newValue) {
            var font = Tool.createTypeface(this.monthNameFontName, data.newValue);
            var fontStyle = new java.lang.Integer(font.getStyle());
            this.monthNameStyle.setFontStyle(fontStyle);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onMonthNameTextSizeChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            var size = data.newValue * utilsModule.layout.getDisplayDensity();
            var sizeValue = new java.lang.Float(size);
            this.monthNameStyle.setTextSize(sizeValue);
            this.onStyleChanged();
        }
    };
    return MonthCellStyle;
})(commonModule.MonthCellStyle);
exports.MonthCellStyle = MonthCellStyle;
/**
 * Cell style class for inline events cells in month view
 */
var InlineEventCellStyle = (function (_super) {
    __extends(InlineEventCellStyle, _super);
    function InlineEventCellStyle() {
        _super.apply(this, arguments);
    }
    InlineEventCellStyle.prototype.apply = function (adapter) {
        if (!adapter) {
            return;
        }
        this._adapter = adapter;
        var color;
        if (this.cellBackgroundColor) {
            color = (new color_1.Color(this.cellBackgroundColor)).argb;
            this._adapter.setInlineEventsBackgroundColor(color);
        }
        if (this.eventTextColor) {
        }
        if (this.eventFontName) {
        }
        if (this.eventFontStyle) {
        }
        if (!isNaN(this.eventTextSize)) {
            this._adapter.setInlineEventTitleTextSize(this.eventTextSize);
        }
        if (this.timeTextColor) {
            var color_2 = (new color_1.Color(this.timeTextColor)).argb;
            this._adapter.setInlineEventTimeStartTextColor(color_2);
            this._adapter.setInlineEventTimeEndTextColor(color_2);
        }
        if (this.timeFontName) {
        }
        if (this.timeFontStyle) {
        }
        if (this.timeTextSize) {
            if (!isNaN(+this.timeTextSize)) {
                //note: these methods don't require display density to be taken account
                this._adapter.setInlineEventTimeEndTextSize(this.timeTextSize);
                this._adapter.setInlineEventTimeStartTextSize(this.timeTextSize);
            }
        }
    };
    InlineEventCellStyle.prototype.onCellBackgroundColorChanged = function (data) {
        if (data.newValue && this._adapter) {
            var color = (new color_1.Color(data.newValue)).argb;
            this._adapter.setInlineEventsBackgroundColor(color);
        }
    };
    InlineEventCellStyle.prototype.onEventTextColorChanged = function (data) {
        //TODO: console.log("WARNING: Text color for inline event is not supported for Andorid calendar.")
    };
    InlineEventCellStyle.prototype.onEventFontNameChanged = function (data) {
        //TODO: console.log("WARNING: Font name property for inline event text is not supported for Andorid calendar.")
    };
    InlineEventCellStyle.prototype.onEventFontStyleChanged = function (data) {
        //TODO: console.log("WARNING: Font style property for inline event text is not supported for Andorid calendar.")
    };
    InlineEventCellStyle.prototype.onEventTextSizeChanged = function (data) {
        if (!isNaN(+data.newValue) && this._adapter) {
            this._adapter.setInlineEventTitleTextSize(data.newValue);
        }
    };
    InlineEventCellStyle.prototype.onTimeTextColorChanged = function (data) {
        if (data.newValue && this._adapter) {
            var color = (new color_1.Color(data.newValue)).argb;
            this._adapter.setInlineEventTimeStartTextColor(color);
            this._adapter.setInlineEventTimeEndTextColor(color);
        }
    };
    InlineEventCellStyle.prototype.onTimeFontNameChanged = function (data) {
        //TODO: console.log("WARNING: Font name property for for inline event date/time is not supported for Andorid calendar.")
    };
    InlineEventCellStyle.prototype.onTimeFontStyleChanged = function (data) {
        //TODO: console.log("WARNING: Font style property for for inline event date/time is not supported for Andorid calendar.")
    };
    InlineEventCellStyle.prototype.onTimeTextSizeChanged = function (data) {
        if (!isNaN(+data.newValue) && this._adapter) {
            //note: these methods don't require display density to be taken account
            this._adapter.setInlineEventTimeEndTextSize(data.newValue);
            this._adapter.setInlineEventTimeStartTextSize(data.newValue);
        }
    };
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
            this.updateNativeStyles();
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.updateNativeStyles = function () {
        if (!this._owner || !this._owner.android) {
            return;
        }
        if (this.backgroundColor) {
            var color = (new color_1.Color(this.backgroundColor)).argb;
            this._owner.android.setBackgroundColor(color);
        }
        if (this.showDayNames != undefined && this.showDayNames != null) {
            this._owner.android.setShowDayNames(this.showDayNames);
        }
        if (this.showTitle != undefined && this.showTitle != null) {
            this._owner.android.setShowTitle(this.showTitle);
        }
        if (this.showWeekNumbers != undefined && this.showWeekNumbers != null) {
            this._owner.android.setWeekNumbersDisplayMode(this.showWeekNumbers ? com.telerik.widget.calendar.WeekNumbersDisplayMode.Block : com.telerik.widget.calendar.WeekNumbersDisplayMode.None);
        }
        if (this.dayCellStyle) {
            this.prepareNativeStyle(this.dayCellStyle, CellStyleType.RegularDayStyle);
            this._owner.android.addDayCellStyle(this.dayCellStyle.android);
        }
        if (this.weekendCellStyle) {
            this.prepareNativeStyle(this.weekendCellStyle, CellStyleType.WeekendStyle);
            this._owner.android.addDayCellStyle(this.weekendCellStyle.android);
        }
        if (this.todayCellStyle) {
            this.prepareNativeStyle(this.todayCellStyle, CellStyleType.TodayStyle);
            this._owner.android.addDayCellStyle(this.todayCellStyle.android);
        }
        if (this.dayNameCellStyle) {
            this.prepareNativeStyle(this.dayNameCellStyle, CellStyleType.DayNameStyle);
            this._owner.android.addDayCellStyle(this.dayNameCellStyle.android);
        }
        if (this.weekNumberCellStyle) {
            this.prepareNativeStyle(this.weekNumberCellStyle, CellStyleType.WeekNumberStyle);
            this._owner.android.addDayCellStyle(this.weekNumberCellStyle.android);
        }
        if (this.titleCellStyle) {
            this.prepareNativeStyle(this.titleCellStyle, CellStyleType.TitleStyle);
            this._owner.android.addDayCellStyle(this.titleCellStyle.android);
        }
        if (this.selectedDayCellStyle) {
            this.prepareNativeStyle(this.selectedDayCellStyle, CellStyleType.SelectedDayStyle);
            this._owner.android.addDayCellStyle(this.selectedDayCellStyle.android);
        }
        if (this.inlineEventCellStyle) {
            this.prepareNativeStyle(this.inlineEventCellStyle, null);
        }
    };
    CalendarMonthViewStyle.prototype.prepareNativeStyle = function (style, cellType) {
        if (!style || !this._owner || !this._owner.android) {
            return;
        }
        style.owner = this._owner.android;
        if (style instanceof DayCellStyle) {
            style.eventAdapter = this._owner.android.getEventAdapter();
        }
        if (cellType != null) {
            this.updateNativeStyleFilters(style, cellType);
        }
        else {
            style.apply(this._owner.android.getAdapter());
        }
    };
    CalendarMonthViewStyle.prototype.updateNativeStyleFilters = function (style, cellType) {
        style.updateNativeStyleFilters(cellType, com.telerik.widget.calendar.CalendarDisplayMode.Month);
    };
    //propeties
    CalendarMonthViewStyle.prototype.onShowWeekNumbersChanged = function (data) {
        if (this._owner && this._owner.android) {
            this._owner.android.setWeekNumbersDisplayMode(data.newValue ? com.telerik.widget.calendar.WeekNumbersDisplayMode.Block : com.telerik.widget.calendar.WeekNumbersDisplayMode.None);
        }
    };
    CalendarMonthViewStyle.prototype.onShowTitleChanged = function (data) {
        if (this._owner && this._owner.android) {
            this._owner.android.setShowTitle(data.newValue);
        }
    };
    CalendarMonthViewStyle.prototype.onShowDayNamesChanged = function (data) {
        if (this._owner && this._owner.android) {
            this._owner.android.setShowDayNames(data.newValue);
        }
    };
    CalendarMonthViewStyle.prototype.onBackgroundColorChanged = function (data) {
        if (data.newValue && this._owner && this._owner.android) {
            var color = (new color_1.Color(data.newValue)).argb;
            this._owner.android.setBackgroundColor(color);
        }
    };
    CalendarMonthViewStyle.prototype.onDayCellStyleChanged = function (data) {
        if (this._owner && this._owner.android) {
            if (data.oldValue) {
                this._owner.android.removeDayCellStyle(data.oldValue.android);
            }
            if (data.newValue) {
                this.prepareNativeStyle(data.newValue, CellStyleType.RegularDayStyle);
                this._owner.android.addDayCellStyle(data.newValue.android);
            }
        }
    };
    CalendarMonthViewStyle.prototype.onSelectedDayCellStyleChanged = function (data) {
        if (this._owner && this._owner.android) {
            if (data.oldValue) {
                this._owner.android.removeDayCellStyle(data.oldValue.android);
            }
            if (data.newValue) {
                this.prepareNativeStyle(data.newValue, CellStyleType.SelectedDayStyle);
                this._owner.android.addDayCellStyle(data.newValue.android);
            }
        }
    };
    CalendarMonthViewStyle.prototype.onTodayCellStyleChanged = function (data) {
        if (this._owner && this._owner.android) {
            if (data.oldValue) {
                this._owner.android.removeDayCellStyle(data.oldValue.android);
            }
            if (data.newValue) {
                this.prepareNativeStyle(data.newValue, CellStyleType.TodayStyle);
                this._owner.android.addDayCellStyle(data.newValue.android);
            }
        }
    };
    CalendarMonthViewStyle.prototype.onWeekNumberCellStyleChanged = function (data) {
        if (this._owner && this._owner.android) {
            if (data.oldValue) {
                this._owner.android.removeDayCellStyle(data.oldValue.android);
            }
            if (data.newValue) {
                this.prepareNativeStyle(data.newValue, CellStyleType.WeekNumberStyle);
                this._owner.android.addDayCellStyle(data.newValue.android);
            }
        }
    };
    CalendarMonthViewStyle.prototype.onWeekendCellStyleChanged = function (data) {
        if (this._owner && this._owner.android) {
            if (data.oldValue) {
                this._owner.android.removeDayCellStyle(data.oldValue.android);
            }
            if (data.newValue) {
                this.prepareNativeStyle(data.newValue, CellStyleType.WeekendStyle);
                this._owner.android.addDayCellStyle(data.newValue.android);
            }
        }
    };
    CalendarMonthViewStyle.prototype.onDayNameCellStyleChanged = function (data) {
        if (this._owner && this._owner.android) {
            if (data.oldValue) {
                this._owner.android.removeDayCellStyle(data.oldValue.android);
            }
            if (data.newValue) {
                this.prepareNativeStyle(data.newValue, CellStyleType.DayNameStyle);
                this._owner.android.addDayCellStyle(data.newValue.android);
            }
        }
    };
    CalendarMonthViewStyle.prototype.onTitleCellStyleChanged = function (data) {
        if (this._owner && this._owner.android) {
            if (data.oldValue) {
                this._owner.android.removeDayCellStyle(data.oldValue.android);
            }
            if (data.newValue) {
                this.prepareNativeStyle(data.newValue, CellStyleType.TitleStyle);
                this._owner.android.addDayCellStyle(data.newValue.android);
            }
        }
    };
    CalendarMonthViewStyle.prototype.onInlineEventCellStyleChanged = function (data) {
        this.prepareNativeStyle(data.newValue, null);
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
    CalendarWeekViewStyle.prototype.updateNativeStyleFilters = function (style, cellType) {
        style.updateNativeStyleFilters(cellType, com.telerik.widget.calendar.CalendarDisplayMode.Week);
    };
    return CalendarWeekViewStyle;
})(CalendarMonthViewStyle);
exports.CalendarWeekViewStyle = CalendarWeekViewStyle;
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
            this.updateNativeStyles();
        },
        enumerable: true,
        configurable: true
    });
    CalendarYearViewStyle.prototype.updateNativeStyles = function () {
        if (!this._owner || !this._owner.android) {
            return;
        }
        if (this.titleCellStyle) {
            this.titleCellStyle.owner = this._owner.android;
            this.titleCellStyle.updateNativeStyleFilters(CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
            this._owner.android.addDayCellStyle(this.titleCellStyle.android);
        }
        if (this.monthCellStyle) {
            this.monthCellStyle.owner = this._owner.android;
            this._owner.android.addMonthCellStyle(this.monthCellStyle.regularDayStyle);
            this._owner.android.addMonthCellStyle(this.monthCellStyle.weekendStyle);
            this._owner.android.addMonthCellStyle(this.monthCellStyle.todayStyle);
            this._owner.android.addMonthCellStyle(this.monthCellStyle.dayNameStyle);
            this._owner.android.addMonthCellStyle(this.monthCellStyle.monthNameStyle);
            this._owner.android.addMonthCellStyle(this.monthCellStyle.monthCellStyle);
        }
    };
    CalendarYearViewStyle.prototype.onTitleCellStyleChanged = function (data) {
        if (this._owner && this._owner.android) {
            if (data.oldValue) {
                this._owner.android.removeDayCellStyle(data.oldValue.android);
            }
            if (data.newValue) {
                data.newValue.owner = this._owner.android;
                data.newValue.updateNativeStyleFilters(CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
                this._owner.android.addDayCellStyle(data.newValue.android);
            }
        }
    };
    CalendarYearViewStyle.prototype.onMonthCellStyleChanged = function (data) {
        if (this._owner && this._owner.android) {
            if (data.oldValue) {
                this._owner.android.removeMonthCellStyle(data.oldValue.regularDayStyle);
                this._owner.android.removeMonthCellStyle(data.oldValue.weekendStyle);
                this._owner.android.removeMonthCellStyle(data.oldValue.todayStyle);
                this._owner.android.removeMonthCellStyle(data.oldValue.dayNameStyle);
                this._owner.android.removeMonthCellStyle(data.oldValue.monthNameStyle);
                this._owner.android.removeMonthCellStyle(data.oldValue.monthCellStyle);
            }
            if (data.newValue) {
                data.newValue.owner = this._owner.android;
                this._owner.android.addMonthCellStyle(data.newValue.regularDayStyle);
                this._owner.android.addMonthCellStyle(data.newValue.weekendStyle);
                this._owner.android.addMonthCellStyle(data.newValue.todayStyle);
                this._owner.android.addMonthCellStyle(data.newValue.dayNameStyle);
                this._owner.android.addMonthCellStyle(data.newValue.monthNameStyle);
                this._owner.android.addMonthCellStyle(data.newValue.monthCellStyle);
            }
        }
    };
    return CalendarYearViewStyle;
})(commonModule.CalendarYearViewStyle);
exports.CalendarYearViewStyle = CalendarYearViewStyle;
/**
 * The year view mode in compact view
 */
var CalendarMonthNamesViewStyle = (function (_super) {
    __extends(CalendarMonthNamesViewStyle, _super);
    function CalendarMonthNamesViewStyle() {
        _super.call(this);
    }
    Object.defineProperty(CalendarMonthNamesViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.updateNativeStyles();
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthNamesViewStyle.prototype.updateNativeStyles = function () {
        if (!this._owner || !this._owner.android) {
            return;
        }
        if (this.titleCellStyle) {
            this.titleCellStyle.owner = this._owner.android;
            this.titleCellStyle.updateNativeStyleFilters(CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
            this._owner.android.addDayCellStyle(this.titleCellStyle.android);
        }
        if (this.monthNameCellStyle) {
            this.monthNameCellStyle.nativeIsYear = true;
            this.monthNameCellStyle.owner = this._owner.android;
            this.monthNameCellStyle.updateNativeStyleFilters(CellStyleType.MonthNameStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
            this._owner.android.addMonthCellStyle(this.monthNameCellStyle.android);
        }
    };
    CalendarMonthNamesViewStyle.prototype.updateFilterDisplayMode = function (filter) {
        var possitiveFilter = new java.lang.Boolean(true);
        //filter.setTextIsMonthName(possitiveFilter);
        filter.setMonthIsCompact(possitiveFilter);
    };
    CalendarMonthNamesViewStyle.prototype.onTitleCellStyleChanged = function (data) {
        if (this._owner && this._owner.android) {
            if (data.oldValue) {
                this._owner.android.removeDayCellStyle(data.oldValue.android);
            }
            if (data.newValue) {
                data.newValue.owner = this._owner.android;
                data.newValue.updateNativeStyleFilters(CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
                this._owner.android.addDayCellStyle(data.newValue.android);
            }
        }
    };
    CalendarMonthNamesViewStyle.prototype.onMonthNameCellStyleChanged = function (data) {
        if (this._owner && this._owner.android) {
            if (data.oldValue) {
                this._owner.android.removeMonthCellStyle(data.oldValue.android);
            }
            if (data.newValue) {
                data.newValue.nativeIsYear = true;
                data.newValue.owner = this._owner.android;
                data.newValue.updateNativeStyleFilters(CellStyleType.MonthNameStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
                this._owner.android.addMonthCellStyle(data.newValue.android);
            }
        }
    };
    return CalendarMonthNamesViewStyle;
})(commonModule.CalendarMonthNamesViewStyle);
exports.CalendarMonthNamesViewStyle = CalendarMonthNamesViewStyle;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              RadCalendar
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var RadCalendar = (function (_super) {
    __extends(RadCalendar, _super);
    function RadCalendar() {
        _super.call(this);
    }
    Object.defineProperty(RadCalendar.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.prototype._createUI = function () {
        this._android = new com.telerik.widget.calendar.RadCalendarView(this._context);
        this._android.setHorizontalScroll(this.horizontalTransition);
        // this.addOnCellClickListener();
        this.addOnDisplayDateChangedListener();
        this.updateEventSource();
        this.addOnDisplayModeChangedListener();
        this.addOnSelectedDatesChangedListener();
        //set initial property values using value changed handlers
        this.setNativeMinDate(this.minDate);
        this.setNativeMaxDate(this.maxDate);
        if (this.displayedDate == undefined) {
            this.loadNativeDisplayedDate();
        }
        else {
            this.setNativeDisplayedDate(this.displayedDate);
        }
        this.setNativeSelectionMode(this.selectionMode);
        this.setNativeEventsViewMode(this.eventsViewMode);
        this.setNativeHorizontalTransition(this.horizontalTransition);
        this.setNativeTransitionMode(this.transitionMode);
        this.setNativeViewMode(this.viewMode);
        this.setNativeSelectedDate(this.selectedDate);
        this.setNativeSelectedDates(this.selectedDates);
        this.setNativeSelectedDateRange(this.selectedDateRange);
        //apply cell styles
        if (this.monthViewStyle) {
            this.monthViewStyle.owner = this;
        }
        if (this.weekViewStyle) {
            this.weekViewStyle.owner = this;
        }
        if (this.yearViewStyle) {
            this.yearViewStyle.owner = this;
        }
        if (this.monthNamesViewStyle) {
            this.monthNamesViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.loadNativeDisplayedDate = function () {
        var date = new Date(this._android.getDisplayDate());
        if (this.displayedDate != date) {
            this.displayedDate = date;
        }
    };
    RadCalendar.prototype.addOnCellClickListener = function () {
        var that = new WeakRef(this);
        this.android.setOnCellClickListener({
            onCellClick: function (cell) {
            }
        });
    };
    RadCalendar.prototype.addOnInlineEventsClickedListener = function () {
        var that = new WeakRef(this);
        if (this.android.eventsManager()) {
            this.android.eventsManager().setOnItemClickListener(null);
            this.android.eventsManager().setOnItemClickListener(new android.widget.AdapterView.OnItemClickListener({
                onItemClick: function (parent, view, position, id) {
                    var event = parent.getAdapter().getItem(position); //returned object is instance of EventsManager.EventInfo class
                    var inlineEventData = new CalendarEvent(event.title(), new Date(event.startTime()), new Date(event.endTime()), event.allDay);
                    var args = {
                        eventName: commonModule.RadCalendar.inlineEventSelectedEvent,
                        object: this._owner,
                        eventData: inlineEventData
                    };
                    that.get().notify(args);
                }
            }));
        }
    };
    //calendarDidNavigateToDate
    //calendarWillNavigateToDate
    RadCalendar.prototype.addOnDisplayDateChangedListener = function () {
        var that = new WeakRef(this);
        this.android.setOnDisplayDateChangedListener(new com.telerik.widget.calendar.RadCalendarView.OnDisplayDateChangedListener({
            onDisplayDateChanged: function (oldDate, newDate) {
                var newDisplayedDate = new Date(newDate);
                if (that.get().displayedDate == newDisplayedDate) {
                    return;
                }
                var navigationStartedArgs = {
                    eventName: commonModule.RadCalendar.navigatingToDateStartedEvent,
                    object: that.get(),
                    date: newDisplayedDate
                };
                that.get().notify(navigationStartedArgs);
                that.get().displayedDate = newDisplayedDate;
                var navigatedArgs = {
                    eventName: commonModule.RadCalendar.navigatedToDateEvent,
                    object: that.get(),
                    date: newDisplayedDate
                };
                that.get().notify(navigatedArgs);
            }
        }));
    };
    // calendarDidChangedViewModeFromTo
    RadCalendar.prototype.addOnDisplayModeChangedListener = function () {
        var that = new WeakRef(this);
        this.android.setOnDisplayModeChangedListener(new com.telerik.widget.calendar.RadCalendarView.OnDisplayModeChangedListener({
            onDisplayModeChanged: function (oldMode, newMode) {
                var newCalendarMode = RadCalendar.getViewModeFromAndroidViewMode(that.get(), newMode);
                that.get().viewMode = newCalendarMode;
                var args = {
                    eventName: commonModule.RadCalendar.viewModeChangedEvent,
                    object: that.get(),
                    oldValue: RadCalendar.getViewModeFromAndroidViewMode(that.get(), oldMode),
                    newValue: RadCalendar.getViewModeFromAndroidViewMode(that.get(), newMode)
                };
                that.get().notify(args);
            }
        }));
    };
    //calendarDidDeselectedDate
    //calendarDidSelectDate
    //calendarShoudlSelectDate
    RadCalendar.prototype.addOnSelectedDatesChangedListener = function () {
        var that = new WeakRef(this);
        this.android.setOnSelectedDatesChangedListener(new com.telerik.widget.calendar.RadCalendarView.OnSelectedDatesChangedListener({
            onSelectedDatesChanged: function (context) {
                var selectedCount = context.datesAdded().size();
                var deselectedCount = context.datesRemoved().size();
                if (that.get().selectionMode !== commonModule.CalendarSelectionMode.Range && deselectedCount > 0) {
                    for (var i = 0; i < deselectedCount; i++) {
                        var deselectedDate = new Date(context.datesRemoved().get(i).longValue());
                        that.get().notifyDateDeselected(that.get(), deselectedDate);
                    }
                }
                if (that.get().selectionMode === commonModule.CalendarSelectionMode.Range && selectedCount > 0) {
                    var firstSelected = new Date(context.datesAdded().get(0).longValue());
                    var lastSelected = new Date(context.datesAdded().get(selectedCount - 1).longValue());
                    that.get().notifyRangeSelectionChanged(that.get(), firstSelected, lastSelected);
                }
                else if (selectedCount > 0) {
                    for (var i = 0; i < selectedCount; i++) {
                        var millis = context.datesAdded().get(i).longValue();
                        var selectedDate = new Date(millis);
                        that.get().notifySingleDateSelected(that.get(), selectedDate);
                    }
                }
            }
        }));
    };
    RadCalendar.prototype.notifySingleDateSelected = function (calendar, date) {
        this._forbidNativeSelection = true;
        if (!this.selectedDate || this.parseDate(this.selectedDate).getTime() !== date.getTime()) {
            this.selectedDate = date;
        }
        if (calendar.selectionMode === commonModule.CalendarSelectionMode.Multiple) {
            this._addSelectedDate(date);
        }
        this._forbidNativeSelection = false;
        var selectedArgs = {
            eventName: commonModule.RadCalendar.dateSelectedEvent,
            object: calendar,
            date: date
        };
        calendar.notify(selectedArgs);
    };
    RadCalendar.prototype.notifyDateDeselected = function (calendar, date) {
        this._forbidNativeSelection = true;
        if (calendar.selectionMode === commonModule.CalendarSelectionMode.Multiple) {
            this._removeSelectedDate(date);
        }
        this._forbidNativeSelection = false;
        var selectedArgs = {
            eventName: commonModule.RadCalendar.dateDeselectedEvent,
            object: calendar,
            date: date
        };
        calendar.notify(selectedArgs);
    };
    RadCalendar.prototype.notifyRangeSelectionChanged = function (calendar, firstSelected, lastSelected) {
        this._forbidNativeSelection = true;
        if (!this.selectedDate || this.parseDate(this.selectedDate).getTime() !== lastSelected.getTime()) {
            this.selectedDate = lastSelected;
        }
        var selectionAlreadyStarted = false;
        // range selection starts one day after the first date
        if (this.selectedDateRange && this.parseDate(this.selectedDateRange.endDate).getTime() === (firstSelected.getTime() - 1000 * 60 * 60 * 24)) {
            selectionAlreadyStarted = true;
        }
        if (!this.selectedDateRange || this.parseDate(this.selectedDateRange.endDate).getTime() !== lastSelected.getTime()) {
            this.selectedDateRange = new commonModule.DateRange(firstSelected, lastSelected);
        }
        this._forbidNativeSelection = false;
        if (firstSelected.getTime() !== lastSelected.getTime() && !selectionAlreadyStarted) {
            var firstSelectedArgs = {
                eventName: commonModule.RadCalendar.dateSelectedEvent,
                object: calendar,
                date: firstSelected
            };
            calendar.notify(firstSelectedArgs);
        }
        var lastSelectedArgs = {
            eventName: commonModule.RadCalendar.dateSelectedEvent,
            object: calendar,
            date: lastSelected
        };
        calendar.notify(lastSelectedArgs);
    };
    ///////////////////////////////////////////////////////////////////////////////////////////
    //NOTE: Since calendar is not created during xml parsing, we have setters for properties and call them from createUI & propety changed handlers.
    ///////////////////////////////////////////////////////////////////////////////////////////
    //Native setters - it's assumed that this.android is initialized, so call these methods after createUI is already called
    RadCalendar.prototype.setNativeViewMode = function (mode) {
        if (mode) {
            var bSetYearMode = false;
            var nativeMode = null;
            switch (mode.toLowerCase()) {
                case commonModule.CalendarViewMode.Month.toLowerCase():
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Month;
                    break;
                case commonModule.CalendarViewMode.MonthNames.toLowerCase():
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                    bSetYearMode = true;
                    break;
                case commonModule.CalendarViewMode.Week.toLowerCase():
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Week;
                    break;
                case commonModule.CalendarViewMode.Year.toLowerCase():
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                    break;
            }
            if (nativeMode == com.telerik.widget.calendar.CalendarDisplayMode.Year) {
                if (this._android.isYearModeCompact() != bSetYearMode) {
                    this._android.setYearModeCompact(bSetYearMode);
                }
            }
            this._android.setDisplayMode(nativeMode);
        }
    };
    RadCalendar.prototype.setNativeSelectionMode = function (mode) {
        if (mode) {
            var selMode = null;
            switch (mode.toLowerCase()) {
                case commonModule.CalendarSelectionMode.None.toLowerCase():
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.None;
                    break;
                case commonModule.CalendarSelectionMode.Single.toLowerCase():
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.Single;
                    break;
                case commonModule.CalendarSelectionMode.Multiple.toLowerCase():
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.Multiple;
                    break;
                case commonModule.CalendarSelectionMode.Range.toLowerCase():
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.Range;
                    break;
                default:
                    console.log("WARNING: Unsupported selection mode set: " + mode);
            }
            if (selMode) {
                this._android.setSelectionMode(selMode);
            }
        }
    };
    RadCalendar.prototype.setNativeTransitionMode = function (mode) {
        if (mode) {
            this.android.setScrollMode(RadCalendar.getAndroidTransitonModeFromTransitionMode(mode));
        }
    };
    RadCalendar.prototype.setNativeEventsViewMode = function (data) {
        if (data) {
            this.android.setEventsDisplayMode(RadCalendar.getAndroidEventsViewModeFromEventsViewMode(data));
        }
    };
    RadCalendar.prototype.setNativeMaxDate = function (data) {
        if (data) {
            var date = this.parseDate(data);
            var calendar = RadCalendar.getCalendarFromDate(date);
            this.android.setMaxDate(calendar.getTimeInMillis());
        }
    };
    RadCalendar.prototype.setNativeMinDate = function (data) {
        if (data) {
            var date = this.parseDate(data);
            var calendar = RadCalendar.getCalendarFromDate(date);
            this.android.setMinDate(calendar.getTimeInMillis());
        }
    };
    RadCalendar.prototype.setNativeDisplayedDate = function (data) {
        if (data) {
            var date = this.parseDate(data);
            var calendar = RadCalendar.getCalendarFromDate(date);
            this.android.setDisplayDate(calendar.getTimeInMillis());
        }
    };
    RadCalendar.prototype.setNativeSelectedDate = function (data) {
        if (data) {
            var date = this.parseDate(data);
            var calendar = RadCalendar.getCalendarFromDate(date);
            var selectedDates = new java.util.ArrayList;
            selectedDates.add(new java.lang.Long(calendar.getTimeInMillis()));
            this.android.setSelectedDates(selectedDates);
        }
    };
    RadCalendar.prototype.setNativeSelectedDates = function (data) {
        if (data) {
            var newDates = data;
            if (typeof (data) === "string") {
                newDates = newDates.split(",");
            }
            var selectedDates = new java.util.ArrayList();
            for (var date in newDates) {
                var newDate = RadCalendar.getCalendarFromDate(this.parseDate(newDates[date]));
                selectedDates.add(new java.lang.Long(newDate.getTimeInMillis()));
            }
            this.android.setSelectedDates(selectedDates);
        }
    };
    RadCalendar.prototype.setNativeSelectedDateRange = function (data) {
        if (data && (data instanceof commonModule.DateRange)) {
            var newDateRange = data;
            var start = RadCalendar.getCalendarFromDate(this.parseDate(newDateRange.startDate));
            var end = RadCalendar.getCalendarFromDate(this.parseDate(newDateRange.endDate));
            var androidDateRange = new com.telerik.widget.calendar.DateRange(start.getTimeInMillis(), end.getTimeInMillis());
            this.android.setSelectedRange(androidDateRange);
        }
    };
    RadCalendar.prototype.setNativeHorizontalTransition = function (data) {
        var horizontalTransition = data;
        this.android.setHorizontalScroll(horizontalTransition);
    };
    RadCalendar.prototype.getDisplayedDate = function () {
        return this._android.getDisplayDate();
    };
    ///////////////////////////////////////////////////////////////////////////////////////////
    //Property changed handlers
    RadCalendar.prototype.onViewModeChanged = function (eventData) {
        if (this.android) {
            this.setNativeViewMode(eventData.newValue);
        }
    };
    RadCalendar.prototype.onSelectionModeChanged = function (eventData) {
        if (this.android) {
            this.clearSelection();
            this.setNativeSelectionMode(eventData.newValue);
        }
    };
    RadCalendar.prototype.onTransitionModeChanged = function (eventData) {
        if (this.android) {
            this.setNativeTransitionMode(eventData.newValue);
        }
    };
    RadCalendar.prototype.onEventsViewModeChanged = function (eventData) {
        if (this.android) {
            this.setNativeEventsViewMode(eventData.newValue);
            if (this.eventsViewMode != commonModule.CalendarEventsViewMode.None) {
                this.addOnInlineEventsClickedListener();
            }
        }
    };
    RadCalendar.prototype.onMaxDateChanged = function (eventData) {
        if (this.android) {
            this.setNativeMaxDate(eventData.newValue);
        }
    };
    RadCalendar.prototype.onMinDateChanged = function (eventData) {
        if (this.android) {
            this.setNativeMinDate(eventData.newValue);
        }
    };
    RadCalendar.prototype.onDisplayedDateChanged = function (eventData) {
        if (this.android) {
            this.setNativeDisplayedDate(eventData.newValue);
        }
    };
    RadCalendar.prototype.onSelectedDateChanged = function (eventData) {
        if (this._forbidNativeSelection || !this.android) {
            return;
        }
        this.setNativeSelectedDate(eventData.newValue);
    };
    RadCalendar.prototype.onSelectedDatesChanged = function (eventData) {
        if (this._forbidNativeSelection || !this.android) {
            return;
        }
        this.setNativeSelectedDates(eventData.newValue);
    };
    RadCalendar.prototype.onSelectedDateRangeChanged = function (eventData) {
        if (this._forbidNativeSelection || !this.android) {
            return;
        }
        this.setNativeSelectedDateRange(eventData.newValue);
    };
    RadCalendar.prototype.onHorizontalTransitionChanged = function (eventData) {
        if (this.android) {
            this.setNativeHorizontalTransition(eventData.newValue);
        }
    };
    RadCalendar.prototype.onMonthViewStyleChanged = function (data) {
        if (data.newValue && (data.newValue instanceof CalendarMonthViewStyle)) {
            this.monthViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.onWeekViewStyleChanged = function (data) {
        if (data.newValue && (data.newValue instanceof CalendarWeekViewStyle)) {
            this.weekViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.onMonthNamesViewStyleChanged = function (data) {
        if (data.newValue && (data.newValue instanceof CalendarMonthNamesViewStyle)) {
            this.monthNamesViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.onYearViewStyleChanged = function (data) {
        if (data.newValue && (data.newValue instanceof CalendarYearViewStyle)) {
            this.yearViewStyle.owner = this;
        }
    };
    ///////////////////////////////////////////////////////////////////////////////////////////
    //Helper methods
    RadCalendar.prototype.reload = function () {
        if (this.android) {
            this.android.invalidate();
        }
    };
    RadCalendar.prototype.navigateForward = function () {
        this.android.shiftDate(true);
    };
    RadCalendar.prototype.navigateBack = function () {
        this.android.shiftDate(false);
    };
    RadCalendar.prototype.goToDate = function (date) {
        this.android.setDisplayDate(date.getTime());
    };
    RadCalendar.prototype.getEventsForDate = function (date) {
        var nativeResult = this.android.getEventAdapter().getEventsForDate(date.getTime());
        var result = new Array();
        if (nativeResult) {
            for (var i = 0; i < nativeResult.size(); i++) {
                var nativeEvent = nativeResult.get(i);
                result.push(new CalendarEvent(nativeEvent.getTitle(), new Date(nativeEvent.getStartDate()), new Date(nativeEvent.getEndDate()), nativeEvent.isAllDay(), new color_1.Color(nativeEvent.getEventColor())));
            }
        }
        return result;
    };
    RadCalendar.getCalendarFromDate = function (date) {
        var calendar = java.util.Calendar.getInstance();
        calendar.setTimeInMillis(date.getTime());
        return calendar;
    };
    RadCalendar.getDateFromCalendar = function (calendar) {
        return new Date(calendar.getTimeInMillis());
    };
    RadCalendar.prototype.clearSelection = function () {
        this.selectedDates = new Array();
    };
    RadCalendar.prototype.updateEventSource = function () {
        if (!this.android) {
            return;
        }
        if (this.eventSource) {
            var list = new java.util.ArrayList();
            for (var i = 0; i < this.eventSource.length; i++) {
                var item;
                if (this.eventSource instanceof observable_array_1.ObservableArray) {
                    item = this.eventSource.getItem(i).android;
                }
                else if (this.eventSource instanceof Array) {
                    item = this.eventSource[i].android;
                }
                list.add(item);
            }
            var eventAdapter = this.android.getEventAdapter();
            eventAdapter.setEvents(list);
        }
    };
    RadCalendar.getAndroidViewModeFromViewMode = function (viewMode) {
        var modeString = viewMode.toLowerCase();
        var result = null;
        switch (modeString) {
            case commonModule.CalendarViewMode.Month.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarDisplayMode.Month;
                break;
            case commonModule.CalendarViewMode.MonthNames.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                break;
            case commonModule.CalendarViewMode.Week.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarDisplayMode.Week;
                break;
            case commonModule.CalendarViewMode.Year.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                break;
        }
        return result;
    };
    RadCalendar.getViewModeFromAndroidViewMode = function (calendar, viewMode) {
        var result = "";
        switch (viewMode) {
            case com.telerik.widget.calendar.CalendarDisplayMode.Month:
                result = commonModule.CalendarViewMode.Month;
                break;
            case com.telerik.widget.calendar.CalendarDisplayMode.Week:
                result = commonModule.CalendarViewMode.Week;
                break;
            case com.telerik.widget.calendar.CalendarDisplayMode.Year: {
                if (calendar.android.isYearModeCompact()) {
                    result = commonModule.CalendarViewMode.MonthNames;
                }
                else {
                    result = commonModule.CalendarViewMode.Year;
                }
                break;
            }
        }
        //?? case com.telerik.widget.calendar.CalendarDisplayMode.Flow: result = commonModule.CalendarViewMode.Flow; break;
        //?? case com.telerik.widget.calendar.CalendarDisplayMode.YearNumbers: result = commonModule.CalendarViewMode.YearNumbers; break;
        return result;
    };
    RadCalendar.getAndroidTransitonModeFromTransitionMode = function (value) {
        var transitionMode = value.toLowerCase();
        var nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Sticky;
        switch (transitionMode) {
            case commonModule.CalendarTransitionMode.None.toLowerCase():
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.None;
                break;
            case commonModule.CalendarTransitionMode.Slide.toLowerCase():
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Sticky;
                break;
            case commonModule.CalendarTransitionMode.Stack.toLowerCase():
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Stack;
                break;
            case commonModule.CalendarTransitionMode.Plain.toLowerCase():
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Plain;
                break;
            case commonModule.CalendarTransitionMode.Free.toLowerCase():
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Free;
                break;
            case commonModule.CalendarTransitionMode.Combo.toLowerCase():
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Combo;
                break;
            case commonModule.CalendarTransitionMode.Overlap.toLowerCase():
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Overlap;
                break;
            default:
                console.log("WARNING: Unsupported transition mode: " + value);
        }
        return nativeScrollMode;
    };
    RadCalendar.getAndroidEventsViewModeFromEventsViewMode = function (value) {
        var eventsViewMode = value.toLowerCase();
        var nativeViewMode = com.telerik.widget.calendar.events.EventsDisplayMode.Normal;
        switch (eventsViewMode) {
            case commonModule.CalendarEventsViewMode.Inline.toLowerCase():
                nativeViewMode = com.telerik.widget.calendar.events.EventsDisplayMode.Inline;
                break;
            case commonModule.CalendarEventsViewMode.Popover.toLowerCase():
                nativeViewMode = com.telerik.widget.calendar.events.EventsDisplayMode.Popup;
                break;
            default:
                break;
        }
        return nativeViewMode;
    };
    return RadCalendar;
})(commonModule.RadCalendar);
exports.RadCalendar = RadCalendar;
