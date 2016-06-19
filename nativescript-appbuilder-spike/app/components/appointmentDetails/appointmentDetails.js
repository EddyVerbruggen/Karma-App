'use strict';

var tabViewModule = require("ui/tab-view");
//var AppointmentDetailsViewModel = require('./appointmentDetails-view-model');
var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');

var isInit = true;
//var appointmentDetails = new AppointmentDetailsViewModel();
var pageData = new Observable({
//    appointmentDetails: appointmentDetails,
    isLoading: true
});

function onLoaded(args) {
    var page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
	/*clientDetails
		.load()
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your clients list');
    	})
		.then(function() {
        	pageData.set('clientDetails', clientDetails.Result);
			helpers.togglePageLoadingIndicator(false, pageData);
		});
	*/
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.onLoaded = onLoaded;