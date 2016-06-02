'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({
    pageTitle: 'Client Details'
});

module.exports = ViewModel;