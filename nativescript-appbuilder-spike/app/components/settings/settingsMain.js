'use strict';
var isInit = true;
var helpers = require('../../utils/widgets/helper');
// var viewModel = require('./settingsMain-view-model');
var views = require('../../utils/views');
var page;

function pageLoaded(args) {
    page = args.object;
    helpers.platformInit(page);
    page.bindingContext = viewModel;

    if (isInit) {
        isInit = false;
    }
}

exports.pageLoaded = pageLoaded;