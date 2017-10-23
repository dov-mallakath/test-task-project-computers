'use strict';

const jsonReports = process.cwd() + "/reports/json";
const Reporter = require("./support/reporter.js");

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    baseUrl: 'http://computer-database.herokuapp.com',
    capabilities: {
        'browserName': 'firefox'
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        'features/*.feature'
    ],
    cucumberOpts: {
        require: ['steps/*_steps.js','../support/*.j'],
        format: ['summary', 'json:./reports/json/cucumber_report.json'],
        strict: true
    },
    onPrepare: function() {
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
        Reporter.createDirectory(jsonReports);
    },
    onComplete: function () {
        Reporter.createHTMLReport();
        Reporter.createAllureXML();
    }
};