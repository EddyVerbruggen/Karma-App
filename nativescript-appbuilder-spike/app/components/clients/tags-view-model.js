'use strict';

var config = require('../../utils/config');
var ObservableArray = require('data/observable-array').ObservableArray;
var handleResponse = require('../../utils/api/helpers').handleResponse;
var navigation = require('../../utils/navigation');

function TagsViewModel() {
    var viewModel = new ObservableArray()
    
    // Load all clients
    viewModel.load = function() {
        var fetchData = fetch(config.apiUrl + 'users/tags.json', {
                headers: {
                    Authorization: 'Bearer ' + config.token,
                    TestData: config.testData
                }
        	});

        return fetchData
            .then(handleResponse)
            .then(function(data) {
                viewModel.empty();
                data.tags.forEach(function(tag) {
                    viewModel.push(tag);
                })
            });
    };
    
    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };
    
    return viewModel;
}

module.exports = TagsViewModel;