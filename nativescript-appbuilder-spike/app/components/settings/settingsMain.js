'use strict';
var isInit = true;
var helpers = require('../../utils/widgets/helper');
var Observable = require('data/observable').Observable;
// var viewModel = require('./settingsMain-view-model');
var views = require('../../utils/views');
var page;

var pageData = new Observable({
    isLoading: true,
    backButtonHidden: false,
    SideMenuHidden: true,
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
    var section = args.object.section;
    
    // var modalPageModule = 'components/settings/subviews/' + section + '/' + section;
    // var context = args.context;
    // var fullscreen = true;
    // page.showModal(modalPageModule, context, function closeCallback(username, password) {
    // // Log the user in...

    // }, fullscreen);
    
    try{
    var section = args.object.section;
        helpers.navigate({
            moduleName: 'components/settings/subviews/' + section + '/' + section,
        });   
    }catch(q){ }
}

exports.pageLoaded = pageLoaded;