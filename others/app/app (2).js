var applicationModule = require("application");
var navigation = require("./shared/navigator");

applicationModule.cssFile = "app.css";
applicationModule.mainModule = navigation.goToStartPage();

applicationModule.start();