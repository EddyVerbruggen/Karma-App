'use strict';
var appSettings = require("application-settings");
var observable = require('data/observable');

function SideDrawerViewModel(options) {
    options = options || {};

    var viewModel = new observable.Observable({
        clientsApprovedCount: options.clientsApprovedCount || 0,
        clientsPendingCount: options.clientsPendingCount || 0,
        clientsAllCount: options.clientsAllCount || 0,
        bookingsUpcomingCount: options.bookingsUpcomingCount || 0,
        bookingsPendingCount: options.bookingsPendingCount || 0,
        bookingsCancelledCount: options.bookingsAllCount || 0,
        bookingsAllCount: options.bookingsAllCount || 0,
        name: appSettings.getString('name')
    });
    
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
