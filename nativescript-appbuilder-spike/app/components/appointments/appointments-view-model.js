'use strict';

var config = require('../../utils/config');
var Observable = require('data/observable').Observable;
//var ObservableArray = require('data/observable-array').ObservableArray;
var mock = require('../../utils/test-data');
var handleResponse = require('../../utils/api/helpers').handleResponse;
var navigation = require('../../utils/navigation');

function AppointmentsViewModel() {
    var viewModel = new Observable();
    var bookingDates = [];
    //var bookingDates = new ObservableArray();
    
    // Load all clients
    viewModel.load = function(status) {
        status = status || 'confirmed';

        var fetchData;
        // if (mock !== 'undefined') {
        //     fetchData = new Promise(function(resolve, reject) {
        //         return resolve(mock.appointments);
        //     });
        // } else {
            fetchData = fetch(config.apiUrl + 'appointments/index.json', {
                headers: {
                    Authorization: 'Bearer ' + config.token
                }
            });
        // }
        
        return fetchData
            .then(handleResponse)
            .then(function(data) {
            	viewModel.set('types', data.types);
            
            	bookingDates.emptyBookings();
            	data.booking_dates.forEach(function(booking) {
            		bookingDates.push(booking);
            	});
            	viewModel.set('booking_dates',bookingDates);
            });
    };
    
    bookingDates.emptyBookings = function() {
        while (bookingDates.length) {
            bookingDates.pop();
        }
    };
    
    return viewModel;
}

module.exports = AppointmentsViewModel;