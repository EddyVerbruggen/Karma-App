'use strict';

var tabViewModule = require("ui/tab-view");
var AppointmentDetailsViewModel = require('./appointmentDetails-view-model');
var Observable = require('data/observable').Observable;
var view = require("ui/core/view");
var observableArrayModule = require('data/observable-array').ObservableArray;
var dialogs = require("ui/dialogs");

var views = require('../../utils/views');
var helpers = require('../../utils/widgets/helper');
var PickerManager = require("nativescript-timedatepicker");
var moment = require("moment");

var page, root, parentView;
var isInit = true;
var appointmentDetails = new AppointmentDetailsViewModel();
var pageData = new Observable({
    appointmentDetails: appointmentDetails,
    messageHistory: new observableArrayModule(),
    isLoading: true,
    LocationVisible: false,
    dataEdited: false,
    canAccept: false,
    pageTitle: "APPOINTMENT",
    SideMenuHidden: true,
    SearchButtonHidden: true
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
    parentView = page.getViewById("appointments-tabs");
	// root = args.context.context;
    var gotData = page.navigationContext;
	
    appointmentDetails
		.load(gotData.id)//.load(args.context.id)
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your appointments list');
    	})
		.then(function() {
        	pageData.set('appointmentDetails', new Observable(appointmentDetails.Result));
        
        	if (pageData.get('messageHistory').length === 0) {
				appointmentDetails.Result.history.forEach(function(message) {
					pageData.get('messageHistory').push(message);
            	})
            }
			helpers.togglePageLoadingIndicator(false, pageData);
        	onDataEdited(false);
		});
    
    if (page.navigationContext.from == "messages") {//Redirect to History tab
        page.getViewById("appointments-tabs").selectedIndex = 1;
    }   
    
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.ClientDetail = function(args) {

    helpers.navigate({
        moduleName: views.clientDetails,
        context: {
            id: args.view.clientId
        }
    });        

}

exports.sendMessage = function(args) {
    if (page.getViewById("message_box").text) {
        var new_message = {};
        var now = new Date();
        
        new_message.type = "message_user";
        new_message.message = page.getViewById("message_box").text;
        new_message.created = now.toLocaleDateString() + " " + now.toTimeString();
        pageData.get('messageHistory').push(new_message);
        
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

exports.openDatePicker = function(args) {
    if (pageData.get('appointmentDetails').get('canEdit')) {
		var DateCallback = function (result) {
        	if (result) {
            	result = result.split(" ");
                result = moment(result[1]+"-"+result[0]+"-"+result[2], "MM-DD-YYYY");
                pageData.get('appointmentDetails').set('date', result.format('LLLL'));
                onDataEdited(true);
            }
		};

        var rawDate = pageData.get('appointmentDetails').get('date').split(",");
		var dt = new Date(rawDate[1].trim() + " " + rawDate[2].trim());
        
        PickerManager.init(DateCallback, null, dt);//Initialize the PickerManager (.init(yourCallback, title, initialDate))
        PickerManager.showDatePickerDialog();   
    }
}

exports.openTimePicker = function(args){
    if (pageData.get('appointmentDetails').get('canEdit')) {
        var TimeCallback = function (result) {
            if (result) {
                result = result.split(" ");
                result = moment(result[3], "HH:mm");
                pageData.get('appointmentDetails').set('time', result.format('LT'));
                onDataEdited(true);
            }
        };

        var rawTime = pageData.get('appointmentDetails').get('time').split(" ");
		var rawTime2 = rawTime[0].split(":");
        var rawTime3 = rawTime2[1].substring(0, rawTime2[1].length - 2);
        var tm = new Date(2011, 0, 1, rawTime2[0], rawTime3, 0, 0);
        
        PickerManager.init(TimeCallback, null, tm);//Initialize the PickerManager (.init(yourCallback, title, initialDate))
        PickerManager.showTimePickerDialog();
    }
}

exports.openLocationPopup = function(args){
    if (pageData.get('appointmentDetails').get('canEdit')) {
        var modalPageModule = 'components/appointmentDetails/tabs/location/location';
        var context = {
            appointmentDetails: pageData.get('appointmentDetails')//pageData.appointmentDetails
        };
        var fullscreen = false;
        // root.showModal(modalPageModule, context, function closeCallback(location, address) {
        page.showModal(modalPageModule, context, function closeCallback(args) {
            if (args)
                pageData.get('appointmentDetails').set('location', args);
            onDataEdited(true);
        }, fullscreen);
    }
}

exports.confirm = function(args){
    dialogs.confirm({
      	title: "Confirm",
      	message: "Are you sure?",
      	okButtonText: "Confirm",
      	cancelButtonText: "Cancel"
    }).then(function (result) {// result argument is boolean
      	console.log("Dialog result: " + result);
        // updateAppointment(pageData.appointmentDetails);
    });
}

exports.cancel = function(args){
    dialogs.confirm({
      	title: "Cancel",
      	message: "Are you sure you want to cancel ?",
      	okButtonText: "Yes",
      	cancelButtonText: "No"
    }).then(function (result) {// result argument is boolean
      	console.log("Dialog result: " + result);
        // updateAppointment(pageData.appointmentDetails);
    });
}

exports.delete = function(args){
    dialogs.confirm({
      	title: "Delete",
      	message: "Are you sure you want to delete ?",
      	okButtonText: "Delete",
      	cancelButtonText: "Cancel"
    }).then(function (result) {// result argument is boolean
      	console.log("Dialog result: " + result);
        // updateAppointment(pageData.appointmentDetails);
    });
}

function updateAppointment(postData) {
    appointmentDetails
		.update(postData)
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not update your appointments list');
    	})
		.then(function() {
        	pageData.set('appointmentDetails', appointmentDetails.Result);
        
        	if (pageData.get('messageHistory').length === 0) {
				appointmentDetails.Result.history.forEach(function(message) {
					pageData.messageHistory.push(message);
            	})
            }
			helpers.togglePageLoadingIndicator(false, pageData);
		});
}

function onDataEdited(flag) {
    
    var button = parentView.getViewById("confirmButton");
    var client_status_text = pageData.get('appointmentDetails').get('client_status_text');
    pageData.set('dataEdited', flag);
    
    if (pageData.get('appointmentDetails').get('canAccept')) {
        if (client_status_text != "Approved" && !pageData.get('dataEdited')) { //CONFIRM
			button.text = "Confirm";
        }

        if (client_status_text != "Approved" && pageData.get('dataEdited')) { //SAVE&CONFIRM
            button.text = "Save & Confirm";
        }

        if (client_status_text == "Approved" && pageData.get('dataEdited')) { //SAVE
            button.text = "Save";
        }
    }
}
