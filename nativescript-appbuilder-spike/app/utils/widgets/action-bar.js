'use strict';

var Observable = require('data/observable').Observable;
var frameModule = require('ui/frame');
var view = require('ui/core/view');
var dialogs = require("ui/dialogs");

var views = require('../views');
var navigation = require('../navigation');

exports.onBack = function(args) {
    var dataEdited = args.object.dataEdited;
    if (args.object.dataEdited) {
        if (dataEdited == 'true') {
            dialogs.confirm({
                title: "Warning",
                message: "There are unsaved changes. Do you want to save ?",
                okButtonText: "Save",
                cancelButtonText: "Discard"
            }).then(function (result) {// result argument is boolean
                if (result) {
                    alert("Changes Saved");
                    frameModule.topmost().goBack();
                } else {
                    frameModule.topmost().goBack();
                }
            });
        } else {
            // Android only
            frameModule.topmost().goBack();
        }
	} else {
        frameModule.topmost().goBack();
    }
    
}

exports.toggleDrawer = function() {
    var sideDrawer = frameModule.topmost().getViewById('sideDrawer');
    sideDrawer.toggleDrawerState();
}

exports.onTapSearch = function() {
    var currentPage = frameModule.topmost().currentPage;
    currentPage.showModal(views.search, '', function closeCallback(type, id) {
        var targetComponent;
        if (type == 'booking') {
            targetComponent = 'appointmentDetails';
        } else if (type == 'client') {
            targetComponent = 'clientDetails';
        } else {
            return;
        }

        navigation.goToPage(targetComponent);
    }, true);
}

exports.onSetting = function() {
    navigation.goToPage('settingsMenu');
}

exports.onLogout = function() {
    navigation.signOut();
}