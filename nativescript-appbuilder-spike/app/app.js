var application = require('application'),
    navigation = require('./utils/navigation');

application.start({
    moduleName: navigation.startingPage()
});