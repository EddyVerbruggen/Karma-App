'use strict';

var page;
var closeCallback;

exports.onLoaded = function(args) {
    page = args.object;
    closeCallback = args.closeCallback;
}

exports.dismiss = function() {
    closeCallback();
}

exports.save = function(args) {
    if (page.getViewById("npassword").text == page.getViewById("cpassword").text) {
    	closeCallback(page.getViewById("cpassword").text);   
    } else {
        alert("Password mismatch");
    }
}