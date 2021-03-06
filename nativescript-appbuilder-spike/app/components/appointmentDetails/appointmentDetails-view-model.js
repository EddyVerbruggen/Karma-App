'use strict';
var Observable = require('data/observable').Observable;
var config = require('../../utils/config');
var handleResponse = require('../../utils/api/helpers').handleResponse;
var navigation = require('../../utils/navigation');

function AppointmentDetailsViewModel() {
    var viewModel = new Observable();
    var new_message = {};
    var now = new Date();
    
    viewModel.load = function(id) {
        var fetchData = fetch(config.apiUrl + 'appointments/view/' + id + '.json', {
                headers: {
                    Authorization: 'Bearer ' + config.token,
                    TestData: config.testData
                }
        	});

        return fetchData
            .then(handleResponse)
            .then(function(data) {
                viewModel.set('Result', data.booking);
            });
    };
    
    viewModel.update = function(appointmentInfo) {
        var fetchData = fetch(config.apiUrl + "appointments/update/" + appointmentInfo.id + ".json", {
            // Do a regular form POST instead of JSON body string
            method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
            body: appointmentInfo
        });

        return fetchData
            .then(handleResponse)
            .then(function(data) {
                viewModel.set('Result', data.booking);
            });
    };
    
    viewModel.sendMessage = function(message) {
        var fetchData = fetch(config.apiUrl + 'client_details/' + id, {
                headers: {
                    Authorization: 'Bearer ' + config.token
                }
			});
        
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