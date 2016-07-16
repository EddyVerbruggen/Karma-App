'use strict';

var tabViewModule = require("ui/tab-view");
var AppointmentDetailsViewModel = require('./appointmentDetails-view-model');
var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');
var view = require("ui/core/view");
var observableArrayModule = require('data/observable-array').ObservableArray;
var PickerManager= require("nativescript-timedatepicker");

var page;
var isInit = true;
var appointmentDetails = new AppointmentDetailsViewModel();
var pageData = new Observable({
    appointmentDetails: appointmentDetails,
    messageHistory: new observableArrayModule(),
    isLoading: true,
    LocationVisible: false
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
        
        	if(pageData.messageHistory.length == 0){
				appointmentDetails.Result.history.forEach(function(message) {
					pageData.messageHistory.push(message);
            	})
            }
			helpers.togglePageLoadingIndicator(false, pageData);
		});
    
    //Redirect to History tab
    var gotData = page.navigationContext;
    if(gotData.from == "messages"){
    	page.getViewById("appointments-tabs").selectedIndex = 1;
    }
    
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.sendMessage = function(args) {
    if(page.getViewById("message_box").text){
        var new_message = {};
        var now = new Date();
        
        new_message.type = "message_user";
        new_message.message = page.getViewById("message_box").text;
        new_message.created = now.toLocaleDateString() + " " + now.toTimeString();
        pageData.messageHistory.push(new_message);
        
		var mScroller = page.getViewById("myScroller");
        var offset = mScroller.scrollableHeight + parseInt(40); // get the current scroll height
        setTimeout(
            function(){
        		mScroller.scrollToVerticalOffset(offset, true); // scroll to the bottom        
            }
        , 5) ;
                
        page.getViewById("message_box").text = "";
    }
}

exports.openDatePicker = function(args){
    var DateCallback = function (result) {
        if (result) {
            alert(JSON.stringify(pageData.appointmentDetails.date));
            pageData.appointmentDetails.date = result;
        }
    };
    
    //Initialize the PickerManager (.init(yourCallback, title, initialDate))
    PickerManager.init(DateCallback,null,null);
    
    //Show the dialog
    PickerManager.showDatePickerDialog();
}

exports.openTimePicker = function(args){
    var TimeCallback = function (result) {
        if (result) {
            alert(JSON.stringify(pageData.appointmentDetails.time));
            pageData.appointmentDetails.time = result;
        }
    };
    
    //Initialize the PickerManager (.init(yourCallback, title, initialDate))
    PickerManager.init(TimeCallback,null,null);
    
    //Show the dialog
    PickerManager.showTimePickerDialog();
}

exports.openLocationPopup = function(){
    openOverlay('LocationPopupBody', 'LocationVisible');
}

function openOverlay(overlayId, visibilityFlag) {
    pageData.set(LocationVisible, true);
    page.getViewById(overlayId).animate({
        opacity: 0.95,
        duration: 300
    });
}

function closeOverlay(overlayId, visibilityFlag) {
    return page.getViewById(overlayId).animate({
        opacity: 0,
        duration: 300
    }).then(function() {
        pageData.set(visibilityFlag, false);
    });
}