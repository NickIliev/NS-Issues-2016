'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    // additional requires
    viewModel = require('./dashboard-view-model')

// additional functions
function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;
    // additional pageLoaded

    if (isInit) {
        isInit = false;

        // additional pageInit
        helpers.pageInit(page);
    }
}

// START_CUSTOM_CODE_dashboard
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_dashboard
exports.pageLoaded = pageLoaded;