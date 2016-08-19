'use strict';

var tabViewModule = require("ui/tab-view");
var Observable = require('data/observable').Observable;
var view = require("ui/core/view");
var observableArrayModule = require('data/observable-array').ObservableArray;
var helpers = require('../../utils/widgets/helper');

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
    referrers:[
        {
            "id":"1",
            "visits":"577", 
            "avgtime":"5m 33s",  
            "url":"http://www.google.co.in",
            "clients":"17",
            "appointments":"7",
            "aptlist":[]
        },{
            "id":"2",
            "visits":"577", 
            "avgtime":"5m 33s",  
            "url":"http://www.google.co.in",
            "clients":"17",
            "appointments":"7",
            "aptlist":[
                {"name":"John Smith", "status":"Pending", "appointment":"0"},
                {"name":"Peter Johnson", "status":"Approved", "appointment":"1"},
                {"name":"Mathew Jones", "status":"Rejected", "appointment":"0"},
                {"name":"Andrew Ladd", "status":"Pending", "appointment":"1"},
                {"name":"Blake Wheeler", "status":"Pending", "appointment":"0"}
            ]
        },{
            "id":"3",
            "visits":"577", 
            "avgtime":"5m 33s",  
            "url":"http://www.google.co.in",
            "clients":"17",
            "appointments":"7",
            "aptlist":[]
        }
    ],
    isLoading: true,
    backButtonHidden: true,
    pageTitle: "VISITORS"
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

exports.toggle = function(args){
    var section = args.object.section;
    var a = parentView.getViewById(section);
    // var b = parentView.getViewById(section+'arr');
    
    if(a.visibility == "visible"){
        a.visibility = "collapse";
        // b.src = "~/images/ic_keyboard_arrow_down.png";
    }else{
        a.visibility = "visible";
        // b.src = "~/images/ic_keyboard_arrow_up.png";
    }  
}