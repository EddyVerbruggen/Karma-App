'use strict';

var config = require('../../utils/config');
var ObservableArray = require('data/observable-array').ObservableArray;
var mock = require('../../utils/test-data');
var handleResponse = require('../../utils/api/helpers').handleResponse;
var navigation = require('../../utils/navigation');

function MessagesViewModel(clients) {
    var viewModel = new ObservableArray(clients)
    
    // Load all clients
    viewModel.load = function(status, tag, sortby) {
        status = status || 'all';
        tag = tag || 'all';
        sortby = sortby || 'createddesc';

        var fetchData;
        if (mock !== 'undefined') {
            fetchData = new Promise(function(resolve, reject) {
                return resolve(mock.messages);
            });
        } else {
            fetchData = fetch(config.apiUrl + 'messages/' + status + '?fields=client_id,screening_id,client_name,profile_image,status', {
                headers: {
                    Authorization: 'Bearer ' + config.token
                }
        	});
        }

        return fetchData
            .then(handleResponse)
            .then(function(data) {
                viewModel.empty();
                data.Result.forEach(function(client) {
                    viewModel.push(client);
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