var view = require("ui/core/view");
var appSettings = require("application-settings");
var vmModule = require("./settings-page-model");

function onLoad(args) {
    
    var page = args.object;
    var signUpButton = view.getViewById(page, "signUpButton");
    
    var logindata = {
        name: appSettings.getString("username"),
        passwort: appSettings.getString("passwort"),
    };

    page.bindingContext = logindata;
    
    var result = view.getViewById(page, "result");
    var nameTextField = view.getViewById(page, "name");
    var passTextField = view.getViewById(page, "passwort");

    signUpButton.on("tap", function () {
		
        if (nameTextField.text === "" || passTextField.text === "") {
            result.text = "Username und Passwort eingeben!";
        } else {
            appSettings.setString("url", "http://testmanager.skip5.com");
            appSettings.setString("change", "true");
            appSettings.setString("username", nameTextField.text);
            appSettings.setString("passwort", passTextField.text);
            appSettings.setString("kalender", "0");
			appSettings.setString("marb", "0");
            appSettings.setString("marbindex", "0");
			appSettings.setString("abplan", "1");
            appSettings.setString("platz", "0");
            appSettings.setString("platzindex", "0");
            appSettings.setString("vorgabe", "0");
            appSettings.setString("vorgabeindex", "0");
            appSettings.setString("date", "" + new Date().toString());
            vmModule.mainViewModel.loadData();
           
                    }
                });
            }
exports.onLoad = onLoad;