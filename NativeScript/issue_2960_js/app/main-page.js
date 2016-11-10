function onNavigatingTo(args) {
    var page = args.object;

    var activityindicator = page.getViewById("ai");
    var params = new android.widget.LinearLayout.LayoutParams(300, 10);
    activityindicator.android.setLayoutParams(params);
}
exports.onNavigatingTo = onNavigatingTo;