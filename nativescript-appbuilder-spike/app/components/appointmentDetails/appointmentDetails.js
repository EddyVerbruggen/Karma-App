'use strict';

var tabViewModule = require("ui/tab-view");
var AppointmentDetailsViewModel = require('./appointmentDetails-view-model');
var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');
var view = require("ui/core/view");
var observableArrayModule = require('data/observable-array').ObservableArray;
var views = require('../../utils/views');
var PickerManager = require("nativescript-timedatepicker");
var moment = require("moment");
var dialogs = require("ui/dialogs");

var page;
var isInit = true;
var parentView;
var appointmentDetails = new AppointmentDetailsViewModel();
var pageData = new Observable({
    appointmentDetails: appointmentDetails,
    messageHistory: new observableArrayModule(),
    isLoading: true,
    LocationVisible: false,
    pageTitle: "APPOINTMENTS",
    HButtonHidden: true,
    SearchButtonHidden: true
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
    parentView = page.getViewById("LocationPopupBody");
    var gotData = page.navigationContext;
       
	appointmentDetails
		.load(gotData.id)
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
    if(gotData.from == "messages"){
    	page.getViewById("appointments-tabs").selectedIndex = 1;
    }
    
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.ClientDetail = function(args){
	helpers.tapFlash(args.object).then(function() {
        helpers.navigate({
            moduleName: views.clientDetails,
            context: {
                id: args.view.clientId
            }
        });        
    });
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
            result = result.split(" ");
            result = moment(result[1]+"-"+result[0]+"-"+result[2], "MM-DD-YYYY");
            alert(result.format('LLLL'));
            pageData.appointmentDetails.date = result.format('LLLL');
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
            result = result.split(" ");
            result = moment(result[3], "HH:mm");
            alert(result.format('LT'));
            pageData.appointmentDetails.time = result.format('LT');
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

exports.onTapOverlay = function(args) {
    if (pageData.get('LocationVisible')) {
    	closeOverlay('LocationPopupBody', 'LocationVisible');
    }
}

function openOverlay(overlayId, visibilityFlag) {
    pageData.set(visibilityFlag, true);
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

exports.confirm = function(args){
    dialogs.confirm({
      	title: "Confirm",
      	message: "Are you sure?",
      	okButtonText: "Confirm",
      	cancelButtonText: "Cancel"
    }).then(function (result) {
      	// result argument is boolean
      	console.log("Dialog result: " + result);
        updateAppointment(pageData.appointmentDetails);
    });
}

exports.cancel = function(args){
    dialogs.confirm({
      	title: "Cancel",
      	message: "Are you sure you want to cancel ?",
      	okButtonText: "Yes",
      	cancelButtonText: "No"
    }).then(function (result) {
      	// result argument is boolean
      	console.log("Dialog result: " + result);
        updateAppointment(pageData.appointmentDetails);
    });
}

exports.delete = function(args){
    dialogs.confirm({
      	title: "Delete",
      	message: "Are you sure you want to delete ?",
      	okButtonText: "Delete",
      	cancelButtonText: "Cancel"
    }).then(function (result) {
      	// result argument is boolean
      	console.log("Dialog result: " + result);
        updateAppointment(pageData.appointmentDetails);
    });
}

function updateAppointment(postData){
    appointmentDetails
		.update(postData)
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not update your appointments list');
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
}

exports.toggleRadio = function(args){
    var section = args.object.section;
    var incall = parentView.getViewById("incall");
    var outcall = parentView.getViewById("outcall");

    if(section == "incall"){
        if(incall.src == "~/images/ic_radio_button_checked_white.png"){
            incall.src = "~/images/ic_radio_button_unchecked_white.png";
	        outcall.src = "~/images/ic_radio_button_checked_white.png";   
        }
        
        if(incall.src == "~/images/ic_radio_button_unchecked_white.png"){
            outcall.src = "~/images/ic_radio_button_unchecked_white.png";
	        incall.src = "~/images/ic_radio_button_checked_white.png";   
        }
    }
    
    if(section == "outcall"){
        if(outcall.src == "~/images/ic_radio_button_checked_white.png"){
            incall.src = "~/images/ic_radio_button_unchecked_white.png";
	        outcall.src = "~/images/ic_radio_button_checked_white.png";   
        }
        
        if(outcall.src == "~/images/ic_radio_button_unchecked_white.png"){
            incall.src = "~/images/ic_radio_button_unchecked_white.png";
	        outcall.src = "~/images/ic_radio_button_checked_white.png";   
        }
    }
}