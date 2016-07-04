var createViewModel = require("./main-view-model").createViewModel;

function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
    
    var view = page.getViewById("view");
    view.animate({
        rotate: 180,
        duration: 3000
    });
}
exports.onNavigatingTo = onNavigatingTo;