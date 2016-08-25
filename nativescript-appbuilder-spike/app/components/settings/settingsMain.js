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
        "userName": "jennycandy07",
        "name": "Jenny Mathers",
        "email": "jennycandy857@gmail.com",
        "mobile": "123-456-7890",
        "password": "password",
        "timeZone": "GMT-05:00 Eastern Time (EST)"
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

exports.editText = function(args) {
    var id = args.object.id;
    dialogs.prompt({
		title: "Edit",
      	okButtonText: "Save",
      	cancelButtonText: "Cancel",
      	defaultText: args.object.text,
      	inputType: dialogs.inputType.text
    }).then(function (r) {
        if (r.result) {
        	pageData.get('settingsInfo').set(args.object.id, r.text);
        }
    });
}

exports.onTap = function(args) {
    var section = args.object.section;
    
    helpers.tapFlash(args.object, '#333', '#F3F3F3').then(function() {
        helpers.navigate({
            moduleName: 'components/settings/subviews/' + section + '/' + section,
            context: {
                pageData: pageData
            }
        });
    });
    
    // helpers.navigate({
    //     moduleName: 'components/settings/subviews/' + section + '/' + section,
    //     context: {
    //         pageData: pageData
    //     }
    // });
};
