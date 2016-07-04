var UserDetailsViewModel = require("../../shared/models/user-details-view-model");
var everlive = require("../../shared/everliveAsObject").getEverlive();
var viewModel;

exports.onLoaded = function(args) {    
  var page = args.object;  
  var viewModel = new UserDetailsViewModel(page.navigationContext.id);
  viewModel.set('hideFollow', true);
  page.bindingContext = viewModel;
  viewModel.load().then(function() {
    everlive.Users.currentUser(function(res) {
      if(res.result) {      
        viewModel.set('currentUserId', res.result.Id); 
        // only for testing == otherwise !=       
        if (viewModel.currentUserId == viewModel.userId) {          
          viewModel.set('hideFollow', false);
        };
      }
    }, function(err) {
      console.log(err.message);
    });        
  });
};

exports.followUser = function(args) {  
  var page = args.object; 
  var vm = page.bindingContext;
  vm.followUser();
  //follow-btn
  var followBtn = page.getViewById("follow-btn");
  followBtn.isEnabled = false;
};