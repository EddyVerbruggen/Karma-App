'use strict';

var tabViewModule = require("ui/tab-view");
var AppointmentDetailsViewModel = require('./appointmentDetails-view-model');
var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');

var isInit = true;
var appointmentDetails = new AppointmentDetailsViewModel();
var pageData = new Observable({
    appointmentDetails: appointmentDetails,
    isLoading: true
});

exports.onLoaded = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
	appointmentDetails
		.load()
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your appointments list');
    	})
		.then(function() {
        	pageData.set('appointmentDetails', appointmentDetails.Result);
			helpers.togglePageLoadingIndicator(false, pageData);
		});

    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}
