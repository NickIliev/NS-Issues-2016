function onNavigatingTo(args) {
    var page = args.object;
    
    var tabView = view.getViewById(page, "tabView");
    var tabTitle = tabView._getAndroidTabView().getTextViewForItemAt(1);
    tabTitle.setMaxLines(1);  //<= that's the (wrong) secret 😄 

}
exports.onNavigatingTo = onNavigatingTo;