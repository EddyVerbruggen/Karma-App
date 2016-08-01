'use strict';
var isInit = true;
var helpers = require('../../utils/widgets/helper');
var viewModel = require('./homeView-view-model');
var views = require('../../utils/views');
var	slideContainer;
var page;

function pageLoaded(args) {
    page = args.object;
	slideContainer = page.getViewById("slides");
	page.actionBarHidden = true;
    
    helpers.platformInit(page);
    page.bindingContext = viewModel;

    if (isInit) {
        isInit = false;
    }
}

exports.login = function(args){
	helpers.navigate({
    	moduleName: views.dashboard,
    });
}

exports.register = function(args){
    helpers.navigate({
        moduleName: views.dashboard,
    });
}

exports.pageLoaded = pageLoaded;