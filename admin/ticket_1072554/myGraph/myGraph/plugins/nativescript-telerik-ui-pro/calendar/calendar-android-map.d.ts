declare module com {
    module telerik {
        module android {
            module common {
                interface Procedure<TArg> {

                }
            }
        }

        module widget {
            module calendar {
                class CalendarAdapter {
                    getInlineEventTitleTextSize(): number;
                    setInlineEventTitleTextSize(textSize: number);

                    getInlineEventTimeStartTextSize(): number;
                    setInlineEventTimeStartTextSize(textSize: number);
                    getInlineEventTimeEndTextSize(): number;;
                    setInlineEventTimeEndTextSize(textSize: number);
                    getInlineEventTimeStartTextColor(): number;;
                    setInlineEventTimeStartTextColor(color: number);
                    getInlineEventTimeEndTextColor(): number;;
                    setInlineEventTimeEndTextColor(color: number);

                    getInlineEventsBackgroundColor(): number;;
                    setInlineEventsBackgroundColor(color: number);

                    getPopupEventTitleTextSize(): number;;
                    setPopupEventTitleTextSize(textSize: number);
                    getPopupEventTimeTextSize(): number;;
                    setPopupEventTimeTextSize(textSize: number);
                    getPopupEventsWindowBackgroundColor(): number;;
                    setPopupEventsWindowBackgroundColor(color: number);

                    getTodayCellBorderWidth(): number;;
                    setTodayCellBorderWidth(width: number);
                    getTodayCellBorderColor(): number;;
                    setTodayCellBorderColor(color: number);
                    getTodayCellTypeFace(): android.graphics.Typeface;
                    setTodayCellTypeFace(typeface: android.graphics.Typeface);
                    getTodayCellTextColor(): number;;
                    setTodayCellTextColor(color: number);
                    getTodayCellSelectedTextColor(): number;;
                    setTodayCellSelectedTextColor(color: number);
                    getTodayCellBackgroundColor(): number;;
                    setTodayCellBackgroundColor(color: number);

                    getTodayTypeFace(): android.graphics.Typeface;
                    setTodayTypeFace(typeface: android.graphics.Typeface);
                    getTodayBackgroundColor(): number;;
                    setTodayBackgroundColor(color: number);
                    getTodayTextColor(): number;;
                    setTodayTextColor(color: number);

                    getDateCellPaddingHorizontal(): number;;
                    setDateCellPaddingHorizontal(padding: number);
                    getDateCellPaddingVertical(): number;;
                    setDateCellPaddingVertical(padding: number);
                    getDateCellBackgroundColorEnabled(): number;;
                    getDateCellBackgroundColorDisabled(): number;;
                    setDateCellBackgroundColor(colorEnabled: number, colorDisabled: number);

                    getDateTextColorEnabled(): number;
                    getDateTextColorDisabled(): number;
                    setDateTextColor(colorEnabled: number, colorDisabled: number);
                    getDateTextSize(): number;
                    setDateTextSize(size: number);
                    getDateTextPosition(): number;
                    setDateTextPosition(position: number);
                    getDateTypeFace(): android.graphics.Typeface;
                    setDateTypeFace(typeFace: android.graphics.Typeface);
                    getMonthCellPaddingHorizontal(): number;;
                    setMonthCellPaddingHorizontal(padding: number);
                    getMonthCellPaddingVertical(): number;;
                    setMonthCellPaddingVertical(padding: number);

                    getTitleTextPosition(): number;;
                    setTitleTextPosition(position: number);
                    getTitleTypeFace(): android.graphics.Typeface;
                    setTitleTypeFace(typeFace: android.graphics.Typeface);
                    getTitleTextSize(): number;;
                    setTitleTextSize(size: number);
                    getTitleBackgroundColor(): number;;
                    setTitleBackgroundColor(color: number);
                    getTitleTextColor(): number;;
                    setTitleTextColor(color: number);

                    getSelectedCellBackgroundColor(): number;;
                    setSelectedCellBackgroundColor(color: number);
                    getSelectedCellTextColor(): number;;
                    setSelectedCellTextColor(color: number);
                    getSelectedCellTypeFace(): android.graphics.Typeface;
                    setSelectedCellTypeFace(typeFace: android.graphics.Typeface);

                    getMonthNameTextColorEnabled(): number;
                    getMonthNameTextColorDisabled(): number;
                    setMonthNameTextColor(colorEnabled: number, colorDisabled: number);
                    getMonthNameTextSize(): number;
                    setMonthNameTextSize(size: number);
                    getMonthNameTextSizeCompact(): number;
                    setMonthNameTextSizeCompact(size: number);
                    getMonthNameTypeFace(): android.graphics.Typeface;
                    setMonthNameTypeFace(typeFace: android.graphics.Typeface);
                    getMonthNameTextPosition(): number;
                    setMonthNameTextPosition(position: number);

                    getWeekNumberTextColorEnabled(): number;
                    getWeekNumberTextColorDisabled(): number;
                    setWeekNumberTextColor(colorEnabled: number, colorDisabled: number);
                    getWeekNumberBackgroundColorEnabled(): number;
                    getWeekNumberBackgroundColorDisabled(): number;
                    setWeekNumberBackgroundColor(colorEnabled: number, colorDisabled: number);
                    getWeekNumberTextPosition(): number;
                    setWeekNumberTextPosition(position: number);
                    getWeekNumberTextSize(): number;
                    setWeekNumberTextSize(size: number);
                    getWeekNumberTypeFace(): android.graphics.Typeface;
                    setWeekNumberTypeFace(typeFace: android.graphics.Typeface);

                    getDayNameTextColor(): number;
                    setDayNameTextColor(color: number);
                    getDayNameBackgroundColor(): number;
                    setDayNameBackgroundColor(color: number);
                    getDayNameTextPosition(): number;
                    setDayNameTextPosition(position: number);
                    getDayNameTypeFace(): android.graphics.Typeface;
                    setDayNameTypeFace(typeFace: android.graphics.Typeface);
                    getDayNamePaddingHorizontal(): number;
                    getDayNamePaddingVertical(): number;
                    setDayNamePadding(horizontalPadding: number, verticalPadding: number);
                    getDayNameTextSize(): number;
                    setDayNameTextSize(size: number);
//YearMode
                    getDateTextColorYearModeEnabled(): number;
                    getDateTextColorYearModeDisabled(): number;
                    setDateTextColorYearMode(colorEnabled: number, colorDisabled: number);
                    getDateTextSizeYearMode(): number;
                    setDateTextSizeYearMode(size: number);
                    getDateTypeFaceYearMode(): android.graphics.Typeface;
                    setDateTypeFaceYearMode(typeFace: android.graphics.Typeface);

                    getDayNameTextColorYearModeEnabled(): number;
                    getDayNameTextColorYearModeDisabled(): number;
                    setDayNameTextColorYearMode(colorEnabled: number, colorDisabled: number);
                    getDayNameTextSizeYearMode(): number;
                    setDayNameTextSizeYearMode(size: number);
                    getDayNameTypefaceYearMode(): android.graphics.Typeface;
                    setDayNameTypefaceYearMode(typeFace: android.graphics.Typeface);

//Methods          
                    getDateValues(): Array<String>;
                    setDateValues(dateValues: Array<String>);

                    getStyle(): CalendarStyle;
                    setStyle(style: CalendarStyle);

                    getTitleCell(date: number, displayMode: CalendarDisplayMode): CalendarTextElement;
                    updateTitle(convertCell: CalendarTextElement, date: number, displayMode: CalendarDisplayMode);
                    updateDayNameCell(convertCell: CalendarCell, index: number);
                    getWeekNumberCell(): CalendarDayCell;
                    generateCalendarRow(): CalendarRow;
                    generateFragment(): CalendarFragment;
                    updateWeekNumberCellStyle(weekNumberCell: CalendarCell);
                    updateDateCellStyle(dateCell: CalendarDayCell);
                    updateDayNameCellStyle(dayNameCell: CalendarCell);
                    updateMonthCellStyle(monthCell: CalendarMonthCell);
                    updateWeekNumberCell(convertCell: CalendarCell, weekNumber: number);
                    updateDateCell(convertCell: CalendarDayCell, date: number, eventList: java.util.List<Event>, includeWeekNumber: boolean);
                    updateCalendarMonthCell(convertCell: CalendarMonthCell, date: number);
                    getDayNameCell(): CalendarCell;
                    getDayNameCell(index: number): CalendarDayCell;
                    getDateCell(): CalendarDayCell;
                    getMonthCell(): CalendarMonthCell;
                    reset();
                    applyProcedureToAllCells(procedure: com.telerik.android.common.Procedure<CalendarCell>);
                    applyProcedureToDateCells(procedure: com.telerik.android.common.Procedure<CalendarCell>);
                    applyProcedureToWeekNumberCells(procedure: com.telerik.android.common.Procedure<CalendarCell>);
                    applyProcedureToDayNameCells(procedure: com.telerik.android.common.Procedure<CalendarCell>);
                }

                class CalendarStyle {

                }

                class CalendarElement {

                }

                class CalendarTextElement extends CalendarElement {

                }

                class CalendarRow extends CalendarElement {

                }

                class CalendarFragment extends CalendarElement {

                }

                enum WeekNumbersDisplayMode {
                    None,
                    Inline,
                    Block
                }


                module RadCalendarView {
                    interface OnCellClickListener {
                        onCellClick(cell: CalendarCell);
                    }

                    class OnCellClickListener {
                        constructor(impl: OnCellClickListener);
                    }

                    interface OnDisplayDateChangedListener {
                        onDisplayDateChanged(oldDate: number, newDate: number);
                    }

                    class OnDisplayDateChangedListener {
                        constructor(impl: OnDisplayDateChangedListener);
                    }

                    interface OnDisplayModeChangedListener {
                        onDisplayModeChanged(oldValue: CalendarDisplayMode, newValue: CalendarDisplayMode);
                    }

                    class OnDisplayModeChangedListener {
                        constructor(impl: OnDisplayModeChangedListener);
                    }

                    interface OnSelectedDatesChangedListener {
                        onSelectedDatesChanged(context: SelectionContext);
                    }

                    class OnSelectedDatesChangedListener {
                        constructor(impl: OnSelectedDatesChangedListener);
                    }

                    class SelectionContext {
                        constructor();
                        datesAdded(): java.util.List<number>;
                        datesRemoved(): java.util.List<number>;
                        oldSelection(): java.util.List<number>;
                        newSelection(): java.util.List<number>;
                    }
                }

                class CalendarCell {
                    getDate(): number;
                    setDate(value: number);
                }

                class CalendarDayCell extends CalendarCell {

                }

                class CalendarMonthCell extends CalendarCell {

                }

                class RadCalendarView {
                    constructor(any);
                    setSelectionMode(mode: CalendarSelectionMode): void;
                    getSelectionMode(): CalendarSelectionMode;
                    setDisplayMode(mode: CalendarDisplayMode): void;
                    getDisplayMode(): CalendarDisplayMode;

                    setDisplayDate(date: number);
                    getDisplayDate(): number;

                    setSelectedDates(dates: java.util.List<number>);
                    getSelectedDates(): java.util.List<number>;

                    getSelectedRange(): DateRange;
                    setSelectedRange(value: DateRange);

                    setMaxDate(date: number);
                    getMaxDate(): number;

                    setMinDate(date: number);
                    getMinDate(): number;

                    setYearModeCompact(value: boolean);
                    isYearModeCompact(): boolean;

                    getEventAdapter(): events.EventAdapter;
                    shiftDate(forward: boolean): void;
                    invalidate(): void;
                    notifyDataChanged(): void;

                    setOnCellClickListener(listener: RadCalendarView.OnCellClickListener);
                    setOnDisplayDateChangedListener(listener: RadCalendarView.OnDisplayDateChangedListener);
                    setOnDisplayModeChangedListener(listener: RadCalendarView.OnDisplayModeChangedListener);
                    setOnSelectedDatesChangedListener(listener: RadCalendarView.OnSelectedDatesChangedListener);

                    getOnCellClickListener(): RadCalendarView.OnCellClickListener;
                }

                module events {
                    class EventAdapter {
                        constructor(any);
                        setEvents(any);
                        getEvents(): java.util.List<telerik.widget.calendar.events.Event>;
                        getEventsForDate(date: number): java.util.List<telerik.widget.calendar.events.Event>;
                        getRenderer(): EventRenderer;
                    }

                    class EventRenderer {
                        getEventTextSize(): number;
                        setEventTextSize(value: number);
                        setEventRenderMode(value: EventRenderMode);
                    }

                    class Event {
                        getStartDate(): number;
                        setStartDate(value: number);

                        getEndDate(): number;
                        setEndDate(value: number);

                        getTitle(): string;
                        setTitle(value: string);

                        isAllDay(): boolean;
                        setIsAllDay(value: boolean);

                        getEventColor(): number;
                        setEventColor(value: number);

                        constructor(title: string, start: number, end: number);
                    }

                    enum EventRenderMode {
                        Shape,
                        Text,
                        Shape_And_Text,
                        None
                    }

                    enum EventsDisplayMode {
                        Normal,
                        Inline,
                        Popup
                    }
                }

                enum CalendarDisplayMode {
                    Month,
                    Week,
                    Year
                }

                enum CalendarSelectionMode {
                    None,
                    Single,
                    Multiple,
                    Range
                }

                enum ScrollMode {
                    None,
                    Plain,
                    Sticky,
                    Free,
                    Combo,
                    Overlap,
                    Stack
                }

                class DateRange {
                    constructor(start: number, end: number);

                    getStart(): number;
                    setStart(value: number);

                    getEnd(): number;
                    setEnd(value: number);
                }
            }
        }
    }
}

declare module java {
    module lang {
        class Long {

        }
    }

    module util {
        class Calendar {
            constructor();
            static getInstance(): Calendar;
            set(property: number, value: number);
            set(property: number): number;
            setTimeInMillis(value: number);
            getTimeInMillis(): number;
            static MONTH: number;
        }

        class List<T>{
            constructor();
            Add(item: T);
            size(): number;
            get(index: number): T;
        }
    }
}
