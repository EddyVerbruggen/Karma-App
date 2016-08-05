'use strict';
var isInit = true;
var helpers = require('../../utils/widgets/helper');
var Observable = require('data/observable').Observable;
// var viewModel = require('./settingsMain-view-model');
var views = require('../../utils/views');
var page;

var pageData = new Observable({
    isLoading: true,
    backButtonHidden: true,
    pageTitle: "SETTINGS",
    SearchButtonHidden: true
});

function pageLoaded(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
    
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.onTap = function(args) {
    try{
		var section = args.object.section;
        helpers.navigate({
            moduleName: 'components/settings/subviews/' + section + '/' + section,
        });   
    }catch(q){ }
}

exports.pageLoaded = pageLoaded;