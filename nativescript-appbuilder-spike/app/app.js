var application = require('application'),
    navigation = require('./shared/navigation');

// START_CUSTOM_CODE_nativeScriptApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_nativeScriptApp
application.start({
    moduleName: navigation.startingPage()
});