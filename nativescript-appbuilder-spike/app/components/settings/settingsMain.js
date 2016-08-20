'use strict';

var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');
var SettingsViewModel = require('./settingsMain-view-model');
var views = require('../../utils/views');
var page;

var settings = new SettingsViewModel();
var pageData = new Observable({
    backButtonHidden: false,
    SideMenuHidden: true,
    pageTitle: "SETTINGS",
    SearchButtonHidden: true
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
        	pageData.set('settings', settings.Result);
			helpers.togglePageLoadingIndicator(false, pageData);
		});
}

exports.onTap = function(args) {
    try {
		var section = args.object.section;
        helpers.navigate({
            moduleName: 'components/settings/subviews/' + section + '/' + section,
            context: {
                pageData: pageData
            }
        });
    } catch(q) {
        alert(q);
    }
}
