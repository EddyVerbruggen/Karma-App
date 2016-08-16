'use strict';

var Observable = require('data/observable').Observable;
var config = require('../../utils/config');
var handleResponse = require('../../utils/api/helpers').handleResponse;

function SettingsViewModel() {
    var viewModel = new Observable();

    viewModel.load = function() {
        var fetchData = fetch(config.apiUrl + 'settings/index.json', {
            headers: {
                Authorization: 'Bearer ' + config.token
            }
    	});

        return fetchData
            .then(handleResponse)
            .then(function(data) {
                viewModel.set('Result', data);
            });
    };

    return viewModel;
}

module.exports = SettingsViewModel;
