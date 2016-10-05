var application = require('application');
var navigation = require('./utils/navigation');
var appSettings = require("application-settings");
// var firebase = require("nativescript-plugin-firebase");

// firebase.init({
//   // Optionally pass in properties for database, authentication and cloud messaging,
//   // see their respective docs.
// }).then(
//   function (instance) {
//     console.log("firebase.init done");
//   },
//   function (error) {
//     console.log("firebase.init error: " + error);
//   }
// );


application.start({
    moduleName: navigation.startingPage()
});

application.on(application.launchEvent, function (args) {
    appSettings.setString('activeTab', 'dashboard');
});