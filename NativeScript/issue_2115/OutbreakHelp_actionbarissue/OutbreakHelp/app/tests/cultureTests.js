var helpers = require('../scripts/helper');
var appSettings = require("application-settings");
var CultureModule = require('../scripts/culture');


describe("Helper Methods:", function() {   
    describe("Culture - ", function(){
        beforeEach(function(){
            appSettings.remove("cultureModel") ;   
        })
        
        it("can set language", function () {
            var cultureModel = new CultureModule();
            cultureModel.setLanguage("French");
            
            assert.isTrue(cultureModel.current.language.toLowerCase() === "français");
        })
        
        it("can toggle language", function () {
            var cultureModel = new CultureModule();
            cultureModel.toggleLanguage();
            
            assert.isTrue(cultureModel.current.language.toLowerCase() === "français");
        })
        
        it("can reset", function () {
            var cultureModel = new CultureModule();
            cultureModel.toggleLanguage();
            assert.isTrue(cultureModel.current.language.toLowerCase() === "français");
            
            cultureModel.reset();
            assert.isTrue(cultureModel.current.language.toLowerCase() === "english"); 
            
        })
    })
});

