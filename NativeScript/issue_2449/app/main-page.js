function onNavigatingTo(args) {
    var page = args.object;

    var label = page.getViewById("lbl");
    label.text = "0001234"

    var tabView = page.getViewById("tabViewContainer");

    if(tabView._viewPager) {
        var tabListener = new android.view.View.OnTouchListener({
            onTouch: function (view, event) {
                view.getParent().requestDisallowInterceptTouchEvent(false);
            }
        });

        tabView._viewPager.setOnTouchListener(tabListener);
    }
}
exports.onNavigatingTo = onNavigatingTo;


