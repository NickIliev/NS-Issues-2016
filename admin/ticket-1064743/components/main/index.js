'use strict';

app.main = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_main
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
goinbox: function() {
        window.location.href = "components/inbox/view.html;
    }
    // END_CUSTOM_CODE_main
    (function(parent) {
        var mainModel = kendo.observable({
            fields: {
                textField: '',
            },
            submit: function() {},
            cancel: function() {}
        });

        parent.set('mainModel', mainModel);
    })(app.main);

// START_CUSTOM_CODE_mainModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_mainModel