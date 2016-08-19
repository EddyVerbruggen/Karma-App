'use strict';

var tabViewModule = require("ui/tab-view");
var availabilityViewModel = require('./availability-view-model');
var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');
var view = require("ui/core/view");
var observableArrayModule = require('data/observable-array').ObservableArray;
var PickerManager = require("nativescript-timedatepicker");
var moment = require("moment");
var dialogs = require("ui/dialogs");

var page;
var isInit = true;
var parentView;

var pageData = new Observable({
    weekdays: [
        {"day":"Mondays", "visibility":"visible", "availability":"11:00 AM (PST)", "location":"Incall, Outcall"},
        {"day":"Tuesdays", "visibility":"collapse", "availability":"11:00 AM (PST)", "location":"Outcall"},
        {"day":"Wednesdays", "visibility":"collapse", "availability":"11:00 AM (PST)", "location":"Incall, Outcall"},
        {"day":"Thursdays", "visibility":"collapse", "availability":"11:00 AM (PST)", "location":"Outcall"},
        {"day":"Fridays", "visibility":"collapse", "availability":"11:00 AM (PST)", "location":"Incall"},
        {"day":"Saturdays", "visibility":"collapse", "availability":"11:00 AM (PST)", "location":"Incall"},
        {"day":"Sundays", "visibility":"collapse", "availability":"11:00 AM (PST)", "location":"Outcall"}
    ],
    travel: [
        {"city":"Miami", "visibility":"visible", "date":"July 23, 2016 - August 6, 2016", "location":"Incall, Outcall", "availability":"12PM - 11AM"},
        {"city":"Los Angeles", "visibility":"collapse", "date":"July 23, 2016 - August 6, 2016", "location":"Incall, Outcall", "availability":"12PM - 11AM"},
        {"city":"Florida", "visibility":"collapse", "date":"July 23, 2016 - August 6, 2016", "location":"Incall, Outcall", "availability":"12PM - 11AM"}
    ],
    isLoading: true,
    backButtonHidden: true,
    pageTitle: "AVAILABILITY"
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
	parentView = page.getViewById("availability-tabs");
    
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.toggle = function(args){
    var section = args.object.section;
    var a = parentView.getViewById(section);
    
    if(a.visibility == "visible"){
    	a.visibility = "collapse";
    }else{
        a.visibility = "visible";
    }  	
}

exports.toggleCheckbox = function(args){
    var section = args.object.section;
    var a = parentView.getViewById(section);
    
    if(a.src == "~/images/ic_check_box_outline_blank_white.png"){
    	a.src = "~/images/ic_check_box_white.png";
    }else{
        a.src = "~/images/ic_check_box_outline_blank_white.png";
    }
}

exports.selectTime = function(args){
	var TimeCallback = function (result) {
        if (result) {
            result = result.split(" ");
            result = moment(result[3], "HH:mm");
            alert(result.format('LT'));
        }
    };
    
    //Initialize the PickerManager (.init(yourCallback, title, initialDate))
    PickerManager.init(TimeCallback, null, null);
    
    //Show the dialog
    PickerManager.showTimePickerDialog();
}

exports.selectDate = function(){
    var DateCallback = function (result) {
        if (result) {
            result = result.split(" ");
            result = moment(result[1]+"-"+result[0]+"-"+result[2], "MM-DD-YYYY");
            alert(result.format('LLLL'));
        }
    };
    
    //Initialize the PickerManager (.init(yourCallback, title, initialDate))
    PickerManager.init(DateCallback, null, null);
    
    //Show the dialog
    PickerManager.showDatePickerDialog();
}

exports.delete = function(args){
    dialogs.confirm("Are you sure you want to delete?").then(function (result) {
		console.log("Dialog result: " + result);
    });
}