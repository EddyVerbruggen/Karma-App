var application = require('application');
var navigation = require('./utils/navigation');
var appSettings = require("application-settings");

application.start({
    moduleName: navigation.startingPage()
});

application.on(application.launchEvent, function (args) {
    appSettings.setString('activeTab', 'dashboard');
    // appSettings.setBoolean('AppForground', true);
});

application.on(application.suspendEvent, function (args) {
    appSettings.setBoolean('AppForground', false);
});

// application.on(application.resumeEvent, function (args) {
//     appSettings.setBoolean('AppForground', true);
// });

// application.on(application.exitEvent, function (args) {
//     appSettings.setBoolean('AppForground', false);
// });

// application.on(application.lowMemoryEvent, function (args) {
//     appSettings.setBoolean('AppForground', false);
// });

// application.on(application.uncaughtErrorEvent, function (args) {
//     appSettings.setBoolean('AppForground', false);
// });