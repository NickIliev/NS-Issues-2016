/* global NSOperationQueue */
/* global NSURL */
/* global NSURLRequest */
/* global UIDocumentInteractionControllerDelegate */
/* global __extends */
/* global UIDocumentInteractionController */
/* global NSURLConnection */

var frames = require("ui/frame");
var fs = require("file-system");
var platform = require("platform");
var application = require("application");

var docViewModule = {

    downloadAndShow : function  (httpUrlString) {
        console.log("Downloading... httpUrl: " + httpUrlString);
        
        var fileName = httpUrlString.substring(httpUrlString.lastIndexOf('/') + 1);
        var destinationFile = fs.path.join(fs.knownFolders.documents().path, fileName);
        
        // Download
       
            NSURLConnection.sendAsynchronousRequestQueueCompletionHandler(NSURLRequest.requestWithURL(NSURL.URLWithString(httpUrlString)), NSOperationQueue.mainQueue(), function (response, data, error) {
                data.writeToFileAtomically(destinationFile, true);
                console.log("Download successful. Viewing: " + destinationFile);

                // Show
                var controller = UIDocumentInteractionController.interactionControllerWithURL(NSURL.fileURLWithPath(destinationFile));
                controller.delegate = new UIDocumentInteractionControllerDelegateImpl();
                controller.presentPreviewAnimated(true);
            });
        
       
    },
};


var UIDocumentInteractionControllerDelegateImpl = (function (_super) {
    __extends(UIDocumentInteractionControllerDelegateImpl, _super);
    function UIDocumentInteractionControllerDelegateImpl() {
        _super.apply(this, arguments);
    }
    UIDocumentInteractionControllerDelegateImpl.prototype.documentInteractionControllerViewControllerForPreview = function (controller) {
        return frames.topmost().currentPage.ios;
    };
    UIDocumentInteractionControllerDelegateImpl.prototype.documentInteractionControllerViewForPreview = function (controller) {
        return frames.topmost().currentPage.ios.view;
    };
    UIDocumentInteractionControllerDelegateImpl.prototype.documentInteractionControllerRectForPreview = function (controller) {
        return frames.topmost().currentPage.ios.view.frame;
    };
    UIDocumentInteractionControllerDelegateImpl.ObjCProtocols = [UIDocumentInteractionControllerDelegate];
    return UIDocumentInteractionControllerDelegateImpl;
})(NSObject);


module.exports = docViewModule;