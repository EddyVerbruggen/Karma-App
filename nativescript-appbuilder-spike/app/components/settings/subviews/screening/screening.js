'use strict';

var Observable = require('data/observable').Observable;
var settingUtils = require('../../../../utils/settings');
var pageData;
var settings;

exports.onTapDialog = settingUtils.onTapDialog;
exports.onToggle = settingUtils.onToggle;
exports.onNavigatedTo = function(args) {
    var page = args.object;
    pageData = page.navigationContext.pageData;
    settings = pageData.get('settings');
    
    page.bindingContext = pageData;
    
    var newPageData = settingUtils.updateSettingsText('screening', pageData);
    pageData = newPageData;
    
    // Get variables with pageData.get('settings').flag_screening_work_information
    // In the view, display via <Label text="{{settings.flag_screening_work_information}}" />
}
