'use strict';

var dialogs = require("ui/dialogs");
var SideDrawerViewModel = require('./side-drawer-view-model');
var helper = require('./helper');
var views = require('../views');

exports.onLoad = function(args) {
    var page = args.object;
    var sideDrawerModel = new SideDrawerViewModel();
    page.bindingContext = sideDrawerModel;
}

exports.onTap = function(args) {
    var section = args.object.section;
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
	helper.tapFlash(args.object, '#333', '#1B1C25').then(function() {
        helper.navigate({
            moduleName: views.dashboard,
        });
    });
}
