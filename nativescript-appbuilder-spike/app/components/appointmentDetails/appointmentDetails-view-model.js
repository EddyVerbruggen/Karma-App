'use strict';
var Observable = require('data/observable').Observable;
var config = require('../../utils/config');
var mock = require('../../utils/test-data');
var handleResponse = require('../../utils/api/helpers').handleResponse;
var navigation = require('../../utils/navigation');

function AppointmentDetailsViewModel() {
    var viewModel = new Observable();
    var new_message = {};
    var now = new Date();
    
    viewModel.load = function(id) {
        var fetchData;
        // if (mock !== 'undefined') {
        //     fetchData = new Promise(function(resolve, reject) {
        //         return resolve(mock.appointmentDetails);
        //     });
        // } else {
            fetchData = fetch(config.apiUrl + 'appointment/' + id + '.json', {
                headers: {
                    Authorization: 'Bearer ' + config.token
                }
        	});
        // }

        return fetchData
            .then(handleResponse)
            .then(function(data) {
            	data = JSON.parse(data._bodyInit.replace(new RegExp('/', 'g'), ''));
                viewModel.set('Result', data.booking);
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

		new_message.type = "message_user";
        new_message.message = message;        
        new_message.created = now.toLocaleDateString()+" "+now.toTimeString();
        
        return fetchData
            .then(handleResponse)
            .then(function(data) {
                viewModel.set('Result', data.Result);
            });
    };
       
    return viewModel;
}

module.exports = AppointmentDetailsViewModel;