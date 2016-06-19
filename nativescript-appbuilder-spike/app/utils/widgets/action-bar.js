'use strict';

var frameModule = require('ui/frame');
var view = require('ui/core/view');
var observable = require('data/observable');

function onBack() {
    // Android only
    var topmost = frameModule.topmost();
    topmost.goBack();
}

function toggleDrawer(args) {
    var sideDrawer = frameModule.topmost().getViewById('sideDrawer');
    sideDrawer.toggleDrawerState();
}

function onIndex() {
    var topmost = frameModule.topmost();
    topmost.navigate('navigation/navigation');
}

exports.toggleDrawer = toggleDrawer;
exports.onBack = onBack;
exports.onIndex = onIndex;
