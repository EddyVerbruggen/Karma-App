'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({
    pageTitle: 'Client Listings'
});

module.exports = ViewModel;