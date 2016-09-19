'use strict';
var Observable = require('data/observable').Observable;
var observableArrayModule = require('data/observable-array').ObservableArray;

var page;
var closeCallback;
var parentView;

exports.onLoaded = function(args) {
    page = args.object;
    closeCallback = args.closeCallback;
    parentView = page.getViewById("newUserModal");
}

exports.dismiss = function() {
    closeCallback();
}

exports.toggleCheckbox = function(args){
    var section = args.object.section;
    var a = parentView.getViewById("email");
    
    if(a.src == "~/images/ic_check_box_outline_blank_white.png"){
    	a.src = "~/images/ic_check_box_white.png";
    }else{
        a.src = "~/images/ic_check_box_outline_blank_white.png";
    }
}