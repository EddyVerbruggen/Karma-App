'use strict';

var tabViewModule = require("ui/tab-view");
var Observable = require('data/observable').Observable;
var helpers = require('../../../../utils/widgets/helper');
var view = require("ui/core/view");
var observableArrayModule = require('data/observable-array').ObservableArray;
var dialogs = require("ui/dialogs");

var page;
var isInit = true;
var parentView;
var pageData = new Observable({
    isLoading: true,
    pageTitle: "SCREENING",
    HButtonHidden: true,
    SearchButtonHidden: true
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
	parentView = page.getViewById("screening");

    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.onTap = function(){
 	dialogs.action({
		message: "Edit",
      	actions: ["No, never ask for references", "Atleast 1 references", "Atleast 2 references", "3 references"]
    }).then(function (result) {
      	if(result) alert(result);
    });   
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