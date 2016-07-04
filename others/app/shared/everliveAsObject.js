var Everlive = require('../libs/everlive.all');
var config = require("../shared/config");

module.exports = {
	getEverlive: function() {
		return new Everlive({
			appId: config.appId,
			authentication: {
				persist: true
			}
		});
	}
};