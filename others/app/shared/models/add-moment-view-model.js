var navigation = require("../../shared/navigator");
var Observable = require("data/observable").Observable;
var everlive = require("../../shared/everliveAsObject").getEverlive();

function AddMomentViewModel() {
	var viewModel = new Observable({});

	viewModel.add = function() {		
		var data = everlive.data('Picture');
		var moment = {
			'Description': viewModel.description,
			'Link': viewModel.link,
			'DislikesCount': 0,
			'LikesCount': 0 	
		}
		
		data.create( moment,
			function(data){
				console.log("item added")
				getMedia(data.result.Id);
				navigation.goToMainPage();
			},
			function(error){
				handleErrors(error);
			});

	};

	return viewModel;
}

function getMedia(id) {
	var data = everlive.data('Picture');
	data.getById(id)
	    .then(function(data){
	        updateUser(data.result);
	    },
	    function(error){
	        console.log(JSON.stringify(error));
	    });
}

function updateUser(media) {
	var data = everlive.data('Users');

		var attributes = {
			"$push": {
				"MyPictures": media
			}
		};

		var filter = {
			'Id': media.Owner
		};

		data.rawUpdate(attributes, filter, function (data) {
			console.log(JSON.stringify(data));			
		}, function (err) {
			console.log(JSON.stringify(data));
		})
}

function handleErrors(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}

	return response;
}

module.exports = AddMomentViewModel;