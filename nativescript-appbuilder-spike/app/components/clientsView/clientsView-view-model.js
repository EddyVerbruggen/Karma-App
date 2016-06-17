'use strict';
var config = require('../../shared/config');
var ObservableArray = require('data/observable-array').ObservableArray;
var navigation = require('../../shared/navigation');

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
    // Observable array of clients
    var viewModel = new ObservableArray(clients)
    
    // Load all clients
    viewModel.load = function(status) {
        status = status || 'all';
        /* Stub with client data */
        // http://nativescript.github.io/quick-start/
        return new Promise(function(resolve, reject) {
            return resolve({
                ok: true,
                Result: [
                    {
                        client_id: 1,
                        screening_id: 1,
                        client_name: 'Client 1',
                        profile_image: 'http://www.image.com',
                        status_text: 'Pending...'
                    },
                    {
                        client_id: 2,
                        screening_id: 3,
                        client_name: 'Client 2',
                        profile_image: 'http://www.image.com',
                        status_text: 'Approved'
                    }
                ]
            });
        })

        /*return fetch(config.apiUrl + 'clients/' + status + '?fields=client_id,screening_id,client_name,profile_image,status, {
            headers: {
                Authorization: 'Bearer ' + config.token
            }
        })*/
        .then(handleErrors)
        .then(function(response) {
            return typeof(response) === 'string' ? response.json() : response;
        }).then(function(data) {
            viewModel.empty();
            data.Result.forEach(function(client) {
                viewModel.push(client);
            })
        })
    };
    
    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };
    
    // Update a client's status
    viewModel.updateStatus = function(index, status) {
        // Find client by index
        var client = viewModel.getItem(index);
        
        
    };
    
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