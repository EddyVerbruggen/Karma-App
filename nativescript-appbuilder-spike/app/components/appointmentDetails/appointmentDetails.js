'use strict';

var tabViewModule = require("ui/tab-view");
var AppointmentDetailsViewModel = require('./appointmentDetails-view-model');
var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');
var view = require("ui/core/view");
var observableArrayModule = require('data/observable-array').ObservableArray;

var page;
var isInit = true;
var appointmentDetails = new AppointmentDetailsViewModel();
var pageData = new Observable({
    appointmentDetails: appointmentDetails,
    messageHistory: new observableArrayModule(),
    isLoading: true
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
    
	appointmentDetails
		.load()
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your appointments list');
    	})
		.then(function() {
        	pageData.set('appointmentDetails', appointmentDetails.Result);
        	pageData.set('messageHistory', appointmentDetails.Result.history);
			helpers.togglePageLoadingIndicator(false, pageData);
		});
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.sendMessage = function(args) {
    if(page.getViewById("message_box").text.length > 0){
        var new_message = {};
        var now = new Date();
        
        new_message.type = "message_user";
        new_message.message = page.getViewById("message_box").text;
        new_message.created = now.toLocaleDateString() + " " + now.toTimeString();

        pageData.messageHistory.push(new_message);
        pageData.set('messageHistory', pageData.messageHistory);
        alert(pageData.messageHistory);
	
        page.getViewById("message_box").text = "";
    }
}
