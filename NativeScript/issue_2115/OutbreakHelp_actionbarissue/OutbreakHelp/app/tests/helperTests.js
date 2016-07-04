var culture = require('../scripts/culture');
var helpers = require('../scripts/helper');
var appSettings = require("application-settings");
var CultureModule = require('../scripts/culture');
var cultureModel = new CultureModule();

describe("Helper Methods:", function() {   
    describe("Labels - ", function(){
        beforeEach(function(){
            appSettings.remove("cultureModel")    
        })
        
        it("can retreive an french resource", function () {
            var resourceName = "MenuResources";
            var expectedName = "Ressources";
            
            cultureModel.setLanguage("French");
            
            assert.isTrue(expectedName == helpers.getResource(resourceName));
        })
        
        it("can retreive an english resource", function () {
            var resourceName = "MenuResources";
            var expectedName = "Resources";
            
            cultureModel.setLanguage("English");
            
            assert.isTrue(expectedName == helpers.getResource(resourceName));
        })
    })
});

