var application = require("application");

var docViewModule = {
    downloadAndShow: function (httpUrlString) {
        console.log("Downloading... httpUrl: " + httpUrlString);
          
        var uri = android.net.Uri.parse(httpUrlString);	
        
        var strExtension = httpUrlString.substr(httpUrlString.lastIndexOf('.')+1);
        var fType = "*/*";
            
            //document/pdf
            //text/plain
            //image/*
            //*/*
            
            switch (strExtension.toLowerCase()) {
                case 'pdf':
                    fType = "application/pdf";
                    break;
                case 'png':
                    fType = "image/*";
                    break;
                case 'jpg':
                    fType = "image/*";
                    break;
                case 'gif':
                    fType = "image/*";
                    break;
                case 'txt':
                    fType = "text/plain";
                    break;
                default: 
                    fType = "*/*";
                    }
            
            var target = new android.content.Intent(android.content.Intent.ACTION_VIEW);		
            target.setDataAndType(uri, fType);		
            target.setFlags(android.content.Intent.FLAG_ACTIVITY_NO_HISTORY);		
            var intent = android.content.Intent.createChooser(target, "Open File");		
                	
		
        try {			
            application.android.startActivity.startActivity(intent);			
        } catch (e) {			
            //TODO: Instruct the user to install a PDF reader here, or something
			console.log(e);			
        }
    }
};

module.exports = docViewModule;