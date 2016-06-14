'use strict';
var dialogs = require("ui/dialogs"),
	Observable = require('data/observable').Observable,
	helpers = require('../utils/widgets/helper'),
    navigationViewModel = require('./navigation-view-model');

function onNavigatingTo(args) {
    var page = args.object;
    helpers.platformInit(page);
    page.bindingContext = {
        'navigationViewModel': navigationViewModel
    };
    navigationViewModel.set('pageTitle', 'nativeScriptApp');
}

function menuItemTap(args) {
    helpers.navigate(navigationViewModel.menuItems[args.index]);
}

exports.onNavigatingTo = onNavigatingTo;
exports.menuItemTap = menuItemTap;