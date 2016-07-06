var application = require("application");

function onNavigatingTo(args) {
    var page = args.object;

    var httpUrlString = "http://www.easychair.org/publications/easychair.docx";

    var uri = android.net.Uri.parse(httpUrlString);
    var extension = android.webkit.MimeTypeMap.getFileExtensionFromUrl(uri.toString());
    var mimetype = android.webkit.MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);

    var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW);
    intent.setFlags(android.content.Intent.FLAG_ACTIVITY_NO_HISTORY);

    // if (extension === "" || mimetype == null) {
    //     // if there is no extension or there is no definite mimetype, still try to open the file
    //     intent.setDataAndType(uri, "text/*");
    // } else {
    //     intent.setDataAndType(uri, mimetype);        
    // }

    var packageManager = application.android.context.getPackageManager();

    var packList = packageManager.getInstalledPackages(0);
    for (var i=0; i < packList.size(); i++)
    {
        var packInfo = packList.get(i);
        if (  (packInfo.applicationInfo.flags & android.content.pm.ApplicationInfo.FLAG_SYSTEM) == 0)
        {
            var appName = packInfo.applicationInfo.loadLabel(packageManager).toString();
            console.log("App № " + 	java.lang.Integer.toString(i), appName);
        }
    }

    var activities = packageManager.queryIntentActivities(intent, android.content.pm.PackageManager.MATCH_DEFAULT_ONLY);
    var isIntentSafe = activities.size() > 0;

    if (isIntentSafe) {
        try {
                application.android.startActivity.startActivity(android.content.Intent.createChooser(intent, "Åben Fil med"));
        } catch (e) {
                console.log(e);
        }
    }
}
exports.onNavigatingTo = onNavigatingTo;