'use strict';

var Observable = require('data/observable').Observable;
var config = require('../../utils/config');
var handleResponse = require('../../utils/api/helpers').handleResponse;

function DashboardViewModel() {
    var viewModel = new Observable();

    viewModel.load = function() {
        var fetchData = fetch(config.apiUrl + 'users/dashboard.json', {
            headers: {
                Authorization: 'Bearer ' + config.token,
                TestData: config.testData
            }
    	});

        return fetchData
            .then(handleResponse)
            .then(function(data) {
            	// Create entry for every dashboard result in viewModel observable
            	for (var dashboard in data) {
            		viewModel.set(dashboard, data[dashboard]);
            	}
            });
    };

    return viewModel;
}

module.exports = DashboardViewModel;
