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
    
    // Load all clients
    viewModel.load = function(status) {
        status = status || 'confirmed';

        var fetchData = fetch(config.apiUrl + 'appointments/index.json' + '?status=' + status, {
                headers: {
                    Authorization: 'Bearer ' + config.token,
                    TestData: config.testData
                }
            });
        
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
    
    viewModel.loadMore = function(page, pageSize, status) {

        var fetchData = fetch(config.apiUrl + 'appointments/index.json?page=' + page + '&pageSize=' + pageSize + '&status=' + status, {
            headers: {
                Authorization: 'Bearer ' + config.token,
                TestData: config.testData
            }
        });

        return fetchData
            .then(handleResponse)
            .then(function(data) {
                viewModel.set('types', data.types);
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