'use strict';
var Observable = require('data/observable').Observable;
var observableArrayModule = require('data/observable-array').ObservableArray;

var page, parentView, location;
var closeCallback;
var pageData = new Observable({
    address: "",
    incall: false,
    outcall: false
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    closeCallback = args.closeCallback;
    parentView = page.getViewById("calendarModal");
}

exports.closeModal = function(args) {
    closeCallback();
}

exports.onDateSelected = function(args) {
    // alert(args);
}