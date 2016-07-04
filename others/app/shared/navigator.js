var frameModule = require("ui/frame");

module.exports = {
	goToLoginPage: function() {
		frameModule.topmost().navigate("views/login/login");
	},
	goToMainPage: function() {
		frameModule.topmost().navigate("views/list/list");
	},
	goToAddPage: function() {
		frameModule.topmost().navigate("views/add/add");
	},
	goToStartPage: function() {
		return {
			moduleName: "views/login/login",                
			backstackVisible: false,
			animated: true
		}
	},
	goToUserDetailsPage: function(userId) {
		frameModule.topmost().navigate({
			moduleName: 'views/user-details/user-details',
			context: {
				id: userId
			}
	    });
	}
};