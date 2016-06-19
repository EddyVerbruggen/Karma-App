'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{
    "title": "dashboard",
    "moduleName": "components/dashboard/dashboard",
    "icon": "\ue0dd"
},
{
    "title": "clients",
    "moduleName": "components/clients/clients",
    "icon": "\ue0dd"
},
{
    "title": "clientDetails",
    "moduleName": "components/clientDetails/clientDetails",
    "icon": "\ue0dd"
},
{
    "title": "appointments",
    "moduleName": "components/appointments/appointments",
    "icon": "\ue0dd"
},
{
    "title": "appointmentDetails",
    "moduleName": "components/appointmentDetails/appointmentDetails",
    "icon": "\ue0dd"
},
{
    "title": "settingsMain",
    "moduleName": "components/settings/settingsMain",
    "icon": "\ue0dd"
}
];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;