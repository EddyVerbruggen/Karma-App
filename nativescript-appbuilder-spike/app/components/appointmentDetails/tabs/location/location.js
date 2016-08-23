'use strict';
var Observable = require('data/observable').Observable;
var observableArrayModule = require('data/observable-array').ObservableArray;

var page, parentView, location;
var pageData = new Observable({
    appointmentDetails: new observableArrayModule(),
    address: "",
    incall: false,
    outcall: false
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    parentView = page.getViewById("locationModal");
    
    pageData.set('appointmentDetails', args.context.appointmentDetails);
    
    var locationCall = pageData.appointmentDetails.location.split("-");
    pageData.address = locationCall[1].trim();
    locationCall = locationCall[0].trim();
    
    if (locationCall.toLowerCase() == "outcall") {
        pageData.outcall = true;
        pageData.incall = false;
    } else {
        pageData.incall = true;
        pageData.outcall = false;
    }
    
}

exports.toggleRadio = function(args){
    var section = args.object.section;
    var incall = parentView.getViewById("incall");
    var outcall = parentView.getViewById("outcall");

    if (section == "incall") {
        if (pageData.incall == false) {
            pageData.incall = true;
            pageData.outcall = false;
        }
    }
    
    if (section == "outcall") {      
        if (pageData.outcall == false) {
            pageData.incall = false;
            pageData.outcall = true;
        }
    }
}

exports.closeModal = function(args){
    if (pageData.incall) {
        pageData.appointmentDetails.location = "Incall - " + pageData.address;
    } else {
        pageData.appointmentDetails.location = "Outcall - " + pageData.address;
    }
    
    page.closeModal(pageData.appointmentDetails);
}