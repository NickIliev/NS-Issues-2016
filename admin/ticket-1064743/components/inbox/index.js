'use strict';

app.inbox = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_inbox
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_inbox
(function(parent) {
    var inboxModel = kendo.observable({
        fields: {
            textField1: '',
        },
        submit: function() {},
        cancel: function() {}
    });

    parent.set('inboxModel', inboxModel);
})(app.inbox);

// START_CUSTOM_CODE_inboxModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_inboxModel