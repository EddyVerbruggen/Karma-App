'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    viewModel = require('./homeView-view-model'),
	slideContainer;

function pageLoaded(args) {
    var page = args.object;
	slideContainer = page.getViewById("slides");

    helpers.platformInit(page);
    page.bindingContext = viewModel;

    if (isInit) {
        isInit = false;
    }
}

exports.pageLoaded = pageLoaded;