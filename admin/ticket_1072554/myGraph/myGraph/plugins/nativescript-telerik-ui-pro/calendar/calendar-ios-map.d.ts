declare class TKCalendar extends TKView {
    static dateWithYearMonthDayWithCalendar(year: number, month: number, day: number, calendar: NSCalendar): Date;
    static isDateEqualToDateWithComponentsWithCalendar(date1: Date, date2: Date, components: NSCalendarUnit, calendar: NSCalendar): boolean;
    allowPinchZoom: boolean;
    calendar: NSCalendar;
    dataSource: TKCalendarDataSource;
    delegate: TKCalendarDelegate;
    displayedDate: Date;
    locale: NSLocale;
    maxDate: Date;
    minDate: Date;
    presenter: TKCalendarPresenter;
    selectedDate: Date;
    selectedDates: NSArray<any>;
    selectedDatesRange: TKDateRange;
    selectionMode: TKCalendarSelectionMode;
    theme: TKTheme;
    viewMode: TKCalendarViewMode;
    eventsForDate(date: Date): NSArray<any>;
    navigateBack(animated: boolean): void;
    navigateForward(animated: boolean): void;
    navigateToDateAnimated(date: Date, animated: boolean): void;
    reloadData(): void;
}

declare class TKCalendarCell extends UIView {
    static appearance(): TKCalendarCell; // inherited from UIAppearance
    static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarCell; // inherited from UIAppearance
    static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarCell; // inherited from UIAppearance
    static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarCell; // inherited from UIAppearance
    static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarCell; // inherited from UIAppearance
    static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarCell; // inherited from UIAppearance
    label: UILabel;
    owner: TKCalendar;
    applyStyleForState(state: number): void;
    initWithCoder(aDecoder: NSCoder): TKCalendarCell; // inherited from NSCoding
    initWithFrame(frame: CGRect): TKCalendarCell; // inherited from UIView
    self(): TKCalendarCell; // inherited from NSObjectProtocol
    style(): TKCalendarCellStyle;
    updateVisuals(): void;
}

declare const enum TKCalendarCellAlignment {
    Left = 1,
    Right = 2,
    Top = 4,
    Bottom = 8,
    HorizontalCenter = 16,
    VerticalCenter = 32
}

// declare const TKCalendarCellAlignmentBottom: number;

// declare const TKCalendarCellAlignmentHorizontalCenter: number;

// declare const TKCalendarCellAlignmentLeft: number;

// declare const TKCalendarCellAlignmentRight: number;

// declare const TKCalendarCellAlignmentTop: number;

// declare const TKCalendarCellAlignmentVerticalCenter: number;

declare class TKCalendarCellStyle extends TKStyleNode {
    backgroundColor: UIColor;
    bottomBorderColor: UIColor;
    bottomBorderWidth: number;
    leftBorderColor: UIColor;
    leftBorderWidth: number;
    rightBorderColor: UIColor;
    rightBorderWidth: number;
    shape: TKShape;
    shapeFill: TKFill;
    shapeStroke: TKStroke;
    textAlignment: TKCalendarCellAlignment;
    textColor: UIColor;
    textFont: UIFont;
    textInsets: UIEdgeInsets;
    topBorderColor: UIColor;
    topBorderWidth: number;
}

declare const enum TKCalendarCellType {
    Day = 0,
    DayName = 1,
    WeekNumber = 2,
    Title = 3,
    MonthName = 4,
    YearNumber = 5
}

// declare const TKCalendarCellTypeDay: number;

// declare const TKCalendarCellTypeDayName: number;

// declare const TKCalendarCellTypeMonthName: number;

// declare const TKCalendarCellTypeTitle: number;

// declare const TKCalendarCellTypeWeekNumber: number;

// declare const TKCalendarCellTypeYearNumber: number;

interface TKCalendarDataSource extends NSObjectProtocol {
    calendarEventsForDate?(calendar: TKCalendar, date: Date): NSArray<any>;
    calendarEventsFromDateToDateWithCallback?(calendar: TKCalendar, startDate: Date, endDate: Date, eventsCallback: (p1: NSArray<any>) => void): void;
}
declare var TKCalendarDataSource: any; /* Protocol */

declare class TKCalendarDayCell extends TKCalendarCell {
    date: Date;
    events: NSArray<any>;
    state: TKCalendarDayState;
    attachWithCalendarWithDate(owner: TKCalendar, date: Date): void;
    drawEventsRect(context: any, rect: CGRect): void;
    stateForDate(date: Date): TKCalendarDayState;
    style(): TKCalendarDayCellStyle;
    textAttributesForEvent(event: TKCalendarEventProtocol): NSDictionary<any, any>;
}

declare const enum TKCalendarDayCellEventOrientation {
    Horizontal = 1,
    Vertical = 2
}

// declare const TKCalendarDayCellEventOrientationHorizontal: number;

// declare const TKCalendarDayCellEventOrientationVertical: number;

declare class TKCalendarDayCellStyle extends TKCalendarCellStyle {
    allDayEventTextColor: UIColor;
    defaultSelectionColor: UIColor;
    displayEventsAsText: boolean;
    eventAlignment: TKCalendarCellAlignment;
    eventFont: UIFont;
    eventInsets: UIEdgeInsets;
    eventOrientation: TKCalendarDayCellEventOrientation;
    eventShape: TKShape;
    eventSpacing: number;
    eventTextColor: UIColor;
    maxEventsCount: number;
    stretchEvents: boolean;
    useDefaultSelectionStyle: boolean;
    wrapEventText: boolean;
}

declare class TKCalendarDayNameCell extends TKCalendarCell {
    attachWithCalendarWithDayOffset(owner: TKCalendar, index: number): void;
}

declare const enum TKCalendarDayState {
    Today = 1,
    Weekend = 2,
    CurrentMonth = 4,
    CurrentYear = 8,
    Selected = 16,
    FirstInSelection = 32,
    LastInSelection = 64,
    MidInSelection = 128,
    Disabled = 256
}

// declare const TKCalendarDayStateCurrentMonth: number;

// declare const TKCalendarDayStateCurrentYear: number;

// declare const TKCalendarDayStateDisabled: number;

// declare const TKCalendarDayStateFirstInSelection: number;

// declare const TKCalendarDayStateLastInSelection: number;

// declare const TKCalendarDayStateMidInSelection: number;

// declare const TKCalendarDayStateSelected: number;

// declare const TKCalendarDayStateToday: number;

// declare const TKCalendarDayStateWeekend: number;

declare class TKCalendarDefaultTheme extends TKTheme {
}

interface TKCalendarDelegate extends NSObjectProtocol {
    calendarDidChangedViewModeFromTo?(calendar: TKCalendar, previousViewMode: TKCalendarViewMode, viewMode: TKCalendarViewMode): void;
    calendarDidDeselectedDate?(calendar: TKCalendar, date: Date): void;
    calendarDidNavigateToDate?(calendar: TKCalendar, date: Date): void;
    calendarDidSelectDate?(calendar: TKCalendar, date: Date): void;
    calendarShapeForEvent?(calendar: TKCalendar, event: TKCalendarEventProtocol): TKShape;
    calendarShouldSelectDate?(calendar: TKCalendar, date: Date): boolean;
    calendarUpdateVisualsForCell?(calendar: TKCalendar, cell: TKCalendarCell): void;
    calendarViewForCellOfKind?(calendar: TKCalendar, cellType: TKCalendarCellType): TKCalendarCell;
    calendarWillNavigateToDate?(calendar: TKCalendar, date: Date): void;
}
declare var TKCalendarDelegate: any; /* Protocol */

declare class TKCalendarEvent extends NSObject implements TKCalendarEventProtocol {
    static alloc(): TKCalendarEvent; // inherited from NSObject
    static new(): TKCalendarEvent; // inherited from NSObject
    allDay: boolean; // inherited from TKCalendarEventProtocol
    content: string;
    endDate: Date; // inherited from TKCalendarEventProtocol
    eventColor: UIColor; // inherited from TKCalendarEventProtocol
    location: string;
    startDate: Date; // inherited from TKCalendarEventProtocol
    title: string; // inherited from TKCalendarEventProtocol
    init(): TKCalendarEvent; // inherited from NSObject
    self(): TKCalendarEvent; // inherited from NSObjectProtocol
}

declare class TKCalendarEventKitDataSource extends NSObject implements TKCalendarDataSource {
    static alloc(): TKCalendarEventKitDataSource; // inherited from NSObject
    static new(): TKCalendarEventKitDataSource; // inherited from NSObject
    calendars: NSArray<any>;
    delegate: TKCalendarEventKitDataSourceDelegate;
    calendarEventsForDate(calendar: TKCalendar, date: Date): NSArray<any>; // inherited from TKCalendarDataSource
    calendarEventsFromDateToDateWithCallback(calendar: TKCalendar, startDate: Date, endDate: Date, eventsCallback: (p1: NSArray<any>) => void): void; // inherited from TKCalendarDataSource
    createCalendarEventInCalendar(event: EKEvent, calendar: EKCalendar): TKCalendarEventProtocol;
    getCalendarsWithBlock(callbackBlock: (p1: NSArray<any>) => void): void;
    init(): TKCalendarEventKitDataSource; // inherited from NSObject
    self(): TKCalendarEventKitDataSource; // inherited from NSObjectProtocol
}

interface TKCalendarEventKitDataSourceDelegate extends NSObjectProtocol {
    shouldImportEvent?(event: EKEvent): boolean;
    shouldImportEventsFromCalendar?(calendar: EKCalendar): boolean;
}
declare var TKCalendarEventKitDataSourceDelegate: any; /* Protocol */

interface TKCalendarEventProtocol extends NSObjectProtocol {
    allDay: boolean;
    endDate: Date;
    eventColor: UIColor;
    startDate: Date;
    title: string;
}
declare var TKCalendarEventProtocol: any; /* Protocol */

declare class TKCalendarFlowPresenter extends UIView implements TKCalendarPresenter {
    static appearance(): TKCalendarFlowPresenter; // inherited from UIAppearance
    static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarFlowPresenter; // inherited from UIAppearance
    static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarFlowPresenter; // inherited from UIAppearance
    static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarFlowPresenter; // inherited from UIAppearance
    static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarFlowPresenter; // inherited from UIAppearance
    static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarFlowPresenter; // inherited from UIAppearance
    collectionView: UICollectionView;
    dateFromPoint(pt: CGPoint): Date; // inherited from TKCalendarPresenter
    initWithCoder(aDecoder: NSCoder): TKCalendarFlowPresenter; // inherited from NSCoding
    initWithFrame(frame: CGRect): TKCalendarFlowPresenter; // inherited from UIView
    navigateBack(animated: boolean): boolean; // inherited from TKCalendarPresenter
    navigateForward(animated: boolean): boolean; // inherited from TKCalendarPresenter
    navigateToDateAnimated(date: Date, animated: boolean): void; // inherited from TKCalendarPresenter
    self(): TKCalendarFlowPresenter; // inherited from NSObjectProtocol
    update(reset: boolean): void; // inherited from TKCalendarPresenter
    updateState(lastSelected: Date): void; // inherited from TKCalendarPresenter
}

declare class TKCalendarIPadTheme extends TKTheme {
}

declare const enum TKCalendarInlineEventsViewMode {
    None = 0,
    Inline = 1,
    Popover = 2
}

// declare const TKCalendarInlineEventsViewModeInline: number;

// declare const TKCalendarInlineEventsViewModeNone: number;

// declare const TKCalendarInlineEventsViewModePopover: number;

declare class TKCalendarInlineView extends TKView implements UITableViewDataSource, UITableViewDelegate {
    dayCell: TKCalendarDayCell;
    debugDescription: string; // inherited from NSObjectProtocol
    description: string; // inherited from NSObjectProtocol
    desiredWidthInPopoverMode: number;
    fixedHeight: boolean;
    hash: number; // inherited from NSObjectProtocol
    maxHeight: number;
    owner: TKCalendarMonthPresenter;
    rowHeight: number;
    superclass: typeof NSObject; // inherited from NSObjectProtocol
    tableView: UITableView;
    class(): typeof NSObject; // inherited from NSObjectProtocol
    conformsToProtocol(aProtocol: any /* Protocol */): boolean; // inherited from NSObjectProtocol
    indexPathForPreferredFocusedViewInTableView(tableView: UITableView): NSIndexPath; // inherited from UITableViewDelegate
    isEqual(object: any): boolean; // inherited from NSObjectProtocol
    isKindOfClass(aClass: typeof NSObject): boolean; // inherited from NSObjectProtocol
    isMemberOfClass(aClass: typeof NSObject): boolean; // inherited from NSObjectProtocol
    isProxy(): boolean; // inherited from NSObjectProtocol
    numberOfSectionsInTableView(tableView: UITableView): number; // inherited from UITableViewDataSource
    performSelector(aSelector: string): any; // inherited from NSObjectProtocol
    performSelectorWithObject(aSelector: string, object: any): any; // inherited from NSObjectProtocol
    performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any; // inherited from NSObjectProtocol
    respondsToSelector(aSelector: string): boolean; // inherited from NSObjectProtocol
    retainCount(): number; // inherited from NSObjectProtocol
    scrollViewDidEndDecelerating(scrollView: UIScrollView): void; // inherited from UIScrollViewDelegate
    scrollViewDidEndDraggingWillDecelerate(scrollView: UIScrollView, decelerate: boolean): void; // inherited from UIScrollViewDelegate
    scrollViewDidEndScrollingAnimation(scrollView: UIScrollView): void; // inherited from UIScrollViewDelegate
    scrollViewDidEndZoomingWithViewAtScale(scrollView: UIScrollView, view: UIView, scale: number): void; // inherited from UIScrollViewDelegate
    scrollViewDidScroll(scrollView: UIScrollView): void; // inherited from UIScrollViewDelegate
    scrollViewDidScrollToTop(scrollView: UIScrollView): void; // inherited from UIScrollViewDelegate
    scrollViewDidZoom(scrollView: UIScrollView): void; // inherited from UIScrollViewDelegate
    scrollViewShouldScrollToTop(scrollView: UIScrollView): boolean; // inherited from UIScrollViewDelegate
    scrollViewWillBeginDecelerating(scrollView: UIScrollView): void; // inherited from UIScrollViewDelegate
    scrollViewWillBeginDragging(scrollView: UIScrollView): void; // inherited from UIScrollViewDelegate
    scrollViewWillBeginZoomingWithView(scrollView: UIScrollView, view: UIView): void; // inherited from UIScrollViewDelegate
    scrollViewWillEndDraggingWithVelocityTargetContentOffset(scrollView: UIScrollView, velocity: CGPoint, targetContentOffset: interop.Reference<CGPoint>): void; // inherited from UIScrollViewDelegate
    sectionIndexTitlesForTableView(tableView: UITableView): NSArray<string>; // inherited from UITableViewDataSource
    self(): TKCalendarInlineView; // inherited from NSObjectProtocol
    tableViewAccessoryButtonTappedForRowWithIndexPath(tableView: UITableView, indexPath: NSIndexPath): void; // inherited from UITableViewDelegate
    tableViewAccessoryTypeForRowWithIndexPath(tableView: UITableView, indexPath: NSIndexPath): UITableViewCellAccessoryType; // inherited from UITableViewDelegate
    tableViewCanEditRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean; // inherited from UITableViewDataSource
    tableViewCanFocusRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean; // inherited from UITableViewDelegate
    tableViewCanMoveRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean; // inherited from UITableViewDataSource
    tableViewCanPerformActionForRowAtIndexPathWithSender(tableView: UITableView, action: string, indexPath: NSIndexPath, sender: any): boolean; // inherited from UITableViewDelegate
    tableViewCellForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): UITableViewCell; // inherited from UITableViewDataSource
    tableViewCommitEditingStyleForRowAtIndexPath(tableView: UITableView, editingStyle: UITableViewCellEditingStyle, indexPath: NSIndexPath): void; // inherited from UITableViewDataSource
    tableViewDidDeselectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void; // inherited from UITableViewDelegate
    tableViewDidEndDisplayingCellForRowAtIndexPath(tableView: UITableView, cell: UITableViewCell, indexPath: NSIndexPath): void; // inherited from UITableViewDelegate
    tableViewDidEndDisplayingFooterViewForSection(tableView: UITableView, view: UIView, section: number): void; // inherited from UITableViewDelegate
    tableViewDidEndDisplayingHeaderViewForSection(tableView: UITableView, view: UIView, section: number): void; // inherited from UITableViewDelegate
    tableViewDidEndEditingRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void; // inherited from UITableViewDelegate
    tableViewDidHighlightRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void; // inherited from UITableViewDelegate
    tableViewDidSelectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void; // inherited from UITableViewDelegate
    tableViewDidUnhighlightRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void; // inherited from UITableViewDelegate
    tableViewDidUpdateFocusInContextWithAnimationCoordinator(tableView: UITableView, context: UITableViewFocusUpdateContext, coordinator: UIFocusAnimationCoordinator): void; // inherited from UITableViewDelegate
    tableViewEditActionsForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): NSArray<UITableViewRowAction>; // inherited from UITableViewDelegate
    tableViewEditingStyleForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): UITableViewCellEditingStyle; // inherited from UITableViewDelegate
    tableViewEstimatedHeightForFooterInSection(tableView: UITableView, section: number): number; // inherited from UITableViewDelegate
    tableViewEstimatedHeightForHeaderInSection(tableView: UITableView, section: number): number; // inherited from UITableViewDelegate
    tableViewEstimatedHeightForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): number; // inherited from UITableViewDelegate
    tableViewHeightForFooterInSection(tableView: UITableView, section: number): number; // inherited from UITableViewDelegate
    tableViewHeightForHeaderInSection(tableView: UITableView, section: number): number; // inherited from UITableViewDelegate
    tableViewHeightForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): number; // inherited from UITableViewDelegate
    tableViewIndentationLevelForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): number; // inherited from UITableViewDelegate
    tableViewMoveRowAtIndexPathToIndexPath(tableView: UITableView, sourceIndexPath: NSIndexPath, destinationIndexPath: NSIndexPath): void; // inherited from UITableViewDataSource
    tableViewNumberOfRowsInSection(tableView: UITableView, section: number): number; // inherited from UITableViewDataSource
    tableViewPerformActionForRowAtIndexPathWithSender(tableView: UITableView, action: string, indexPath: NSIndexPath, sender: any): void; // inherited from UITableViewDelegate
    tableViewSectionForSectionIndexTitleAtIndex(tableView: UITableView, title: string, index: number): number; // inherited from UITableViewDataSource
    tableViewShouldHighlightRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean; // inherited from UITableViewDelegate
    tableViewShouldIndentWhileEditingRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean; // inherited from UITableViewDelegate
    tableViewShouldShowMenuForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean; // inherited from UITableViewDelegate
    tableViewShouldUpdateFocusInContext(tableView: UITableView, context: UITableViewFocusUpdateContext): boolean; // inherited from UITableViewDelegate
    tableViewTargetIndexPathForMoveFromRowAtIndexPathToProposedIndexPath(tableView: UITableView, sourceIndexPath: NSIndexPath, proposedDestinationIndexPath: NSIndexPath): NSIndexPath; // inherited from UITableViewDelegate
    tableViewTitleForDeleteConfirmationButtonForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): string; // inherited from UITableViewDelegate
    tableViewTitleForFooterInSection(tableView: UITableView, section: number): string; // inherited from UITableViewDataSource
    tableViewTitleForHeaderInSection(tableView: UITableView, section: number): string; // inherited from UITableViewDataSource
    tableViewViewForFooterInSection(tableView: UITableView, section: number): UIView; // inherited from UITableViewDelegate
    tableViewViewForHeaderInSection(tableView: UITableView, section: number): UIView; // inherited from UITableViewDelegate
    tableViewWillBeginEditingRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void; // inherited from UITableViewDelegate
    tableViewWillDeselectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): NSIndexPath; // inherited from UITableViewDelegate
    tableViewWillDisplayCellForRowAtIndexPath(tableView: UITableView, cell: UITableViewCell, indexPath: NSIndexPath): void; // inherited from UITableViewDelegate
    tableViewWillDisplayFooterViewForSection(tableView: UITableView, view: UIView, section: number): void; // inherited from UITableViewDelegate
    tableViewWillDisplayHeaderViewForSection(tableView: UITableView, view: UIView, section: number): void; // inherited from UITableViewDelegate
    tableViewWillSelectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): NSIndexPath; // inherited from UITableViewDelegate
    viewForZoomingInScrollView(scrollView: UIScrollView): UIView; // inherited from UIScrollViewDelegate
}

declare class TKCalendarInlineViewTableViewCell extends UITableViewCell {
    style: TKCalendarInlineViewTableViewCellStyle;
    attachWithCellEventIndex(cell: TKCalendarDayCell, index: number): void;
    initWithCoder(aDecoder: NSCoder): TKCalendarInlineViewTableViewCell; // inherited from NSCoding
    initWithFrameReuseIdentifier(frame: CGRect, reuseIdentifier: string): TKCalendarInlineViewTableViewCell; // inherited from UITableViewCell
    initWithStyleReuseIdentifier(style: UITableViewCellStyle, reuseIdentifier: string): TKCalendarInlineViewTableViewCell; // inherited from UITableViewCell
    self(): TKCalendarInlineViewTableViewCell; // inherited from NSObjectProtocol
    updateTextForEventWithCell(event: TKCalendarEventProtocol, cell: TKCalendarDayCell): void;
}

declare class TKCalendarInlineViewTableViewCellStyle extends TKStyleNode {
    backgroundColor: UIColor;
    eventColor: UIColor;
    eventFont: UIFont;
    separatorColor: UIColor;
    shapeSize: CGSize;
    timeColor: UIColor;
    timeFont: UIFont;
}

declare class TKCalendarMonthCell extends UICollectionViewCell {
    monthView: TKCalendarMonthView;
    attachWithCalendarPresenterWithYearAndMonth(owner: TKCalendar, presenter: TKCalendarYearPresenter, year: number, month: number): void;
}

declare class TKCalendarMonthNameCell extends TKCalendarCell {
    date: Date;
    state: TKCalendarMonthNameState;
    attachWithCalendarWithDate(owner: TKCalendar, date: Date): void;
}

declare const enum TKCalendarMonthNameState {
    Selected = 1,
    Disabled = 2
}

// declare const TKCalendarMonthNameStateDisabled: number;

// declare const TKCalendarMonthNameStateSelected: number;

declare class TKCalendarMonthNamesPresenter extends TKCalendarPresenterBase {
    columns: number;
    contentView: UIView;
    self(): TKCalendarMonthNamesPresenter; // inherited from NSObjectProtocol
}

declare class TKCalendarMonthPresenter extends TKCalendarPresenterBase {
    contentView: UIView;
    dayNamesHidden: boolean;
    equalWeekNumber: boolean;
    headerIsSticky: boolean;
    headerView: UIView;
    inlineEventsView: TKCalendarInlineView;
    inlineEventsViewMode: TKCalendarInlineEventsViewMode;
    owner: TKCalendar;
    style: TKCalendarMonthPresenterStyle;
    titleHidden: boolean;
    weekNumbersHidden: boolean;
    weekendsHidden: boolean;
    cellForDate(date: Date): TKCalendarDayCell;
    createCellWithType(cellType: TKCalendarCellType): TKCalendarCell;
    dateForRowCol(row: number, col: number): Date;
    hideInlineEvents(animated: boolean): void;
    self(): TKCalendarMonthPresenter; // inherited from NSObjectProtocol
    showInlineEventsForCellAnimated(cell: TKCalendarDayCell, animated: boolean): void;
    updateInlineView(): void;
}

interface TKCalendarMonthPresenterDelegate extends TKCalendarPresenterDelegate {
    monthPresenterInlineEventSelected?(presenter: TKCalendarMonthPresenter, event: TKCalendarEventProtocol): void;
    monthPresenterInlineEventsViewDidHideForCell?(presenter: TKCalendarMonthPresenter, cell: TKCalendarDayCell): void;
    monthPresenterInlineEventsViewDidShowForCell?(presenter: TKCalendarMonthPresenter, cell: TKCalendarDayCell): void;
    monthPresenterUpdateVisualsForInlineEventCell?(presenter: TKCalendarMonthPresenter, cell: TKCalendarInlineViewTableViewCell): void;
}
declare var TKCalendarMonthPresenterDelegate: any; /* Protocol */

declare class TKCalendarMonthPresenterStyle extends TKStyleNode {
    backgroundColor: UIColor;
    columnSpacing: number;
    dayNameCellHeight: number;
    dayNameTextEffect: TKCalendarTextEffect;
    monthNameTextEffect: TKCalendarTextEffect;
    rowSpacing: number;
    titleCellHeight: number;
    weekNumberCellWidth: number;
}

declare class TKCalendarMonthTitleCell extends TKCalendarTitleCell {
    layoutMode: TKCalendarMonthTitleCellLayoutMode;
    nextMonthButton: UIButton;
    nextYearButton: UIButton;
    previousMonthButton: UIButton;
    previousYearButton: UIButton;
    yearLabel: UILabel;
}

declare const enum TKCalendarMonthTitleCellLayoutMode {
    Month = 0,
    MonthWithButtons = 1,
    MonthAndYearWithButtons = 2
}

// declare const TKCalendarMonthTitleCellLayoutModeMonth: number;

// declare const TKCalendarMonthTitleCellLayoutModeMonthAndYearWithButtons: number;

// declare const TKCalendarMonthTitleCellLayoutModeMonthWithButtons: number;

declare class TKCalendarMonthView extends UIView {
    static appearance(): TKCalendarMonthView; // inherited from UIAppearance
    static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarMonthView; // inherited from UIAppearance
    static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarMonthView; // inherited from UIAppearance
    static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarMonthView; // inherited from UIAppearance
    static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarMonthView; // inherited from UIAppearance
    static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarMonthView; // inherited from UIAppearance
    date: Date;
    attachWithCalendarPresenterWithYearAndMonth(owner: TKCalendar, presenter: TKCalendarYearPresenter, year: number, month: number): void;
    initWithCoder(aDecoder: NSCoder): TKCalendarMonthView; // inherited from NSCoding
    initWithFrame(frame: CGRect): TKCalendarMonthView; // inherited from UIView
    self(): TKCalendarMonthView; // inherited from NSObjectProtocol
}

declare class TKCalendarMonthViewController extends UIViewController {
    contentView: TKCalendar;
    todayButton: UIBarButtonItem;
    initWithCoder(aDecoder: NSCoder): TKCalendarMonthViewController; // inherited from NSCoding
    initWithNibNameBundle(nibNameOrNil: string, nibBundleOrNil: NSBundle): TKCalendarMonthViewController; // inherited from UIViewController
    self(): TKCalendarMonthViewController; // inherited from NSObjectProtocol
}

declare class TKCalendarNavigationController extends UINavigationController {
    initWithNavigationBarClassToolbarClass(navigationBarClass: typeof NSObject, toolbarClass: typeof NSObject): TKCalendarNavigationController; // inherited from UINavigationController
    initWithRootViewController(rootViewController: UIViewController): TKCalendarNavigationController; // inherited from UINavigationController
}

interface TKCalendarPresenter extends NSObjectProtocol {
    dateFromPoint(pt: CGPoint): Date;
    navigateBack(animated: boolean): boolean;
    navigateForward(animated: boolean): boolean;
    navigateToDateAnimated(date: Date, animated: boolean): void;
    update(reset: boolean): void;
    updateState(lastSelected: Date): void;
}
declare var TKCalendarPresenter: any; /* Protocol */

declare class TKCalendarPresenterBase extends UIView implements TKCalendarPresenter {
    static appearance(): TKCalendarPresenterBase; // inherited from UIAppearance
    static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarPresenterBase; // inherited from UIAppearance
    static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarPresenterBase; // inherited from UIAppearance
    static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarPresenterBase; // inherited from UIAppearance
    static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarPresenterBase; // inherited from UIAppearance
    static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarPresenterBase; // inherited from UIAppearance
    delegate: TKCalendarPresenterDelegate;
    panGestureSensitivity: number;
    transitionDuration: number;
    transitionIsReverse: boolean;
    transitionIsVertical: boolean;
    transitionMode: TKCalendarTransitionMode;
    dateFromPoint(pt: CGPoint): Date; // inherited from TKCalendarPresenter
    initWithCoder(aDecoder: NSCoder): TKCalendarPresenterBase; // inherited from NSCoding
    initWithFrame(frame: CGRect): TKCalendarPresenterBase; // inherited from UIView
    navigateBack(animated: boolean): boolean; // inherited from TKCalendarPresenter
    navigateForward(animated: boolean): boolean; // inherited from TKCalendarPresenter
    navigateToDateAnimated(date: Date, animated: boolean): void; // inherited from TKCalendarPresenter
    self(): TKCalendarPresenterBase; // inherited from NSObjectProtocol
    update(reset: boolean): void; // inherited from TKCalendarPresenter
    updateState(lastSelected: Date): void; // inherited from TKCalendarPresenter
}

interface TKCalendarPresenterDelegate extends NSObjectProtocol {
    presenterBeginTransition?(presenter: TKCalendarPresenter, transition: TKViewTransition): void;
    presenterFinishTransition?(presenter: TKCalendarPresenter, canceled: boolean): void;
}
declare var TKCalendarPresenterDelegate: any; /* Protocol */

declare const enum TKCalendarSelectionMode {
    None = 0,
    Single = 1,
    Multiple = 2,
    Range = 3
}

// declare const TKCalendarSelectionModeMultiple: number;

// declare const TKCalendarSelectionModeNone: number;

// declare const TKCalendarSelectionModeRange: number;

// declare const TKCalendarSelectionModeSingle: number;

declare const enum TKCalendarTextEffect {
    None = 0,
    Uppercase = 1,
    Lowercase = 2
}

// declare const TKCalendarTextEffectLowercase: number;

// declare const TKCalendarTextEffectNone: number;

// declare const TKCalendarTextEffectUppercase: number;

declare class TKCalendarTitleCell extends TKCalendarCell {
    attachWithCalendarWithText(owner: TKCalendar, text: string): void;
}

declare const enum TKCalendarTransitionMode {
    None = 0,
    Flip = 1,
    Fold = 2,
    Float = 3,
    Card = 4,
    Rotate = 5,
    Scroll = 6
}

// declare const TKCalendarTransitionModeCard: number;

// declare const TKCalendarTransitionModeFlip: number;

// declare const TKCalendarTransitionModeFloat: number;

// declare const TKCalendarTransitionModeFold: number;

// declare const TKCalendarTransitionModeNone: number;

// declare const TKCalendarTransitionModeRotate: number;

// declare const TKCalendarTransitionModeScroll: number;

declare const enum TKCalendarViewMode {
    Week = 0,
    Month = 1,
    MonthNames = 2,
    Year = 3,
    YearNumbers = 4,
    Flow = 5
}

// declare const TKCalendarViewModeFlow: number;

// declare const TKCalendarViewModeMonth: number;

// declare const TKCalendarViewModeMonthNames: number;

// declare const TKCalendarViewModeWeek: number;

// declare const TKCalendarViewModeYear: number;

// declare const TKCalendarViewModeYearNumbers: number;

declare class TKCalendarWeekNumberCell extends TKCalendarCell {
    attachWithCalendarWithWeekNumber(owner: TKCalendar, weekNumber: number): void;
}

declare class TKCalendarWeekPresenter extends TKCalendarMonthPresenter {
}

declare class TKCalendarYearNumberCell extends TKCalendarCell {
    date: Date;
    state: TKCalendarYearNumberState;
    attachWithCalendarWithDate(owner: TKCalendar, date: Date): void;
}

declare const enum TKCalendarYearNumberState {
    Selected = 1,
    Disabled = 2
}

// declare const TKCalendarYearNumberStateDisabled: number;

// declare const TKCalendarYearNumberStateSelected: number;

declare class TKCalendarYearNumbersPresenter extends TKCalendarPresenterBase {
    columns: number;
    rows: number;
    self(): TKCalendarYearNumbersPresenter; // inherited from NSObjectProtocol
}

declare class TKCalendarYearPresenter extends UIView implements TKCalendarPresenter {
    static appearance(): TKCalendarYearPresenter; // inherited from UIAppearance
    static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarYearPresenter; // inherited from UIAppearance
    static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarYearPresenter; // inherited from UIAppearance
    static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarYearPresenter; // inherited from UIAppearance
    static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarYearPresenter; // inherited from UIAppearance
    static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarYearPresenter; // inherited from UIAppearance
    collectionView: UICollectionView;
    columns: number;
    monthCellClass: typeof NSObject;
    style: TKCalendarYearPresenterStyle;
    titleViewClass: typeof NSObject;
    dateFromPoint(pt: CGPoint): Date; // inherited from TKCalendarPresenter
    initWithCoder(aDecoder: NSCoder): TKCalendarYearPresenter; // inherited from NSCoding
    initWithFrame(frame: CGRect): TKCalendarYearPresenter; // inherited from UIView
    navigateBack(animated: boolean): boolean; // inherited from TKCalendarPresenter
    navigateForward(animated: boolean): boolean; // inherited from TKCalendarPresenter
    navigateToDateAnimated(date: Date, animated: boolean): void; // inherited from TKCalendarPresenter
    self(): TKCalendarYearPresenter; // inherited from NSObjectProtocol
    update(reset: boolean): void; // inherited from TKCalendarPresenter
    updateState(lastSelected: Date): void; // inherited from TKCalendarPresenter
}

declare class TKCalendarYearPresenterStyle extends TKStyleNode {
    dayFont: UIFont;
    dayNameFont: UIFont;
    dayNameTextColor: UIColor;
    dayNameTextEffect: TKCalendarTextEffect;
    dayTextColor: UIColor;
    monthNameFont: UIFont;
    monthNameTextAlignment: NSTextAlignment;
    monthNameTextColor: UIColor;
    monthNameTextEffect: TKCalendarTextEffect;
    monthsPerPage: number;
    todayShape: TKShape;
    todayShapeFill: TKFill;
    todayShapeStroke: TKStroke;
    todayTextColor: UIColor;
    weekendTextColor: UIColor;
}

declare class TKCalendarYearTitleView extends UICollectionReusableView {
    view: TKCalendarTitleCell;
    attachWithCalendarWithText(owner: TKCalendar, text: string): void;
}

declare class TKCalendarYearViewController extends UIViewController implements TKCalendarDelegate {
    contentView: TKCalendar;
    delegate: TKCalendarYearViewControllerDelegate;
    selectedItemRect: CGRect;
    todayButton: UIBarButtonItem;
    calendarDidChangedViewModeFromTo(calendar: TKCalendar, previousViewMode: TKCalendarViewMode, viewMode: TKCalendarViewMode): void; // inherited from TKCalendarDelegate
    calendarDidDeselectedDate(calendar: TKCalendar, date: Date): void; // inherited from TKCalendarDelegate
    calendarDidNavigateToDate(calendar: TKCalendar, date: Date): void; // inherited from TKCalendarDelegate
    calendarDidSelectDate(calendar: TKCalendar, date: Date): void; // inherited from TKCalendarDelegate
    calendarShapeForEvent(calendar: TKCalendar, event: TKCalendarEventProtocol): TKShape; // inherited from TKCalendarDelegate
    calendarShouldSelectDate(calendar: TKCalendar, date: Date): boolean; // inherited from TKCalendarDelegate
    calendarUpdateVisualsForCell(calendar: TKCalendar, cell: TKCalendarCell): void; // inherited from TKCalendarDelegate
    calendarViewForCellOfKind(calendar: TKCalendar, cellType: TKCalendarCellType): TKCalendarCell; // inherited from TKCalendarDelegate
    calendarWillNavigateToDate(calendar: TKCalendar, date: Date): void; // inherited from TKCalendarDelegate
    initWithCoder(aDecoder: NSCoder): TKCalendarYearViewController; // inherited from NSCoding
    initWithNibNameBundle(nibNameOrNil: string, nibBundleOrNil: NSBundle): TKCalendarYearViewController; // inherited from UIViewController
    self(): TKCalendarYearViewController; // inherited from NSObjectProtocol
}

interface TKCalendarYearViewControllerDelegate extends NSObjectProtocol {
    navigatedToMonthViewController(monthViewController: TKCalendarMonthViewController): void;
}
declare var TKCalendarYearViewControllerDelegate: any; /* Protocol */


// ////////////////////////////////////////////////
// //native api declarations
// declare class NSObject {
//     static new() : NSObject;
// }

// declare class NSDate{
// 	static new() : NSDate; 
// 	static dateWithTimeIntervalSince1970(seconds : number) : NSDate;
// 	timeIntervalSince1970 : number;
// }

// declare class NSLocale{
// 	static new() : NSLocale;
// }

// declare class TKCalendar{
// 	delegate : any;
// 	displayedDate : NSDate;
// 	dataSource : any;
// 	locale : NSLocale;
// 	maxDate : NSDate;
// 	minDate : NSDate;
// 	selectedDate : NSDate;
// 	selectedDates : NSArray;
// 	selectedDatesRange : TKDateRange;
// 	selectionMode : TKCalendarSelectionMode;
// 	viewMode : TKCalendarViewMode;
	
// 	eventsForDate(date : NSDate) : NSArray;
// 	navigateBack(animated : boolean) : void;
// 	navigateForwards(animated : boolean) : void;
// 	navigateToDate(date : NSDate, animated : boolean) : void;
// 	reloadData() : void;
	
// 	alloc() : any;
// }

// declare enum TKCalendarViewMode{
// 	TKCalendarViewModeWeek,
//    	TKCalendarViewModeMonth,
//    	TKCalendarViewModeMonthNames,
//    	TKCalendarViewModeYear,
//    	TKCalendarViewModeYearNumbers,
//    	TKCalendarViewModeFlow
// }

// declare enum TKCalendarSelectionMode{
// 	TKCalendarSelectionModeNone,
//    	TKCalendarSelectionModeSingle,
//    	TKCalendarSelectionModeMultiple,
//    	TKCalendarSelectionModeRange
// }

// declare class TKCalendarDelegate{
// 	static new() : TKCalendarDelegate;
// 	calendarDidChangedViewModeFromTo(calendar: TKCalendar, previousViewMode: TKCalendarViewMode, viewMode: TKCalendarViewMode) : void;
// 	calendarDidDeselectedDate(calendar: TKCalendar, date: NSDate) : void;
// 	calendarDidNavigateToDate(calendar: TKCalendar, date: NSDate) : void;
// 	calendarDidSelectDate(calendar: TKCalendar, date: NSDate) : void;
// 	// calendarShapeForEvent(calendar: TKCalendar, event: any) : TKShape;
// 	calendarShouldSelectDate(calendar: TKCalendar, date: NSDate) : boolean;
// 	// calendarUpdateVisualsForCell(calendar: TKCalendar, cell: TKCalendarCell) : void;
// 	// calendarViewForCellOfKind(calendar: TKCalendar, cellType: TKCalendarCellType) : TKCalendarCell;
// 	calendarWillNavigateToDate(calendar: TKCalendar, date: NSDate);
// }

// declare class TKCalendarDataSource{
// 	public calendarEventsForDate(calendar : TKCalendar, date : NSDate) : NSArray;
// 	public calendarEventsFromDateToDateWithCallback(calendar : TKCalendar, fromDate : NSDate, toDate : NSDate, callback: void) : NSArray;	
// }

// declare class TKDateRange{
// 	static initWithStartEnd(start : NSDate, end: NSDate) : TKDateRange;
// }

// declare class TKCalendarEvent {
// 	allDay : boolean;
// 	startDate : NSDate;
// 	endDate : NSDate;
// 	title : string;
// 	content : string;
// 	eventColor : UIColor;
// 	location : string;
// 	static new() : TKCalendarEvent;
// }

// ////////////////////////////////////