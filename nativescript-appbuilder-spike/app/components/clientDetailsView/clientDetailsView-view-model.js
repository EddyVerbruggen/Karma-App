'use strict';
var Observable = require('data/observable').Observable;
var config = require('../../utils/config');
var mock = require('../../utils/test-data');
var handleResponse = require('../../utils/api/helpers').handleResponse;
var navigation = require('../../utils/navigation');

function ClientDetailsViewModel() {
    var viewModel = new Observable();
    
    viewModel.load = function(id) {
        var fetchData;
        if (mock !== 'undefined') {
            fetchData = new Promise(function(resolve, reject) {
                return resolve(mock.clientDetails);
            });
        } else {
            fetchData = fetch(config.apiUrl + 'client_details/' + id, {
                headers: {
                    Authorization: 'Bearer ' + config.token
                }
        	});
        }

        return fetchData
            .then(handleResponse)
            .then(function(data) {
                viewModel.set('Result', data.Result);
            });
    };
    
    return viewModel;
}

module.exports = ClientDetailsViewModel;