'use strict';

var frameModule = require('ui/frame');
var view = require('ui/core/view');
var observable = require('data/observable');
var views = require('../views');
var helpers = require('./helper');

exports.onBack = function() {
    // Android only
    var topmost = frameModule.topmost();
    topmost.goBack();
}

exports.toggleDrawer = function() {
    var sideDrawer = frameModule.topmost().getViewById('sideDrawer');
    sideDrawer.toggleDrawerState();
}

exports.onIndex = function() {
    topmost.navigate('navigation/navigation');
}

/* Display search box when search icon is tapped */
exports.onTapSearch = function() {
    var topmost = frameModule.topmost();
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
        
        helpers.navigate(targetComponent);
        
    }, true);
}

exports.onSetting = function(){
    var topmost = frameModule.topmost();
    // alert("hii");
    helpers.navigate({
    	moduleName: views.settingsMenu
    });
}