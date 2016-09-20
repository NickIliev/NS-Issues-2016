// var
var timer = require("timer");
var observable_array_1 = require("data/observable-array");
function onPageLoaded(args) {
    var page = args.object;
    var array = new observable_array_1.ObservableArray();
    var listView = page.getViewById('listview');
    array.push({ item: "test1", key: "1" });
    array.push({ item: "test6", key: "6" });

    var array1 = new observable_array_1.ObservableArray();
    var listView = page.getViewById('listview');
    array1.push({ item: "test1", key: "1" , key1 : "abc"});
    array1.push({ item: "test6", key: "6" , key1 : "abc"});

    page.bindingContext = { myItems: [{  index : "1" ,   myItem2: array }, {  index : "2" ,   myItem2: array1 }]  };
    var t;
   t= timer.setTimeout(() => {
      
        for(var i=0 ; i < 100 ; i++){
            array1.push({ item: "test1", key: "1" , key1 : "abc"}); 
        } 

    }, 1000);

}
exports.onPageLoaded = onPageLoaded;