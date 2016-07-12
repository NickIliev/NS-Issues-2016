var frameModule = require("ui/frame");
var scrollViewModule = require("ui/scroll-view");
var observableArray = require("data/observable-array");
var observable = require("data/observable");

var scrollView = new scrollViewModule.ScrollView();
var http = require("http");

var viewModel;
var slideContainer;
function pageLoaded(args) {
    var page = args.object;
    slideContainer = page.getViewById('slideContainer');
    // console.log(slideContainer);
    var items = new observableArray.ObservableArray();
    var cash = new observableArray.ObservableArray();
    viewModel = new observable.Observable();
  
    items.push('Menu','About','About');
    cash.push('Income','Cash Flow From Operations','Operations1','Operations2');

    console.log(cash);
    viewModel.set("cash", cash);
    viewModel.set("items", items);
    viewModel.set("selectedIndex", 1);
    page.bindingContext = viewModel;
}

exports.pageLoaded = pageLoaded;

exports.loaded = function(eventData) {
    page = eventData.object;
    page.bindingContext = pageData;
};

exports.pieChart = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/file/pieChart");
};

function next(args) {
    console.log('Next slide');
    slideContainer.nextSlide();
}
а
exports.next = next;
function prev(args) {
    console.log('Previous slide');
    slideContainer.previousSlide();
}
exports.prev = prev;

var observable_1 = require("data/observable");
var file_system_1 = require("file-system");
var page;

function navigatingTo(args) {
   // var page = args.object;
   //  var observable = new observable_1.Observable();
   //  var documents = file_system_1.knownFolders.currentApp();
   //  var jsonFile = documents.getFile('shared/chart.json');
   //  var jsonData;
   //  jsonFile.readText()
   //      .then(function (content) {
   //      jsonData = JSON.parse(content);
   //      // console.log(content);
   //      // console.dump(jsonData);
   //      observable.set("info", jsonData);
   //  }, function (error) {
   //      throw new Error('Could not read JSON file');
   //  });
   //  page.bindingContext = observable;
    var jsonData;
    
    var page = args.object;
    var observable = new observable_1.Observable();
    var documents = file_system_1.knownFolders.currentApp();
    http.request({
        url: "http://bossapp-erp.activbm.com/",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        content: 'cmd=login&usr=Administrator&pwd=bossapp123'
    }).then(function (response) {
        sidCookie = response.headers['Set-Cookie'][0].split(";")[0]
        url = 'http://bossapp-erp.activbm.com/?report_name=Profit+and+Loss+Statement&filters=%7B%22company%22%3A%22Bluesky+Group+Pte.+Ltd.%22%2C%22fiscal_year%22%3A%222016%22%2C%22periodicity%22%3A%22Monthly%22%7D&cmd=frappe.desk.query_report.run&_=1467792072302'
        http.request({
            url: url,
            method: "GET",
            headers: { "sid": sidCookie }
        }).then(function (response) {
            var year = 2016
            result = response.content.toJSON().message
            var responseResult = response.content.toJSON().message.result
            chartArry1 = []
            chartArry2 = []
            chartArry3 = []
            chartArry4 = []
            var chartSource1 = {}
            var chartSource2 = {}
            var chartSource3 = {}
            var chartSource4 = {}
            var gObj = {}
            var p // current parent
            for (var i = 0; i < responseResult.length; i++) {
                // console.log("Came 2 newObj")
                var c = responseResult[i] // current Node
                if (c.parent_account == null && c.account != null) {
                    p = c.account.replace(/[\. ,:-]+/g, "-") // parent node
                    gObj[p] = c
                } else if (c.parent_account != null) {
                    var p1 = c.parent_account.replace(/[\. ,:-]+/g, "-") // parent node
                    var ch = c.account.replace(/[\. ,:-]+/g, "-") // child node
                    
                    if(gObj[p1]) {
                        gObj[p1]['child'] = gObj[p1]['child'] || {}
                        gObj[p1]['child'][ch] = c
                    }
                    else {
                        if(gObj[p]['child'][p1]){
                            gObj[p]['child'][p1]['child'] = gObj[p]['child'][p1]['child'] || {}
                            gObj[p]['child'][p1]['child'][ch] = c
                        }
                    }
                }
                else if(c.account == null){
                    if(c.account_name == "'Net Profit / Loss'"){
                        gObj["total"] = c
                    }
                }
            }
            var janExpenseDirect = gObj["Expenses-BSG"]["child"]["Expenses-Direct-BSG"]["jan_"+year]
            var febExpenseDirect = gObj["Expenses-BSG"]["child"]["Expenses-Direct-BSG"]["feb_"+year]
            var marExpenseDirect = gObj["Expenses-BSG"]["child"]["Expenses-Direct-BSG"]["mar_"+year]
            var aprExpenseDirect = gObj["Expenses-BSG"]["child"]["Expenses-Direct-BSG"]["apr_"+year]
            var mayExpenseDirect = gObj["Expenses-BSG"]["child"]["Expenses-Direct-BSG"]["may_"+year]
            var junExpenseDirect = gObj["Expenses-BSG"]["child"]["Expenses-Direct-BSG"]["jun_"+year]
            var julExpenseDirect = gObj["Expenses-BSG"]["child"]["Expenses-Direct-BSG"]["jul_"+year]
            var augExpenseDirect = gObj["Expenses-BSG"]["child"]["Expenses-Direct-BSG"]["aug_"+year]
            var sepExpenseDirect = gObj["Expenses-BSG"]["child"]["Expenses-Direct-BSG"]["sep_"+year]
            var octExpenseDirect = gObj["Expenses-BSG"]["child"]["Expenses-Direct-BSG"]["oct_"+year]
            var novExpenseDirect = gObj["Expenses-BSG"]["child"]["Expenses-Direct-BSG"]["nov_"+year]
            var decExpenseDirect = gObj["Expenses-BSG"]["child"]["Expenses-Direct-BSG"]["dec_"+year]
            
            var janExpenseExceptDirect = gObj["Expenses-BSG"]["child"]["Expenses-Operating-BSG"]["jan_"+year]  + gObj["Expenses-BSG"]["child"]["Expenses-Staff-BSG"]["jan_"+year]
            var febExpenseExceptDirect = gObj["Expenses-BSG"]["child"]["Expenses-Operating-BSG"]["feb_"+year]  + gObj["Expenses-BSG"]["child"]["Expenses-Staff-BSG"]["feb_"+year]
            var marExpenseExceptDirect = gObj["Expenses-BSG"]["child"]["Expenses-Operating-BSG"]["mar_"+year]  + gObj["Expenses-BSG"]["child"]["Expenses-Staff-BSG"]["mar_"+year]
            var aprExpenseExceptDirect = gObj["Expenses-BSG"]["child"]["Expenses-Operating-BSG"]["apr_"+year]  + gObj["Expenses-BSG"]["child"]["Expenses-Staff-BSG"]["apr_"+year]
            var mayExpenseExceptDirect = gObj["Expenses-BSG"]["child"]["Expenses-Operating-BSG"]["may_"+year]  + gObj["Expenses-BSG"]["child"]["Expenses-Staff-BSG"]["may_"+year]
            var junExpenseExceptDirect = gObj["Expenses-BSG"]["child"]["Expenses-Operating-BSG"]["jun_"+year]  + gObj["Expenses-BSG"]["child"]["Expenses-Staff-BSG"]["jun_"+year]
            var julExpenseExceptDirect = gObj["Expenses-BSG"]["child"]["Expenses-Operating-BSG"]["jul_"+year]  + gObj["Expenses-BSG"]["child"]["Expenses-Staff-BSG"]["jul_"+year]
            var augExpenseExceptDirect = gObj["Expenses-BSG"]["child"]["Expenses-Operating-BSG"]["aug_"+year]  + gObj["Expenses-BSG"]["child"]["Expenses-Staff-BSG"]["aug_"+year]
            var sepExpenseExceptDirect = gObj["Expenses-BSG"]["child"]["Expenses-Operating-BSG"]["sep_"+year]  + gObj["Expenses-BSG"]["child"]["Expenses-Staff-BSG"]["sep_"+year]
            var octExpenseExceptDirect = gObj["Expenses-BSG"]["child"]["Expenses-Operating-BSG"]["oct_"+year]  + gObj["Expenses-BSG"]["child"]["Expenses-Staff-BSG"]["oct_"+year]
            var novExpenseExceptDirect = gObj["Expenses-BSG"]["child"]["Expenses-Operating-BSG"]["nov_"+year]  + gObj["Expenses-BSG"]["child"]["Expenses-Staff-BSG"]["nov_"+year]
            var decExpenseExceptDirect = gObj["Expenses-BSG"]["child"]["Expenses-Operating-BSG"]["dec_"+year]  + gObj["Expenses-BSG"]["child"]["Expenses-Staff-BSG"]["dec_"+year]
            
            var janNetProfit = gObj["total"]["jan_"+year]
            var febNetProfit = gObj["total"]["feb_"+year]
            var marNetProfit = gObj["total"]["mar_"+year]
            var aprNetProfit = gObj["total"]["apr_"+year]
            var mayNetProfit = gObj["total"]["may_"+year]
            var junNetProfit = gObj["total"]["jun_"+year]
            var julNetProfit = gObj["total"]["jul_"+year]
            var augNetProfit = gObj["total"]["aug_"+year]
            var sepNetProfit = gObj["total"]["sep_"+year]
            var octNetProfit = gObj["total"]["oct_"+year]
            var novNetProfit = gObj["total"]["nov_"+year]
            var decNetProfit = gObj["total"]["dec_"+year]

            janObj = {name : "January",ExpenseDirect : janExpenseDirect,ExpenseExceptDirect : janExpenseExceptDirect, netProfit : 0 }
            febObj = {name : "February",ExpenseDirect : febExpenseDirect,ExpenseExceptDirect : febExpenseExceptDirect, netProfit : febNetProfit }
            marObj = {name : "March",ExpenseDirect : marExpenseDirect,ExpenseExceptDirect : marExpenseExceptDirect, netProfit : marNetProfit }
            aprObj = {name : "April",ExpenseDirect : aprExpenseDirect,ExpenseExceptDirect : aprExpenseExceptDirect, netProfit : aprNetProfit }
            mayObj = {name : "May",ExpenseDirect : mayExpenseDirect,ExpenseExceptDirect : mayExpenseExceptDirect, netProfit : mayNetProfit }
            junObj = {name : "June",ExpenseDirect : junExpenseDirect,ExpenseExceptDirect : junExpenseExceptDirect, netProfit : junNetProfit }
            julObj = {name : "July",ExpenseDirect : julExpenseDirect,ExpenseExceptDirect : julExpenseExceptDirect, netProfit : julNetProfit }
            augObj = {name : "August",ExpenseDirect : augExpenseDirect,ExpenseExceptDirect : augExpenseExceptDirect, netProfit : augNetProfit }
            sepObj = {name : "September",ExpenseDirect : sepExpenseDirect,ExpenseExceptDirect : sepExpenseExceptDirect, netProfit : sepNetProfit }
            octObj = {name : "October",ExpenseDirect : octExpenseDirect,ExpenseExceptDirect : octExpenseExceptDirect, netProfit : octNetProfit }
            novObj = {name : "November",ExpenseDirect : novExpenseDirect,ExpenseExceptDirect : novExpenseExceptDirect, netProfit : novNetProfit }
            decObj = {name : "December",ExpenseDirect : decExpenseDirect,ExpenseExceptDirect : decExpenseExceptDirect, netProfit : decNetProfit }

            chartArry1.push(janObj)
            chartArry1.push(febObj)
            chartArry1.push(marObj)
            chartArry2.push(aprObj)
            chartArry2.push(mayObj)
            chartArry2.push(junObj)
            chartArry3.push(julObj)
            chartArry3.push(augObj)
            chartArry3.push(sepObj)
            chartArry4.push(octObj)
            chartArry4.push(novObj)
            chartArry4.push(decObj)
            
            chartSource1["chartSource1"] = chartArry1
            // console.log("HAI")
            observable.set("info", chartSource1);
            page.bindingContext = observable;

             chartSource2["chartSource2"] = chartArry2
            // console.log("paul")
            observable.set("source", chartSource2);
            page.bindingContext = observable;

             chartSource3["chartSource3"] = chartArry3
            // console.log("neoito")
            observable.set("chart3", chartSource3);
            page.bindingContext = observable;

            chartSource4["chartSource4"] = chartArry4
            console.log("sura")
            observable.set("chart4", chartSource4);
            page.bindingContext = observable;
            // observable.set("info", jsonData);
        }, function (e) {
            console.log("Error occurred " + e);
        });
    }, function (e) {
        console.log("Error occurred " + e);
    });
   
}

exports.navigatingTo = navigatingTo;
