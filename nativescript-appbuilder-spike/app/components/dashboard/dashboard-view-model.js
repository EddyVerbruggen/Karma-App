'use strict';

var Observable = require('data/observable').Observable;
var ViewModel = new Observable({
    pageTitle: 'Dashboard View',
    // additional properties
});

module.exports = ViewModel;