'use strict';
var appSettings = require("application-settings");
var observable = require('data/observable').Observable;
var config = require('../../utils/config');
var handleResponse = require('../../utils/api/helpers').handleResponse;

function SideDrawerViewModel(options) {
    options = options || {};

    var viewModel = new observable();
    
    viewModel.load = function() {
        
        var fetchData = fetch(config.apiUrl + 'users/drawer.json', {
                headers: {
                    Authorization: 'Bearer ' + config.token,
                    TestData: config.testData
                }
        	});
        
        return fetchData
            .then(handleResponse)
            .then(function(data) {
            	for (var key in data) {
                    viewModel.set(key, data[key]);
                }
            });
    };
    
    return viewModel;
}

function handleErrors(response) {
	if (!response.ok) {
		//console.log(JSON.stringify(response));
		throw Error(response.statusText);
	}
	return response;
}

module.exports = SideDrawerViewModel;
