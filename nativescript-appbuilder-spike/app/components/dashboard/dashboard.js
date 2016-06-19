'use strict';
var isInit = true;
var helpers = require('../../utils/widgets/helper');
    // additional requires
    //viewModel = require('./dashboardView-view-model');

// additional functions
function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    //page.bindingContext = viewModel;
    // additional pageLoaded

    if (isInit) {
        isInit = false;

        // additional pageInit
    }
}

exports.pageLoaded = pageLoaded;