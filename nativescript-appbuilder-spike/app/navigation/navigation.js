'use strict';
var dialogs = require("ui/dialogs");
var Observable = require('data/observable').Observable;
var helpers = require('../utils/widgets/helper');
var navigationViewModel = require('./navigation-view-model');

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