'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{
    //"title": "Home View",
    //"moduleName": "components/homeView/homeView",
    "title": "Dashboard",
    "moduleName": "components/dashboardView/dashboardView",
    "icon": "\ue0dd"
}];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;