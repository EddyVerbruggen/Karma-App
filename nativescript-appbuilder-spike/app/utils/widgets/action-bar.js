'use strict';

var frameModule = require('ui/frame');
var view = require('ui/core/view');
var observable = require('data/observable');
var views = require('../views');
var navigation = require('../navigation');

exports.onBack = function() {
    // Android only
    frameModule.topmost().goBack();
}

exports.toggleDrawer = function() {
    var sideDrawer = frameModule.topmost().getViewById('sideDrawer');
    sideDrawer.toggleDrawerState();
}

exports.onTapSearch = function() {
    var currentPage = frameModule.topmost().currentPage;
    currentPage.showModal(views.search, '', function closeCallback(type, id) {
        var targetComponent;
        if (type == 'booking') {
            targetComponent = 'appointmentDetails';
        } else if (type == 'client') {
            targetComponent = 'clientDetails';
        } else {
            return;
        }

        navigation.goToPage(targetComponent);
    }, true);
}

exports.onSetting = function() {
    navigation.goToPage('settingsMenu');
}

exports.onLogout = function() {
    navigation.signOut();
}