var fetchModule = require("fetch");

var Observable = require("data/observable").Observable;

var ObservableArray = require("data/observable-array").ObservableArray;

var pageData = require("data/observable").Observable;

var data;



var priceFromResponse;


function ModelViewModel() {

  var viewmodel = new Observable();


  var Viewmodel = new Observable();

  viewmodel.get = function (model) {

    data = model;

  }

  var viewModel = new ObservableArray();

  viewModel.load = function () {


    fetch("http://10.0.2.2:8000/get_model", {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        brand: data,
      })
    }).then(r => { return r.json(); }).then(function (data) {

      for (var i = 0; i < data.length; i++) {

        viewModel.push({
          model: data[i].product,

        });

      };

      price = data[0].value;

      return price;

    }).then(getPrice)


  }

  viewModel.empty = function () {
    while (viewModel.length) {
      viewModel.pop();
    }
  };

  function getPrice(price) {

    Viewmodel.set("price", price);


  }

  return [viewModel, viewmodel, Viewmodel];

}

module.exports = ModelViewModel;