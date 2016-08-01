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

var pageData = new Observable({
    weekdays: [
        {"day":"Mondays"},
        {"day":"Tuesdays"},
        {"day":"Wednesdays"},
        {"day":"Thursdays"},
        {"day":"Fridays"},
        {"day":"Saturdays"},
        {"day":"Sundays"}
    ],
    isLoading: true
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);

    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}