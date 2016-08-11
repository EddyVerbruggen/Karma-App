'use strict';

var tabViewModule = require("ui/tab-view");
var Observable = require('data/observable').Observable;
var helpers = require('../../../../utils/widgets/helper');
var view = require("ui/core/view");
var observableArrayModule = require('data/observable-array').ObservableArray;
var dialogs = require("ui/dialogs");
var saveSetting = require('');

var page;
var isInit = true;
var parentView;
var pageData = new Observable({
    isLoading: true,
    pageTitle: "LANDING PAGE",
    HButtonHidden: true,
    SearchButtonHidden: true
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

exports.edit = function(){
    dialogs.prompt({
		title: "Edit Text",
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

exports.delete = function(){
	dialogs.confirm("Are you sure ?").then(function (result) {
      	alert(result);
    });
}

exports.upload = function(){

}