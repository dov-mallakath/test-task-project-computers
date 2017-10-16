'use strict';

let {defineSupportCode} = require('cucumber');
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let assert = require('cucumber-assert');
let GetComputersPage = require("../pages/get_computers_page");
let CreateComputerPage = require("../pages/create_computer_page");

const COMPUTER = "TestPC001";
const INTRODUCED_DATE = "2017-01-20";
const DISCONTINUED_DATE = "2018-12-01";
const EXPECTED_TITLE = "Add a computer";
const COMPUTER_EDIT = "Edit computer";
const COMPUTER_FOUND = "One computer found";
const COMPUTER_UPDATED = "Done! Computer TestPC001 has been updated";
const COMPUTER_CREATED = "Done! Computer TestPC001 has been created";
const COMPUTER_DELETED = "Done! Computer has been deleted";
const NO_RESULTS = "No computers found";

let isGenerator = require('is-generator');
let Promise = require('bluebird');

const {Given, When, Then, After, Status} = require("cucumber");

defineSupportCode(function ({setDefinitionFunctionWrapper}) {
    setDefinitionFunctionWrapper(function (fn) {
        if (isGenerator.fn(fn)) {
            return Promise.coroutine(fn);
        } else {
            return fn;
        }
    });
});

After(function(scenario) {
    if (scenario.result.status === Status.FAILED) {
        const attach = this.attach; // cucumber's world object has attach function which should be used
        return browser.takeScreenshot().then(function(png) {
            const decodedImage = new Buffer(png, "base64");
            return attach(decodedImage, "image/png");
        });
    }
});

Given('The computers page is opened one', function () {
    this.page = new CreateComputerPage();
    this.pageGet = new GetComputersPage();
    return this.pageGet.openComputersListPage();
});

When('I press Add a new computer button one', function () {
    browser.wait(this.page.urlChanged("http://computer-database.herokuapp.com/computers"), 5000);
    return this.pageGet.addNewComputer();
});

Then('Add a computer page is opened one', function* () {
    this.page = new CreateComputerPage();
    browser.wait(this.page.urlChanged("http://computer-database.herokuapp.com/computers/new"), 5000);
    yield expect(this.page.getPageHeader()).to.eventually.equal(EXPECTED_TITLE);
    yield expect(this.page.createButton.isPresent()).to.eventually.equal(true);
    yield expect(this.page.cancelButton.isPresent()).to.eventually.equal(true);
    yield expect(this.page.deleteButtonArray.then(function (items) {
        return items.length;
    }).catch((error) => {
        assert.equal(error, 'Promise error');
        done();
    })).to.eventually.equal(0);
});

When('I fill no fields and I press Create button', function () {
    return this.page.createNewComputer();
});

Then('I\'m restricted to create the computer without filling required fields', function* () {
    yield expect(this.page.errorDivArray.then(function (items) {
        return items.length;
    }).catch((error) => {
        assert.equal(error, 'Promise error');
        done();
    })).to.eventually.equal(1);
});

When('I fill required field with value {string}', function (string) {
    return this.page.enterComputerName(string);
});

When('Press Create button', function () {
    return this.page.createNewComputer();
});

Then('I return to computers list page', function* () {
    browser.wait(this.page.urlChanged("http://computer-database.herokuapp.com/computers"), 5000);
    this.pageGet = new GetComputersPage();
    yield expect(this.pageGet.getMessageWarning()).to.eventually.equal(COMPUTER_CREATED);
    yield expect(this.pageGet.getPageHeader()).to.eventually.contain("computers found");
});

When('I search the created computer by name {string}', function (string) {
    this.pageGet.setSearchValue(string);
    return this.pageGet.pressSearchButton();
});

Then('I find one result', function* () {
    yield expect(this.pageGet.getPageHeader()).to.eventually.equal(COMPUTER_FOUND);
    yield expect(this.pageGet.getFirstComputer().getText()).to.eventually.equal(COMPUTER);
    yield expect(this.pageGet.getFirstIntroduced()).to.eventually.equal("-");
    yield expect(this.pageGet.getFirstDiscontinued()).to.eventually.equal("-");
    yield expect(this.pageGet.getFirstCompany()).to.eventually.equal("-");
    yield expect(this.pageGet.computersLink.then(function (items) {
        return items.length;
    }).catch((error) => {
        assert.equal(error, 'Promise error');
        done();
    })).to.eventually.equal(1);
});

When('I open the created computer', function () {
    return this.pageGet.getFirstComputer().click();
});

Then('All form data is present and valid', function* () {
    this.page = new CreateComputerPage();
    yield expect(this.page.getPageHeader()).to.eventually.equal(COMPUTER_EDIT);
    yield expect(this.page.getComputerName()).to.eventually.equal(COMPUTER);
});

When('I enter wrong data for Date fields', function () {
    this.page.enterIntroducedDate("2017-01-32");
    this.page.enterDiscontinuedDate("2018-13-01");
    return this.page.createNewComputer();
});

Then('Fields are highlighted, computer not updated', function* () {
    yield expect(this.page.errorDivArray.then(function (items) {
        return items.length;
    }).catch((error) => {
        assert.equal(error, 'Promise error');
        done();
    })).to.eventually.equal(2);
});

When('I press cancel button', function () {
    return this.page.cancelNewComputerCreation();
});

Then('I return to the search page and make a search again', function* () {
    this.pageGet = new GetComputersPage();
    this.pageGet.setSearchValue(COMPUTER);
    this.pageGet.pressSearchButton();
    yield expect(this.pageGet.getPageHeader()).to.eventually.equal(COMPUTER_FOUND);
    yield expect(this.pageGet.computersLink.then(function (items) {
        return items.length;
    }).catch((error) => {
        assert.equal(error, 'Promise error');
        done();
    })).to.eventually.equal(1);
});

When('I open the created computer again', function () {
    return this.pageGet.getFirstComputer().click();
});

Then('Incorrect data is not saved', function* () {
    this.page = new CreateComputerPage();
    yield expect(this.page.getPageHeader()).to.eventually.equal(COMPUTER_EDIT);
    yield expect(this.page.getComputerName()).to.eventually.equal(COMPUTER);
    yield expect(this.page.getIntroducedDate()).to.eventually.equal("");
    yield expect(this.page.getDiscontinuedDate()).to.eventually.equal("");
});

When('I enter correct data for Date fields', function* () {
    this.page.enterIntroducedDate(INTRODUCED_DATE);
    this.page.enterDiscontinuedDate(DISCONTINUED_DATE);
    this.selectCompany = yield this.page.selectManufacturerByIndex(1);
    return this.page.createNewComputer();
});

Then('Computer is updated and saved', function* () {
    browser.wait(this.page.urlChanged("http://computer-database.herokuapp.com/computers"), 5000);
    this.pageGet = new GetComputersPage();
    yield expect(this.pageGet.getMessageWarning()).to.eventually.equal(COMPUTER_UPDATED);
    yield expect(this.pageGet.getPageHeader()).to.eventually.contain("computers found");
});

When('I search the updated computer by name {string}', function (string) {
    this.pageGet.setSearchValue(string);
    return this.pageGet.pressSearchButton();
});

Then('I find one updated result', function* () {
    yield expect(this.pageGet.getPageHeader()).to.eventually.equal(COMPUTER_FOUND);
    yield expect(this.pageGet.computersLink.then(function (items) {
        return items.length;
    }).catch((error) => {
        assert.equal(error, 'Promise error');
        done();
    })).to.eventually.equal(1);
    yield expect(this.pageGet.getFirstComputer().getText()).to.eventually.equal(COMPUTER);
    yield expect(this.pageGet.getFirstIntroduced()).to.eventually.equal(this.page.convertDate(INTRODUCED_DATE));
    yield expect(this.pageGet.getFirstDiscontinued()).to.eventually.equal(this.page.convertDate(DISCONTINUED_DATE));
    yield expect(this.pageGet.getFirstCompany()).to.eventually.equal(this.selectCompany);
});

When('I open the updated computer', function () {
    return this.pageGet.getFirstComputer().click();
});

Then('All updated form data is present and valid', function* () {
    this.page = new CreateComputerPage();
    yield expect(this.page.getPageHeader()).to.eventually.equal(COMPUTER_EDIT);
    yield expect(this.page.getComputerName()).to.eventually.equal(COMPUTER);
    yield expect(this.page.getIntroducedDate()).to.eventually.equal(INTRODUCED_DATE);
    yield expect(this.page.getDiscontinuedDate()).to.eventually.equal(DISCONTINUED_DATE);
    yield expect(this.page.getSelectedCompany()).to.eventually.equal(this.selectCompany);
});

When('I press Delete button', function () {
    return this.page.deleteComputer();
});

Then('Computer is deleted, message is displayed', function* () {
    browser.wait(this.page.urlChanged("http://computer-database.herokuapp.com/computers"), 5000);
    this.pageGet = new GetComputersPage();
    yield expect(this.pageGet.getMessageWarning()).to.eventually.equal(COMPUTER_DELETED);
    yield expect(this.pageGet.getPageHeader()).to.eventually.contain("computers found");
});


When('I search the deleted computer by name {string}', function (string) {
    this.pageGet.setSearchValue(string);
    return this.pageGet.pressSearchButton();
});

Then('I find no results', function* () {
    yield expect(this.pageGet.getPageHeader()).to.eventually.equal(NO_RESULTS);
    yield expect(this.pageGet.computersLink.then(function (items) {
        return items.length;
    }).catch((error) => {
        assert.equal(error, 'Promise error');
        done();
    })).to.eventually.equal(0);
});