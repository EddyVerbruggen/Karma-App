'use strict';
var menuItems;
var observable = require('data/observable');
var navigationViewModel = new observable.Observable();
var views = require('../utils/views');

menuItems = [{
    "title": "dashboard",
    "moduleName": views.dashboard,
    "icon": "\ue0dd"
},
{
    "title": "clients",
    "moduleName": views.clientListing,
    "icon": "\ue0dd"
},
{
    "title": "clientDetails",
    "moduleName": views.clientDetails,
    "icon": "\ue0dd"
},
{
    "title": "appointments",
    "moduleName": views.appointmentListing,
    "icon": "\ue0dd"
},
{
    "title": "appointmentDetails",
    "moduleName": views.appointmentDetails,
    "icon": "\ue0dd"
},
{
    "title": "settingsMain",
    "moduleName": views.settingsMenu,
    "icon": "\ue0dd"
}
];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;