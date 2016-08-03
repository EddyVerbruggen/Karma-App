'use strict';

var tabViewModule = require("ui/tab-view");
var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');
var view = require("ui/core/view");
var observableArrayModule = require('data/observable-array').ObservableArray;

var page;
var isInit = true;
var parentView;

var pageData = new Observable({
    visitList:[
        {
            "datetime":"Jul 29 01:25PM", 
            "ip":"194.55.43.2", 
            "location":"Denver, CO", 
            "url":"http://www.google.co.in",
            "duration":"5m 33s",
            "actionText":"No action",
            "action":"noaction",
            "name":"John Carter"
        },{
            "datetime":"Jul 29 01:25PM", 
            "ip":"194.55.43.2", 
            "location":"Denver, CO", 
            "url":"http://www.google.co.in",
            "duration":"5m 33s",
            "actionText":"No action",
            "action":"noaction",
            "name":"John Carter"
        },{
            "datetime":"Jul 29 01:25PM", 
            "ip":"194.55.43.2", 
            "location":"Denver, CO", 
            "url":"http://www.google.co.in",
            "duration":"5m 33s",
            "actionText":"Booked",
            "action":"booked",
            "name":"John Carter"
        },{
            "datetime":"Jul 29 01:25PM", 
            "ip":"194.55.43.2", 
            "location":"Denver, CO", 
            "url":"http://www.google.co.in",
            "duration":"5m 33s",
            "actionText":"No action",
            "action":"noaction",
            "name":"John Carter"
        }
    ],
    isLoading: true
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
	parentView = page.getViewById("visitors-tabs");
    
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}