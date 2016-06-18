'use strict';
var config = require('../../utils/config'),
    ObservableArray = require('data/observable-array').ObservableArray,
    mock = require('../../utils/test-data'),
    navigation = require('../../utils/navigation');

function indexOf(item) {
	var match = -1;
	this.forEach(function(loopItem, index) {
		if (loopItem.id === item.id) {
			match = index;
		}
	});
	return match;
}

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
            .then(handleErrors)
            .then(function(response) {
                return typeof(response) === 'string' ? response.json() : response;
            }).then(function(data) {
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
    
    // Update a client's status
    /*
    viewModel.updateStatus = function(index, status) {
        // Find client by index
        var client = viewModel.getItem(index);
    };
    */
    
    return viewModel;
}

function handleErrors(response) {
	if (!response.ok) {
		console.log(JSON.stringify(response));

		if (response.status === 403) {
			navigation.signOut();
		}

		throw Error(response.statusText);
	}
	return response;
}

module.exports = ClientsViewModel;