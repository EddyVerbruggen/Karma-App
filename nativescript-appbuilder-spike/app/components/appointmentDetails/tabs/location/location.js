'use strict';
var Observable = require('data/observable').Observable;
var observableArrayModule = require('data/observable-array').ObservableArray;

var page, parentView, location;
var closeCallback;
var pageData = new Observable({
    appointmentDetails: new observableArrayModule(),
    address: "",
    incall: false,
    outcall: false
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    closeCallback = args.closeCallback;
    parentView = page.getViewById("locationModal");
    
    pageData.set('appointmentDetails', args.context.appointmentDetails);
    
    var locationCall = pageData.get('appointmentDetails').get('location').split("-");
    pageData.address = locationCall[1].trim();
    locationCall = locationCall[0].trim();
    
    if (locationCall.toLowerCase() == "outcall") {
        pageData.set('outcall', true);
        pageData.set('incall', false);
    } else {
        pageData.set('outcall', false);
        pageData.set('incall', true);
    }
    
}

exports.toggleRadio = function(args){
    var section = args.object.section;
    var incall = parentView.getViewById("incall");
    var outcall = parentView.getViewById("outcall");

    if (section === "incall") {
        if (pageData.incall == false) {
            pageData.set('outcall', false);
	        pageData.set('incall', true);
        }
    }
    
    if (section === "outcall") {      
        if (pageData.outcall == false) {
            pageData.set('outcall', true);
	        pageData.set('incall', false);
        }
    }
}

exports.closeModal = function(args){
    if (pageData.get('incall')) {
        pageData.get('appointmentDetails').set('location', "Incall - " + pageData.address);
    } else {
        pageData.get('appointmentDetails').set('location', "Outcall - " + pageData.address);        
    }
    
    // page.closeModal(pageData.appointmentDetails);
    closeCallback(pageData.get('appointmentDetails').get('location'));
}