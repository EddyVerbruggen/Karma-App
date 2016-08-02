'use strict';

var tabViewModule = require("ui/tab-view");
var availabilityViewModel = require('./availability-view-model');
var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');
var view = require("ui/core/view");
var observableArrayModule = require('data/observable-array').ObservableArray;

var moment = require("moment");

var page;
var isInit = true;
var gridview;

var pageData = new Observable({
    weekdays: [
        {"day":"Mondays", "visibility":"visible"},
        {"day":"Tuesdays", "visibility":"collapse"},
        {"day":"Wednesdays", "visibility":"collapse"},
        {"day":"Thursdays", "visibility":"collapse"},
        {"day":"Fridays", "visibility":"collapse"},
        {"day":"Saturdays", "visibility":"collapse"},
        {"day":"Sundays", "visibility":"collapse"}
    ],
    isLoading: true
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
	gridview =  page.getViewById("gridview");
    
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.toggle = function(args){
    var section = args.object.section;
    var i = 0;
    
	var a = gridview.getViewById(section);
    if(a.visibility == "visible"){
    	a.visibility = "collapse";   
    }else{
        a.visibility = "visible";
    }
   	
}