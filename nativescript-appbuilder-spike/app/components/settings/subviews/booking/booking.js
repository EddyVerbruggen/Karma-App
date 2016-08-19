'use strict';

var tabViewModule = require("ui/tab-view");
var Observable = require('data/observable').Observable;
var helpers = require('../../../../utils/widgets/helper');
var view = require("ui/core/view");
var observableArrayModule = require('data/observable-array').ObservableArray;

var page;
var isInit = true;
var parentView;
var pageData = new Observable({
    isLoading: true,
    pageTitle: "BOOKING",
	SideMenuHidden: true,
    SearchButtonHidden: true
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
	parentView = page.getViewById("booking");

    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
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