'use strict';
var Observable = require('data/observable').Observable;
var observableArrayModule = require('data/observable-array').ObservableArray;

var page;
var closeCallback;

exports.onLoaded = function(args) {
    page = args.object;
    closeCallback = args.closeCallback;
}

exports.dismiss = function() {
    closeCallback();
}

exports.submit = function(args) {
    if (page.getViewById("password").text)
        closeCallback(page.getViewById("password").text);
}