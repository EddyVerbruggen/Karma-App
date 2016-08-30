var application = require('application'),
    navigation = require('./utils/navigation');
var appSettings = require("application-settings");

application.start({
    moduleName: navigation.startingPage()
});

application.on(application.launchEvent, function (args) {
    appSettings.setString('activeTab', 'dashboard');
});
