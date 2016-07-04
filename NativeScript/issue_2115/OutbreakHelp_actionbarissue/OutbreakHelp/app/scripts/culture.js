var helpers = require('./helper');
var appSettings = require("application-settings");

var eng = {
    locale: "en-us",
    language: "English"
};

var fr = {
    locale: "fr-CA",
    language: "Français"
}

function OutbreakCulture() {
    var cultureModel = {
        current: {
            locale: eng.locale,
            language: eng.language
        },
        other: {
            locale: fr.locale,
            language: fr.language
        }
    };
    
    if(!appSettings.hasKey("cultureModel")){
        appSettings.setString("cultureModel", JSON.stringify(cultureModel));
    }else{
        cultureModel = JSON.parse(appSettings.getString("cultureModel"));
    }
        
    cultureModel.toggleLanguage = function() {
        if(cultureModel.current.locale == eng.locale){
            this.setLanguage("French");
        }else{
            this.setLanguage("English");
        }
    }
    
    cultureModel.setLanguage = function(language) {
        if(language.toUpperCase() == "ENGLISH"){
            cultureModel.current.locale = eng.locale;
            cultureModel.current.language = eng.language;
            cultureModel.other.locale = fr.locale;
            cultureModel.other.language = fr.language;
        }else{
            cultureModel.current.locale = fr.locale;
            cultureModel.current.language = fr.language;
            cultureModel.other.locale = eng.locale;
            cultureModel.other.language = eng.language;
        }
        
        appSettings.setString("cultureModel", JSON.stringify(cultureModel));
    }
    
    cultureModel.reset = function() {
        appSettings.remove("cultureModel");
        cultureModel.current.locale = eng.locale;
        cultureModel.current.language = eng.language;
        cultureModel.other.locale = fr.locale;
        cultureModel.other.language = fr.language;
    }

	return cultureModel;
}

module.exports = OutbreakCulture;