'use strict';
var Observable = require('data/observable').Observable;
var appSettings = require("application-settings");

var helpers = require('../../utils/widgets/helper');
var views = require('../../utils/views');
var DashboardViewModel = require('./dashboard-view-model');
var pushPlugin = require('nativescript-push-notifications');

var settings = {
    // Android settings
    senderID: '805278853835', // Android: Required setting with the sender/project number
    notificationCallbackAndroid: function(message, pushNotificationObject) { // Android: Callback to invoke when a new push is received.
        alert(JSON.stringify(message));
    },

    // iOS settings
    badge: true, // Enable setting badge through Push Notification
    sound: true, // Enable playing a sound
    alert: true, // Enable creating a alert

    // Callback to invoke, when a push is received on iOS
    notificationCallbackIOS: function(message) {
        alert(JSON.stringify(message));
    }
};

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
    
    // pushPlugin.register(settings,
    //     // Success callback
    //     function(token) {
    //         // if we're on android device we have the onMessageReceived function to subscribe
    //         // for push notifications
    //         if(pushPlugin.onMessageReceived) {
    //             pushPlugin.onMessageReceived(settings.notificationCallbackAndroid);
    //         }
    // console.log(token);
    //         // alert('Device registered successfully');
    //     },
    //     // Error Callback
    //     function(error) {
    //         alert(error);
    //     }
    // );
        
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
