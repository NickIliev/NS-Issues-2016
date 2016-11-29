'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    pageTitle: 'Dashboard',
    // additional properties
    myItems: [{title: 'Your profile is not complete!'}, {title: 'There are no active projects!'}]
});

// START_CUSTOM_CODE_dashboard
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_dashboard
module.exports = ViewModel;