var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var ViewModel = (function (_super) {

    __extends(ViewModel, _super);

    function ViewModel(data) {
        var that = this;
        
        _super.apply(that, arguments);
        
        for(var attrname in data) {
            Object.defineProperty(ViewModel.prototype, attrname, {
                get: function () {
                    return this["_" + attrname];
                },
                set: function (value) {
                    this["_" + attrname] = data[attrname];
                },
                enumerable: true,
                configurable: true
            });
            
            that.set(attrname, data[attrname]);
        }
    }

    Object.defineProperty(ViewModel.prototype, "messages", {
        get: function () {
            return this._messages;
        },
        set: function (value) {
            this._messages = value;
        },
        enumerable: true,
        configurable: true
    });

    ViewModel.prototype.showError = function (error) {
        console.log(error);
        dialogsModule.alert({
            message: error,
            okButtonText: "OK"
        });
    };

    ViewModel.prototype.showPageLoading = function () {
        this.set("isLoading", true);
    }

    ViewModel.prototype.hidePageLoading = function () {
        this.set("isLoading", false);
    }

    ViewModel.prototype.handleErrors = function(response) {
        if (!response.ok) {
            console.log(JSON.stringify(response));

            if (response.status === 403) {
                //navigation.signOut();
            }

            throw Error(response.statusText);
        }
        return response;
    }

    return ViewModel;

})(observableModule.Observable);

module.exports = ViewModel;