'use strict';

var config = require('../../utils/config');
var ObservableArray = require('data/observable-array').ObservableArray;
var handleResponse = require('../../utils/api/helpers').handleResponse;
var navigation = require('../../utils/navigation');
var imageCache = require('../../utils/image-cache');

function ClientsViewModel(clients) {
    var viewModel = new ObservableArray(clients)
    
    // Load all clients
    viewModel.load = function(status, tag, sortby) {
        status = status || 'all';
        tag = tag || 'all';
        sortby = sortby || 'createddesc';

        var fetchData = fetch(config.apiUrl + 'clients/index.json', {
                headers: {
                    Authorization: 'Bearer ' + config.token,
                    TestData: config.testData
                }
        	});

        return fetchData
            .then(handleResponse)
            .then(function(data) {
                viewModel.empty();
            	data.clients.forEach(function(client) {
                    setTimeout(function(){ 
                    	client.profile_image = imageCache.getImages(client.profile_image);
                    	viewModel.push(client);
                    }, 100);
                })
            });
    };
    
    viewModel.loadMore = function(page, pageSize, status, tag, sortby) {
        status = status || 'all';
        tag = tag || 'all';
        sortby = sortby || 'createddesc';

        var fetchData = fetch(config.apiUrl + 'clients/index.json?page=' + page + '&pageSize=' + pageSize, {
                headers: {
                    Authorization: 'Bearer ' + config.token,
                    TestData: config.testData
                }
        	});

        return fetchData
            .then(handleResponse)
            .then(function(data) {
                data.clients.forEach(function(client) {
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