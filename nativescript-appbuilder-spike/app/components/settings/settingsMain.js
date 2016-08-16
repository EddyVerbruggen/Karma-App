'use strict';
var isInit = true;
var helper = require('../../utils/widgets/helper');
var viewModel = require('./settingsMain-view-model');
var views = require('../../utils/views');
var page;

exports.pageLoaded = function(args) {
    page = args.object;
    helper.platformInit(page);
    page.bindingContext = viewModel;

    if (isInit) {
        isInit = false;
    }
}

exports.onTap = function(args) {
    try{
		var section = args.object.section;
        helper.navigate({
            moduleName: 'components/settings/subviews/' + section + '/' + section,
        });
    }catch(q){ }
}
