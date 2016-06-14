'use strict';

var dialogs = require("ui/dialogs"),
    SideDrawerViewModel = require('./side-drawer-view-model'),
    helper = require('./helper');

function onLoad(args) {
    var page = args.object;
    var sideDrawerModel = new SideDrawerViewModel();
    page.bindingContext = sideDrawerModel;
}

function onTap(event) {
    var section = event.object.section;

    // Navigate to a different page
    helper.navigate({
        moduleName: '/components/' + section + 'View/' + section + 'View',
        type: event.object.type
    })
}

exports.onLoad = onLoad;
exports.onTap = onTap;