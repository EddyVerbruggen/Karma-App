'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{
    "title": "dashboardView",
    "moduleName": "components/dashboardView/dashboardView",
    "icon": "\ue0dd"
},
{
    "title": "clientsView",
    "moduleName": "components/clientsView/clientsView",
    "icon": "\ue0dd"
},
{
    "title": "clientDetailsView",
    "moduleName": "components/clientDetailsView/clientDetailsView",
    "icon": "\ue0dd"
},
{
    "title": "appointmentsView",
    "moduleName": "components/appointmentsView/appointmentsView",
    "icon": "\ue0dd"
},
{
    "title": "appointmentDetailsView",
    "moduleName": "components/appointmentDetailsView/appointmentDetailsView",
    "icon": "\ue0dd"
}
];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;