'use strict';
var config = require('../../utils/config'),
    ObservableArray = require('data/observable-array').ObservableArray,
    mock = require('../../utils/test-data'),
    handleResponse = require('../../utils/api/helpers').handleResponse,
    navigation = require('../../utils/navigation');

function ClientsViewModel(clients) {
    var viewModel = new ObservableArray(clients)
    
    // Load all clients
    viewModel.load = function(status) {
        status = status || 'all';

        var fetchData;
        if (mock !== 'undefined') {
            fetchData = new Promise(function(resolve, reject) {
                return resolve(mock.clients);
            });
        } else {
            fetchData = fetch(config.apiUrl + 'clients/' + status + '?fields=client_id,screening_id,client_name,profile_image,status', {
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

module.exports = ClientsViewModel;