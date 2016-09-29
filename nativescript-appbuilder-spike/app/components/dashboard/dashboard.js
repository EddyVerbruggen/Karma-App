'use strict';
var Observable = require('data/observable').Observable;
var appSettings = require("application-settings");
var platform = require('platform');

var helpers = require('../../utils/widgets/helper');
var views = require('../../utils/views');
var DashboardViewModel = require('./dashboard-view-model');

var page;
var isInit = true;
var dashboard = new DashboardViewModel();
var pageData = new Observable({
    dashboard: dashboard,
    usersList: ['Jenny Taylor', 'Amber', 'Kandy Land', 'Pamela Anderson', 'Jenna Jameson', 'Lilly'],
    backButtonHidden: true,
    pageTitle: "KARMA",
    user_role: ''
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    pageData.set('user_role', appSettings.getString('role'));

	helpers.togglePageLoadingIndicator(true, pageData);
	appSettings.setString('activeTab', 'dashboard');
    helpers.platformInit(page);
    
    if (platform.device.os === platform.platformNames.android) { 
    	helpers.registerAndroid();
    } else {
        helpers.registerIOS();
    }
    
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
