var http = require("http");
var helpers = require('../scripts/helper');

describe("Outbreak Services", function() {
    it("can get remote resource labels", function (done) {
		 http.getJSON("https://www.outbreakhelp.ca/RestApi/app/labels?format=json").then(function (labels) {
            assert.isTrue(labels.length > 0);
            
            done();
        }, function (e) {
            
        });
	});
    
   it("returns resources", function (done) {
        http.getJSON("https://www.outbreakhelp.ca/RestApi/app/resources?format=json&page=1").then(function (resources) {
            assert.isTrue(resources.Resources.length > 0);
            done();
        }, function (e) {
             
        });
	});
    
    it("returns resource detail", function (done) {
       var resourceId = "1acafd73-5887-6d8b-9e8a-ff00003a1412";
       var url = "https://www.outbreakhelp.ca/RestApi/app/resources/" + resourceId +"?format=json&locale=en-CA"; 
       
       http.getJSON(url).then(function (resource) {
            assert.isTrue(resource.Id === resourceId);
            done();
        }, function (e) {
             
        });
    });
    
     it("returns a french resource detail", function (done) {
       var resourceId = "1acafd73-5887-6d8b-9e8a-ff00003a1412";
       var url = "https://www.outbreakhelp.ca/RestApi/app/resources/" + resourceId +"?format=json&locale=fr-CA"; 
       var expectedTitle = "Facteurs de risque pour la transmission de la maladie à virus Ebola ou Marburg : examen systématique et méta-analyse (en anglais seulement)";
       
       http.getJSON(url).then(function (resource) {
            assert.isTrue(resource.Title === expectedTitle);
            done();
        }, function (e) {
             
        });
    });
    
   it("returns webinars", function (done) {
        http.getJSON("https://www.outbreakhelp.ca/RestApi/app/webinars?format=json&locale=en-CA").then(function (items) {
            assert.isTrue(items.length > 0);
            done();
        }, function (e) {

        });
	});
    
    it("returns newsletter links", function (done) {
        http.getJSON("https://www.outbreakhelp.ca/RestApi/app/newsletter?format=json").then(function (data) {
            assert.isTrue(data.EnglishLink !== "");
            assert.isTrue(data.FrenchLink !== "");
            done();
        }, function (e) {
        });
	});
    
        it("returns taxa", function (done) {
        http.getJSON("https://www.outbreakhelp.ca/RestApi/app/taxa?format=json").then(function (data) {
            assert.isTrue(data.Categories.length > 0);
            assert.isTrue(data.Jurisdictions.length > 0);
            done();
        }, function (e) {
        });
	});

});
