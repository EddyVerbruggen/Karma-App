'use strict';
var Observable = require('data/observable').Observable;
var config = require('../../utils/config');
var mock = require('../../utils/test-data');
var handleResponse = require('../../utils/api/helpers').handleResponse;
var navigation = require('../../utils/navigation');

function AppointmentDetailsViewModel() {
    var viewModel = new Observable();
    
    viewModel.load = function(id) {
        var fetchData;
        if (mock !== 'undefined') {
            fetchData = new Promise(function(resolve, reject) {
                return resolve(mock.appointmentDetails);
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
    
    viewModel.sendMessage = function(message) {
        var fetchData;
        if (mock !== 'undefined') {
            fetchData = new Promise(function(resolve, reject) {
                return resolve(mock.appointmentDetails);
            });
        } else {
            fetchData = fetch(config.apiUrl + 'client_details/' + id, {
                headers: {
                    Authorization: 'Bearer ' + config.token
                }
        	});
        }

        var new_message = {};
		new_message.type = "message_user";
        new_message.message = message;
        var now = new Date();
        new_message.created = now.toLocaleDateString()+" "+now.toTimeString();
        // mock.appointmentDetails.result.history.push(new_message);
        
        return fetchData
            .then(handleResponse)
            .then(function(data) {
            	alert(data);
                // viewModel.set('Result', data.Result);
            });
    };
       
    return viewModel;
}

module.exports = AppointmentDetailsViewModel;