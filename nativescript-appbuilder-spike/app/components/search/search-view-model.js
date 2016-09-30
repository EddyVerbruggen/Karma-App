'use strict';

var config = require('../../utils/config');
//var Observable = require('data/observable-array').Observable;
var ObservableArray = require('data/observable-array').ObservableArray;
var mock = require('../../utils/test-data');
var handleResponse = require('../../utils/api/helpers').handleResponse;
var navigation = require('../../utils/navigation');

function SearchViewModel() {
    var viewModel = new ObservableArray();

    // Load all search results
    viewModel.load = function (searchText, pageIndex, pageSize) {
        var fetchData = fetch(config.apiUrl + 'search/all.json?q=' + searchText + '&page=' + pageIndex + '&pageSize=' + pageSize, {
            headers: {
                Authorization: 'Bearer ' + config.token,
                TestData: config.testData
            }
        });

        return fetchData
            .then(handleResponse)
            .then(function (data) {
                // viewModel.empty();
                for (var item in data) {
                    viewModel.set(item, data[item]);
                }
            });
    };

    viewModel.empty = function () {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    return viewModel;
}

module.exports = SearchViewModel;