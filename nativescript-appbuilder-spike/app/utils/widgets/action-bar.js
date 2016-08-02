'use strict';

var frameModule = require('ui/frame');
var view = require('ui/core/view');
var observable = require('data/observable');
var views = require('../views');
var helpers = require('./helper');
var navigation = require('../navigation');

exports.onBack = function() {
    // Android only
    var topmost = frameModule.topmost();
    topmost.goBack();
}

exports.toggleDrawer = function() {
    var sideDrawer = frameModule.topmost().getViewById('sideDrawer');
    sideDrawer.toggleDrawerState();
}

exports.onTapSearch = function() {
    var currentPage = topmost.currentPage;
    currentPage.showModal(views.search, '', function closeCallback(type, id) {
        var targetComponent;
        if (type == 'booking') {
            targetComponent = views.appointmentDetails;
        } else if (type == 'client') {
            targetComponent = views.clientDetails;
        } else {
            return;
        }
        // TODO: use navigation
        helpers.navigate(targetComponent);
        
    }, true);
}

exports.onSetting = function() {
    // TODO: utils/navigation
    helpers.navigate(views.settingsMenu);
}

exports.onLogout = function() {
    navigation.signOut();
}