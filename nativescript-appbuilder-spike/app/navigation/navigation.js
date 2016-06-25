'use strict';

var dialogs = require("ui/dialogs");
var Observable = require('data/observable').Observable;
var helpers = require('../utils/widgets/helper');
var navigationViewModel = require('./navigation-view-model');

var pageData = new Observable({
    navigationViewModel: navigationViewModel,
    backButtonHidden: true
});

exports.onNavigatingTo = function(args) {
    var page = args.object;
    helpers.platformInit(page);
    page.bindingContext = pageData;
    navigationViewModel.set('pageTitle', 'nativeScriptApp');
}

exports.menuItemTap = function(args) {
    helpers.navigate(navigationViewModel.menuItems[args.index]);
}
