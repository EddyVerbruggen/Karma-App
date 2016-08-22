'use strict';

var Observable = require('data/observable').Observable;
var settingUtils = require('../../../../utils/settings');
var pageData = new Observable({
    pageTitle: "SCREENING",
    SideMenuHidden: true,
    SearchButtonHidden: true
});

exports.onTapDialog = function(args) {
    settingUtils.onTapDialog(args, 'screening', pageData);
}

exports.onToggle = function(args) {
    settingUtils.onToggle(args, 'screening', pageData);
}

exports.onNavigatedTo = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
    pageData.set('settings', page.navigationContext.pageData.get('settings'));
    settingUtils.updateSettingsLabels('screening', pageData);
    settingUtils.updateSettingsCheckboxes(args.object.parent, 'screening', pageData);
}
