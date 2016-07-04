var config = require("../../shared/config");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var everlive = require("../../shared/everliveAsObject").getEverlive();

var CAN_FOLLOW_BTN_TEXT = "Follow USER";
var USER_FOLLOWED_BTN_TEXT = "Followed";

function UserDetailsViewModel(id) {
	var viewModel = new Observable({});

	viewModel.set('followBtnText', CAN_FOLLOW_BTN_TEXT);

	viewModel.load = function() {
		return fetch(config.apiUrl + "Users/" + id, {
				headers: {
					"Authorization": "Bearer " + config.token
				}
			})
			.then(handleErrors)
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {							
				// console.log(JSON.stringify(data.Result.MyPictures));
				viewModel.set('name', data.Result.DisplayName);
				viewModel.set('userId', data.Result.Id);  
			});
	};

	viewModel.followUser = function() {
		var data = everlive.data('Users');

		var attributes = {
			"$push": {
				"Following": viewModel.userId
			}
		};

		var filter = {
			'Id': viewModel.currentUserId
		};

		data.rawUpdate(attributes, filter, function (data) {
			viewModel.set('followBtnText', USER_FOLLOWED_BTN_TEXT);
			console.log(JSON.stringify(data));
		}, function (err) {
			console.log(JSON.stringify(data));
		})
	}

	return viewModel;
}

function handleErrors(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}

	return response;
}

module.exports = UserDetailsViewModel;