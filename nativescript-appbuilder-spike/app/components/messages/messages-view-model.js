'use strict';

var config = require('../../utils/config');
var ObservableArray = require('data/observable-array').ObservableArray;
var handleResponse = require('../../utils/api/helpers').handleResponse;
var navigation = require('../../utils/navigation');

function MessagesViewModel(clients) {
    var viewModel = new ObservableArray(clients)

    viewModel.load = function(status, tag, sortby) {
        status = status || 'all';
        tag = tag || 'all';
        sortby = sortby || 'createddesc';

        var fetchData = fetch(config.apiUrl + 'messages/index.json', {
            headers: {
                Authorization: 'Bearer ' + config.token
            }
        });

        return fetchData
            .then(handleResponse)
            .then(function(data) {
                viewModel.empty();
                data.messages.forEach(function(message) {
                    viewModel.push(message);
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

module.exports = MessagesViewModel;