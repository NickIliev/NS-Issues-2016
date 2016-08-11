var frameModule = require("ui/frame");
var scrollViewModule = require("ui/scroll-view");
var observableArray = require("data/observable-array");
var observable = require("data/observable");
// var moment  = require("moment");
var observable_1 = require("data/observable");
var http = require("http");

var viewModel;
var page;
var slideContainer;
var chartArr1
var catArr = []
var weekArr = []

var deltaDays = 0
var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

function pageLoaded(args) {
    page = args.object;
    var barChart = page.getViewById('chart');
    var observable = new observable_1.Observable();
    nextButton = page.getViewById('next');
    previousButton = page.getViewById('prev');

    http.request({
        url: "http://bossapp-erp.activbm.com/",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        content: 'loginDetails'
    }).then(function (response) {
        sidCookie = response.headers['Set-Cookie'][0].split(";")[0]
        url = 'Url'
        http.request({
            url: url,
            method: "GET",
            headers: { "sid": sidCookie }
        }).then(function (responses) {
            var year = 2016
            resultData = responses.content.toJSON().message
            var responseResult =resultData["result"]
            var gObj = {}
            var gObjArr = []
            var gObjCatArr = {}
            // Create custom Object for easy traversing
            for (var i = 0; i < responseResult.length; i++) {
                var dateStr = responseResult[i][9] // current Node
                if(!dateStr){
                    continue
                }   
                if(!gObj[dateStr]){
                    gObj[dateStr] = gObj[dateStr] || {}
                    var obj = {}
                    obj[dateStr] = gObj[dateStr]
                    gObjArr.push(obj)
                }
                var catName = responseResult[i][2]
                if(catArr.indexOf(catName) == -1){
                    catArr.push(catName)
                }
                var keyObj = Object.keys(gObj[dateStr])
                if(keyObj.indexOf(catName) > -1){
                    gObj[dateStr][catName] = gObj[dateStr][catName] + responseResult[i][15]
                }
                else{
                    gObjCatArr[catName] = gObjCatArr[catName] || {}
                    gObj[dateStr][catName] = gObj[dateStr][catName] || 0 + responseResult[i][15]
                }
            }
            console.log(catArr)

            firstDateOfWeek = new Date; // get current date
            firstDateOfWeek = new Date(firstDateOfWeek.setDate(firstDateOfWeek.getDate()-firstDateOfWeek.getDay()))
            computeInfo()

            function computeInfo(){
                firstDateOfWeek = new Date(firstDateOfWeek.setDate(firstDateOfWeek.getDate() + 7*deltaDays))
                buildWeek(firstDateOfWeek,gObj)
                var weekPosition
                if(firstDateOfWeek.getDate() % 7 == 1){
                    weekPosition = Math.ceil((firstDateOfWeek.getDate())/7)
                } else {
                    weekPosition = Math.ceil((firstDateOfWeek.getDate())/7) + 1
                }
                observable.set("sliderFooter", monthNames[firstDateOfWeek.getMonth()]+ " Week -"+ weekPosition) 
                

                var chartSource1={}
                chartSource1["chartSource1"] = weekArr
                observable.set("info", chartSource1);
                observable.set("item1", catArr)
                page.bindingContext = observable;
            }
           
            observable.set("onNext", function(eventData) {
                deltaDays = 1
                computeInfo()
            });
            observable.set("onPrevious", function(eventData) {
                deltaDays = -1
                computeInfo()
            })

        }, function (e) {
            console.log("Error occurred " + e);
        });
    }, function (e) {
        console.log("Error occurred " + e);
    });
}
exports.pageLoaded = pageLoaded;

function buildWeek(pCurrDate,gObj){
    weekArr = []
    var currDate = new Date(pCurrDate)
    for(var idx=0;idx <= 6; idx++) {
        var strCurrDate = currDate.toISOString().slice(0,10)
        var formattedDate = monthNames[currDate.getMonth()] + ' ' + currDate.getDate()
        if(gObj[strCurrDate]){
            gObj[strCurrDate].name = formattedDate
            weekArr.push(gObj[strCurrDate])
        }
        else{
             weekArr.push({"name":formattedDate})
        }
        currDate = new Date(currDate.setDate(currDate.getDate()+1))
    }
}

exports.home = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/home/homePage");
};