'use strict';

var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');
var SettingsViewModel = require('./settingsMain-view-model');
var views = require('../../utils/views');
var dialogs = require("ui/dialogs");

var page;
var settings = new SettingsViewModel();
var pageData = new Observable({
    settingsInfo: {
        "user_userName": "jennycandy07",
        "user_name": "Jenny Mathers",
        "user_email": "jennycandy857@gmail.com",
        "user_mobile": "123-456-7890",
        "user_password": "password",
        "user_timeZone": "GMT-05:00 Eastern Time (EST)"
    },
    backButtonHidden: false,
    SideMenuHidden: true,
    pageTitle: "SETTINGS",
    SearchButtonHidden: true,
    settings: settings,
    isLoading: true
});


exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
    helpers.platformInit(page);

    var test = pageData.get('settingsInfo');
    test = new Observable(test);
    pageData.set('settingsInfo', test);
    
	settings
		.load()
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your settings');
    	})
		.then(function() {
        	pageData.set('settings', settings);
			helpers.togglePageLoadingIndicator(false, pageData);
		});
};

var editText = function(args) {
    var id = args.object.id;
    dialogs.prompt({
    title: "Edit",
        // message: "Edit",
      	okButtonText: "Save",
      	cancelButtonText: "Cancel",
      	defaultText: args.object.text,
      	inputType: dialogs.inputType.text
    }).then(function (response) {
        if (response.result) {
    		pageData.get('settingsInfo').set(args.object.id, response.text);
        }
    });
}

exports.editText = editText;

exports.editWithPass = function(args) {
    editWithPass(args);
}

function editWithPass(args0) {
    var passwordPageModule = 'components/settings/dialogs/password/password';
    var context = {
        args: args0
    };
    var fullscreen = false;
    page.showModal(passwordPageModule, context, function closeCallback(args) {
        if (args) {
            if (args && args == pageData.get('settingsInfo').get('user_password')) {
                if (args0.object.id == 'user_password') {
                    changePass(args0);
                } else {
                    editText(args0);   
                }
            } else {
                incorrectPass(args0);
            }   
        }
    }, false);
}

function incorrectPass(args0) {
    var incorrectPageModule = 'components/settings/dialogs/incorrect/incorrect';
    var context = {
        args: args0
    };
    page.showModal(incorrectPageModule, context, function closeCallback(args) {
        if (args == "TRY_AGAIN") {
            editWithPass(args0);
        }
    }, false);  
}

function changePass(args0) {
    var changePageModule = 'components/settings/dialogs/edit/edit';
    var context = {
        args: args0
    };
    page.showModal(changePageModule, context, function closeCallback(args) {
        if (args) {
            pageData.get('settingsInfo').set('user_password', args);
        }
    }, false); 
}

exports.onTap = function(args) {
    var section = args.object.section;
    
    helpers.tapFlash(args.object, '#333', '#FFF').then(function() {
        helpers.navigate({
            moduleName: 'components/settings/subviews/' + section + '/' + section,
            context: {
                pageData: pageData
            }
        });
    });
};
