'use strict';
var Observable = require('data/observable').Observable;
var AppointmentsViewModel = require('./appointments-view-model');
var helpers = require('../../utils/widgets/helper');

var isInit = true;
var appointmentsList = new AppointmentsViewModel();
var pageData = new Observable({
    appointmentsList: appointmentsList,
    isLoading: false,
    selectedStatusFilter: 'confirmed'
});

exports.onLoaded = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
    helpers.togglePageLoadingIndicator(true, pageData);
	appointmentsList
		.load()
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your appointments list');
    	})
		.then(function() {
        	helpers.togglePageLoadingIndicator(false, pageData);
		});
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.onTapStatusFilter = function(args) {
    var oldStatus = pageData.get('selectedStatusFilter');
    if (!args.object.status) {
        throw Error('Error not defined');
    }

    helpers.togglePageLoadingIndicator(true, pageData);
	pageData.set('selectedStatusFilter', args.object.status);

    // Load new filter data
	appointmentsList
		.load(args.object.status)
		.catch(function(error) {
        	pageData.set('selectedStatusFilter', oldStatus);
        	helpers.handleLoadError(error, 'Sorry, we could not update your appointments list');
    	})
		.then(function() {
        	helpers.togglePageLoadingIndicator(false, pageData);
		});
}
