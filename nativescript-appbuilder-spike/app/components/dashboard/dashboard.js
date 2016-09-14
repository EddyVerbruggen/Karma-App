'use strict';
var Observable = require('data/observable').Observable;
var appSettings = require("application-settings");

var helpers = require('../../utils/widgets/helper');
var views = require('../../utils/views');
var DashboardViewModel = require('./dashboard-view-model');

var page;
var isInit = true;
var dashboard = new DashboardViewModel();
var pageData = new Observable({
    dashboard: dashboard,
    backButtonHidden: true,
    pageTitle: "KARMA"
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
	appSettings.setString('activeTab', 'dashboard');
    helpers.platformInit(page);
    
	dashboard
		.load()
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your settings');
    	})
		.then(function() {
        	// pageData.set('Dashboard', Dashboard);
			helpers.togglePageLoadingIndicator(false, pageData);
		});    
}

exports.onSelectAppointment = function(args) {
    helpers.tapFlash(args.object).then(function() {
        helpers.navigate({
            moduleName: views.appointmentDetails,
            context: {
                id: args.view.bookingId
            }
        });        
    });
}

exports.onSelectClient = function(args) {
    // alert(args.view.screeningId);
    helpers.tapFlash(args.object).then(function() {
        helpers.navigate({
            moduleName: views.clientDetails,
            context: {
                id: args.view.screeningId,
                name: args.view.clientName
            }
        });
    });
}
