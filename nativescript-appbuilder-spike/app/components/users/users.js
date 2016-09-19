'use strict';

var Observable = require('data/observable').Observable;
var dialogs = require("ui/dialogs");

var helpers = require('../../utils/widgets/helper');
// var UsersViewModel = require('./users-view-model');
var views = require('../../utils/views');

var page;
var pageData = new Observable({
    usersList: [{
      "screening_id": 1,
      "client_name": "Jenny Smith",
      "last_login": "Tuesday, March 23, 2016",
      "isactive": true
    },{
      "screening_id": 2,
      "client_name": "Debra Taylor",
      "last_login": "",
      "isactive": false
    },{
      "screening_id": 3,
      "client_name": "Jessica Matthews",
      "last_login": "Tuesday, March 23, 2016",
      "isactive": true
    }],
    backButtonHidden: true,
    SideMenuHidden: false,
    pageTitle: "USERS",
    SearchButtonHidden: false,
    isLoading: true
});


exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
    helpers.togglePageLoadingIndicator(false, pageData);
    helpers.platformInit(page);
};

exports.toggleActive = function(args) {
    alert(args.view.screeningId);
}

exports.fabTap = function(args) {
    console.log('tapped');
}