var application = require("application");

var attr = application.android.foregroundActivity.getWindow().getAttributes(); 
console.dump(attr);

application.start({ moduleName: "main-page" });
