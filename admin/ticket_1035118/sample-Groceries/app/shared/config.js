var applicationSettingsModule = require("application-settings");
//GWfRtXi1Lwt4jcqK original
var configObject = {
	apiUrl: "https://api.everlive.com/v1/w5lgy8j8zqnblqj5/",
	invalidateToken: function() {
		this.token = "";
	}
};
Object.defineProperty(configObject, "token", {
	get: function() {
		return applicationSettingsModule.getString("token");
	},
	set: function(token) {
		return applicationSettingsModule.setString("token", token);
	}
});

module.exports = configObject;
