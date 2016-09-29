'use strict';

var dialogs = require("ui/dialogs");
var Observable = require('data/observable').Observable;
var timer = require("timer");
var appSettings = require("application-settings");

var SideDrawerViewModel = require('./side-drawer-view-model');
var helper = require('./helper');
var views = require('../views');

var page;
var sideDrawer = new SideDrawerViewModel();
var pageData = new Observable({
    sideDrawer: sideDrawer,
    activeTab: 'dashboard',
    user_role: ''
});

exports.onLoad = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    getDrawerData();
    
    pageData.set(user_role, appSettings.getString('role'));

    if (appSettings.getString('activeTab')) {
        pageData.activeTab = appSettings.getString('activeTab');
    }
    
    timer.setInterval(() => {
    	getDrawerData();
	}, 1000*60*5);
}

function getDrawerData() {
    sideDrawer
        .load()
        .catch(function(error) {
            helpers.handleLoadError(error, 'Sorry, we could not load your clients list');
        })
        .then(function() {
            // helpers.togglePageLoadingIndicator(false, pageData);
        });
}

exports.onTap = function(args) {
    var section = args.object.section;
    appSettings.setString('activeTab', section);
	helper.tapFlash(args.object, '#333', '#1B1C25').then(function() {
        helper.navigate({
            moduleName: 'components/' + section + '/' + section,
            context: {
                type: args.object.type
            }
        });
    });
}

exports.onTapDashboard = function(args) {
    var section = args.object.section;
    appSettings.setString('activeTab', 'dashboard');
	helper.tapFlash(args.object, '#333', '#1B1C25').then(function() {
        helper.navigate({
            moduleName: views.dashboard,
        });
    });
}
