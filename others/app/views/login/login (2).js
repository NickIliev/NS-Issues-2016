var config = require("../../shared/config");
var navigation = require("../../shared/navigator");
var everlive = require("../../shared/everliveAsObject").getEverlive();

// Find out how to get the current user accessToken
// For testing purpose
var accessToken = config.accessToken;

exports.onLoaded = function(args) {    
  var page = args.object;  
  everlive.Users.currentUser(function(data) {
    if (data.result) {
      var username = data.result.DisplayName;
      console.log(username + " is logged in!");
      navigation.goToMainPage();
    } else {
      console.log("Missing access token. Please log in!");
    }
  }, function(err) {
    console.log(err.message + " Please log in.");
  });
};

exports.loginFB = function() { 
  everlive.authentication.loginWithFacebook(accessToken,
    function (data) {
      config.token = data.result.access_token; 
      navigation.goToMainPage();
    },
    function(error){
      console.log(JSON.stringify(error));
    });
};