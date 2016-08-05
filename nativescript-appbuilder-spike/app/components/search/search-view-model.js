'use strict';

var config = require('../../utils/config');
//var Observable = require('data/observable-array').Observable;
var ObservableArray = require('data/observable-array').ObservableArray;
var mock = require('../../utils/test-data');
var handleResponse = require('../../utils/api/helpers').handleResponse;
var navigation = require('../../utils/navigation');

function SearchViewModel() {
    var viewModel = new ObservableArray();
    
    // Load all clients
    viewModel.load = function(searchText) {
        var fetchData = fetch(config.apiUrl + 'search/all.json?q=text', {
			headers: {
				Authorization: 'Bearer ' + config.token
			}
        });

        return fetchData
            .then(handleResponse)
            .then(function(data) {
            	viewModel.empty();
                data.results.forEach(function(result) {
                    viewModel.push(result);
                });
            });
    };
    
    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };
    
    return viewModel;
}

module.exports = SearchViewModel;