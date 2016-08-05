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
    pageTitle: "SERVICES",
    HButtonHidden: true,
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

exports.edit = function(){
	dialogs.prompt({
		title: "Edit Service",
      	okButtonText: "Save",
      	cancelButtonText: "Cancel",
      	neutralButtonText: "Delete",
      	defaultText: "",
      	inputType: dialogs.inputType.text
    }).then(function (r) {
      	// console.log("Dialog result: " + r.result + ", text: " + r.text);
        dialogs.alert("Dialog result: " + r.result + ", text: " + r.text).then(function() {

        });
    });
}

exports.fabTap = function(args) {
    dialogs.prompt({
		title: "New Service",
      	okButtonText: "Save",
      	cancelButtonText: "Cancel",
      	defaultText: "",
      	inputType: dialogs.inputType.text
    }).then(function (r) {
      	// console.log("Dialog result: " + r.result + ", text: " + r.text);
        dialogs.alert("Dialog result: " + r.result + ", text: " + r.text).then(function() {

        });
    });
} 