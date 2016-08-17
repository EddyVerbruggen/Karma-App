'use strict';

var tabViewModule = require("ui/tab-view");
var ClientDetailsViewModel = require('./clientDetails-view-model');
var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');
var dialogs = require("ui/dialogs");

var page;
var isInit = true;
var clientDetails = new ClientDetailsViewModel();
var pageData = new Observable({
    clientDetails: clientDetails,
    isLoading: true,
    pageTitle: "",
    HButtonHidden: true,
    SearchButtonHidden: true
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
    var gotData = page.navigationContext;
	pageData.set('pageTitle', gotData.name);
    
	clientDetails
		.load(gotData.id)
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your clients list');
    	})
		.then(function() {
        	pageData.set('clientDetails', clientDetails);
			helpers.togglePageLoadingIndicator(false, pageData);
		});
	
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.approve = function(args){
    dialogs.confirm({
      	title: "Approve",
      	message: "Are you sure you want to confirm ?",
      	okButtonText: "Approve",
      	cancelButtonText: "Cancel"
    }).then(function (result) {
      	// result argument is boolean
      	console.log("Dialog result: " + result);
    });
}

exports.reject = function(args){
    dialogs.confirm({
      	title: "Reject",
      	message: "Are you sure you want to reject ?",
      	okButtonText: "Reject",
      	cancelButtonText: "Cancel"
    }).then(function (result) {
      	// result argument is boolean
      	console.log("Dialog result: " + result);
    });
}

exports.delete = function(args){
    dialogs.confirm({
      	title: "Delete",
      	message: "Are you sure you want to delete ?",
      	okButtonText: "Delete",
      	cancelButtonText: "Cancel"
    }).then(function (result) {
      	// result argument is boolean
      	console.log("Dialog result: " + result);
    });
}

exports.tagTap = function(args){
	console.log(args.object.text);
}