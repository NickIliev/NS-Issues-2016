var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var everlive = require("../../shared/everliveAsObject").getEverlive();

var DEFAULT_SKIP = 0;
var DEFAULT_TAKE = 2;

function MainListViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.skip = DEFAULT_SKIP;
    var sortExp = { "CreatedAt" : -1 };

    viewModel.load = function() {
        return fetch(config.apiUrl + "Picture?skip=" + viewModel.skip + "&take=" + DEFAULT_TAKE, {
            headers: {
                "Authorization": "Bearer " + config.token,
                "X-Everlive-Sort" : JSON.stringify(sortExp)
            }
        })
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        }).then(function(data) {            
            data.Result.forEach(function(picture) {
                var user;
                // console.log("puicture is " + JSON.stringify(picture));
                var data = everlive.data('Users');
                data.getById(picture.Owner)
                .then(function(data){
                    user = data.result.DisplayName;
                    addItemToViewMode(picture, user);
                },
                function(error){
                    addItemToViewMode(picture, user);
                });             
            });
            ++viewModel.skip;
        });
    };

    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    viewModel.likeMedia = function(item) {
        var data = everlive.data("Picture")
        data.updateSingle({ Id: item.Id, 'LikesCount': item.likes },
            function(data){
                console.log("likes are updated");
            },
            function(error){
                handleErrors(error);
            });     
    }

    viewModel.dislikeMedia = function(item) {
        var data = everlive.data("Picture")
        data.updateSingle({ Id: item.Id, 'DislikesCount': item.dislikes },
            function(data){
                console.log("dislikes are updated");
            },
            function(error){
                handleErrors(error);
            });     
    }

    // shareMedia
    viewModel.shareMedia = function(id) {
        return fetch(config.apiUrl + "Files/" + id, {
            headers: {
                "Authorization": "Bearer " + config.token
            }
        })
        .then(function(response) {
            return response.json();
        })
    }

    function addItemToViewMode(picture, user) {
        viewModel.push({
            Id: picture.Id,
            link: picture.Link,
            owner: user,
            userId: picture.Owner,
            description: picture.Description,
            contentFileId: picture.Content,
            likes: picture.LikesCount,
            dislikes: picture.DislikesCount,
        });
    }

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = MainListViewModel;