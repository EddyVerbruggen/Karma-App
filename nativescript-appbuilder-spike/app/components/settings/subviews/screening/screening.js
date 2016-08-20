'use strict';

var Observable = require('data/observable').Observable;
var settingUtils = require('../../../../utils/settings');
var pageData = new Observable({
    pageTitle: "SCREENING",
    SideMenuHidden: true,
    SearchButtonHidden: true
});
var settings;

exports.onTapDialog = settingUtils.onTapDialog;
exports.onToggle = settingUtils.onToggle;
exports.onLoaded = settingUtils.onLoaded;
exports.onNavigatedTo = function(args) {
    var page = args.object;
    pageData.set('settings') = page.navigationContext.pageData.get('settings');

    page.bindingContext = pageData;

    var newPageData = settingUtils.updateSettingsText('screening', pageData);
    pageData = newPageData;

    // Get variables with pageData.get('settings').flag_screening_work_information
    // In the view, display via <Label text="{{settings.flag_screening_work_information}}" />
}
