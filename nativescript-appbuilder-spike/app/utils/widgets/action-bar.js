'use strict';

var frameModule = require('ui/frame');
var view = require('ui/core/view');
var observable = require('data/observable');

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
    var topmost = frameModule.topmost();
    topmost.navigate('navigation/navigation');
}

/* Display search box when search icon is tapped */
exports.onTapSearch = function() {
    var topFrame = frameModule.topmost();
    var currentPage = topFrame.currentPage;
    currentPage.showModal(views.search, '', function closeCallback() {
        
    }, true);
}
