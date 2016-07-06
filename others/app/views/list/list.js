var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var MainListViewModel = require("../../shared/models/main-view-model");
var viewModule = require("ui/core/view");
var socialShare = require("nativescript-social-share");
var imagepicker = require("nativescript-imagepicker");
var fs = require("file-system");
var imageSource = require("image-source");
var navigation = require("../../shared/navigator");
var page;

var mainList = new MainListViewModel([]);
var pageData = new Observable({
    mainList: mainList
});

exports.onLoaded = function(args) {
    page = args.object;   
    //var listView = page.getViewById("mainList");
    page.bindingContext = pageData;
    mainList.skip = 0;
    mainList.empty();
    pageData.set("isLoading", true);
    mainList.load().then(function() {
        pageData.set("isLoading", false);
        /*
        listView.animate({
            opacity: 1,
            duration: 1000
        });*/
    });
};

exports.addMedia = function() {  
    var context = imagepicker.create({
        mode: "single"
    });
    startSelection(context);  
}

function startSelection(context) {
    context
    .authorize()
    .then(function() {
        return context.present();
    })
    .then(function(selection) {        
        console.log("Selection done:");        
        selection.forEach(function(selected) {

            selected.getImage().then(function(seletedImgSource) {

                var imageAsBase64String = seletedImgSource.toBase64String("JPG");

            });

        });
    }).catch(function (e) {
        console.log(e);
    });
}

exports.showUserDetails = function(args) {
     var tappedItemData = getClickedButton(args);
     navigation.goToUserDetailsPage(tappedItemData.userId);
}

exports.dislikeMedia = function(args) {
    var tappedItemData = getClickedButton(args);   
    pageData.mainList = pageData.mainList.map(function (item) {
        if (item.Id === tappedItemData.Id) {
            item.dislikes = ++item.dislikes;    
            return item;
        } else {
            return item
        };
    })
    mainList.dislikeMedia(tappedItemData);
};

exports.likeMedia = function(args) {     
    var tappedItemData = getClickedButton(args);
    pageData.mainList = pageData.mainList.map(function (item) {
        if (item.Id === tappedItemData.Id) {
            item.likes = ++item.likes;    
            return item;
        } else {
            return item
        };
    })
    mainList.likeMedia(tappedItemData);
};


exports.shareLink = function(args) {
    var tappedItemData = getClickedButton(args);
    if (tappedItemData.contentFileId === undefined) {
        alert("can not be shared");
        return
    };
    mainList.shareMedia(tappedItemData.contentFileId).then(function(data) {
        socialShare.shareText(data.Result.Uri);
        console.log(data.Result.Uri);
    });   
};

function getClickedButton(args) {
    var btn = args.object;
    return btn.bindingContext;
}

//onLoadMoreItemsRequested
pageData.onLoadMoreItemsRequested = function(args) {
    var listView = args.object;
    mainList.load().then(function() {
        listView.notifyLoadOnDemandFinished();       
    });    
}