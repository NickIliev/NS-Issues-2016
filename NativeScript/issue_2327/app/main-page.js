var app = require("application");

function onNavigatingTo(args) {
    var page = args.object;

    var appContext = app.android.context;

    var tele = new teleListener();
    
    if(app.android) {
        var TelephonyMgr = appContext.getSystemService(android.content.Context.TELEPHONY_SERVICE);
        TelephonyMgr.listen(tele, android.telephony.PhoneStateListener.LISTEN_CALL_STATE);
    }
}
exports.onNavigatingTo = onNavigatingTo;


var teleListener = android.telephony.PhoneStateListener.extend({

        onCallStateChanged: function (state, incomingNumnber) {
            console.log("onCallStateChanged");
            console.log(state);
            console.log(incomingNumnber);
    }
})
