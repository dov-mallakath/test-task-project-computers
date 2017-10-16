'use strict';
require("babel-core").transform("code", {
    plugins: ["transform-async-to-generator"]
});


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

defineSupportCode(({After, Given, Then, When}) => {

    After((scenario, done) => done());

    Given('The computers page is opened one', function () {
        this.pageGet = new GetComputersPage();
        return this.pageGet.openComputersListPage();
    });

    When('I press Add a new computer button one', function () {
        return this.pageGet.addNewComputer();
    });

    Then('Add a computer page is opened one', function (callback) {
        this.page = new CreateComputerPage();
        browser.wait(this.page.urlChanged("http://computer-database.herokuapp.com/computers/new"), 5000);
        expect(this.page.getPageHeader()).to.eventually.equal(EXPECTED_TITLE).and.notify(callback);
        expect(this.page.createButton.isPresent()).to.eventually.equal(true).and.notify(callback);
        expect(this.page.cancelButton.isPresent()).to.eventually.equal(false).and.notify(callback);
        this.page.createButton.isPresent().then(function (isVisible) {
            assert.equal(true, isVisible);
        });
        expect(this.page.deleteButtonArray.then(function (items) {
            return items.length;
        }).catch((error) => {
            assert.equal(error, 'Promise error');
            done();
        })).to.eventually.equal(0).and.notify(callback);
    });

    When('I fill no fields and I press Create button', function () {
        return this.page.createNewComputer();
    });

    Then('I\'m restricted to create the computer without filling required fields', function (callback) {
        expect(this.page.errorDivArray.then(function (items) {
            return items.length;
        }).catch((error) => {
            assert.equal(error, 'Promise error');
            done();
        })).to.eventually.equal(0).and.notify(callback);
    });

    When('I fill required field with value {string}', function (string) {
        return this.page.enterComputerName(string);
    });

    When('Press Create button', function () {
        return this.page.createNewComputer();
    });

    Then('I return to computers list page', function (callback) {
        browser.wait(this.page.urlChanged("http://computer-database.herokuapp.com/computers"), 5000);
        this.pageGet = new GetComputersPage();
        expect(this.pageGet.getMessageWarning()).to.eventually.equal(COMPUTER_CREATED).and.notify(callback);
        expect(this.pageGet.getPageHeader()).to.eventually.contain("computers found").and.notify(callback);
    });

    When('I search the created computer by name {string}', function (string) {
        this.pageGet.setSearchValue(string);
        return this.pageGet.pressSearchButton();
    });

    Then('I find one result', function (callback) {
        expect(this.pageGet.getPageHeader()).to.eventually.equal(COMPUTER_FOUND).and.notify(callback);
        expect(this.pageGet.getFirstComputer().getText()).to.eventually.equal(COMPUTER+"ll").and.notify(callback);
        expect(this.pageGet.getFirstIntroduced()).to.eventually.equal("-ghghj").and.notify(callback);
        expect(this.pageGet.getFirstDiscontinued()).to.eventually.equal("-").and.notify(callback);
        expect(this.pageGet.getFirstCompany()).to.eventually.equal("-").and.notify(callback);
        expect(this.pageGet.computersLink.then(function (items) {
            return items.length;
        }).catch((error) => {
            assert.equal(error, 'Promise error');
            done();
        })).to.eventually.equal(1).and.notify(callback);
    });

    When('I open the created computer', function () {
        return this.pageGet.getFirstComputer().click();
    });

    Then('All form data is present and valid', function (callback) {
        this.page = new CreateComputerPage();
        expect(this.page.getPageHeader()).to.eventually.equal(COMPUTER_EDIT).and.notify(callback);
        expect(this.page.getComputerName()).to.eventually.equal(COMPUTER).and.notify(callback);
    });

    When('I enter wrong data for Date fields', function () {
        this.page.enterIntroducedDate("2017-01-32");
        this.page.enterDiscontinuedDate("2018-13-01");
        return this.page.createNewComputer();
    });

    Then('Fields are highlighted, computer not updated', function (callback) {
        callback();
        expect(this.page.errorDivArray.then(function (items) {
            return items.size;
        }).catch((error) => {
            assert.equal(error, 'Promise error');
            done();
        })).to.eventually.equal(2).and.notify(callback);
    });

    When('I press cancel button', function () {
        return this.page.cancelNewComputerCreation();
    });

    Then('I return to the search page and make a search again', function (callback) {
        this.pageGet = new GetComputersPage();
        this.pageGet.setSearchValue(COMPUTER);
        this.pageGet.pressSearchButton();
        expect(this.pageGet.getPageHeader()).to.eventually.equal(COMPUTER_FOUND).and.notify(callback);
        expect(this.pageGet.computersLink.then(function (items) {
            return items.length;
        }).catch((error) => {
            assert.equal(error, 'Promise error');
            done();
        })).to.eventually.equal(1).and.notify(callback);
    });

    When('I open the created computer again', function () {
        return this.pageGet.getFirstComputer().click();
    });

    Then('Incorrect data is not saved', function (callback) {
        this.page = new CreateComputerPage();
        expect(this.page.getPageHeader()).to.eventually.equal(COMPUTER_EDIT).and.notify(callback);
        expect(this.page.getComputerName()).to.eventually.equal(COMPUTER).and.notify(callback);
        expect(this.page.getIntroducedDate()).to.eventually.equal("").and.notify(callback);
        expect(this.page.getDiscontinuedDate()).to.eventually.equal("").and.notify(callback);
    });

    When('I enter correct data for Date fields', function () {
        this.page.enterIntroducedDate(INTRODUCED_DATE);
        this.page.enterDiscontinuedDate(DISCONTINUED_DATE);
        this.selectCompany = this.page.selectManufacturerByIndex(1);
        return this.page.createNewComputer();
    });

    Then('Computer is updated and saved', function (callback) {
        browser.wait(this.page.urlChanged("http://computer-database.herokuapp.com/computers"), 5000);
        this.pageGet = new GetComputersPage();
        expect(this.pageGet.getMessageWarning()).to.eventually.equal(COMPUTER_UPDATED).and.notify(callback);
        expect(this.pageGet.getPageHeader()).to.eventually.contain("computers found").and.notify(callback);
    });

    When('I search the updated computer by name {string}', function (string) {
        this.pageGet.setSearchValue(string);
        return this.pageGet.pressSearchButton();
    });

    Then('I find one updated result', function (callback) {
        expect(this.pageGet.getPageHeader()).to.eventually.equal(COMPUTER_FOUND).and.notify(callback);
        expect(this.pageGet.computersLink.then(function (items) {
            return items.length;
        }).catch((error) => {
            assert.equal(error, 'Promise error');
            done();
        })).to.eventually.equal(1).and.notify(callback);
        expect(this.pageGet.getFirstComputer().getText()).to.eventually.equal(COMPUTER).and.notify(callback);
        expect(this.pageGet.getFirstIntroduced()).to.eventually.equal(INTRODUCED_DATE).and.notify(callback);
        expect(this.pageGet.getFirstDiscontinued()).to.eventually.equal(DISCONTINUED_DATE).and.notify(callback);
        expect(this.pageGet.getFirstCompany()).to.eventually.equal(this.selectCompany).and.notify(callback);
    });

    When('I open the updated computer', function () {
        return this.pageGet.getFirstComputer().click();
    });

    Then('All updated form data is present and valid', function (callback) {
        this.page = new CreateComputerPage();
        expect(this.page.getPageHeader()).to.eventually.equal(COMPUTER_EDIT).and.notify(callback);
        expect(this.page.getComputerName()).to.eventually.equal(COMPUTER).and.notify(callback);
        expect(this.page.getIntroducedDate()).to.eventually.equal(INTRODUCED_DATE+1).and.notify(callback);
        expect(this.page.getDiscontinuedDate()).to.eventually.equal(DISCONTINUED_DATE).and.notify(callback);
        expect(this.page.getSelectedCompany()).to.eventually.equal(this.selectCompany).and.notify(callback);
    });

    When('I press Delete button', function () {
        return this.page.deleteComputer();
    });

    Then('Computer is deleted, message is displayed', function (callback) {
        browser.wait(this.page.urlChanged("http://computer-database.herokuapp.com/computers"), 5000);
        this.pageGet = new GetComputersPage();
        expect(this.pageGet.getMessageWarning()).to.eventually.equal(COMPUTER_DELETED).and.notify(callback);
        expect(this.pageGet.getPageHeader()).to.eventually.contain("computers found").and.notify(callback);
    });


    When('I search the deleted computer by name {string}', function (string) {
        this.pageGet.setSearchValue(string);
        return this.pageGet.pressSearchButton();
    });

    Then('I find no results', function (callback) {
        expect(this.pageGet.getPageHeader()).to.eventually.equal(NO_RESULTS).and.notify(callback);
        expect(this.pageGet.computersLink.then(function (items) {
            return items.length;
        }).catch((error) => {
            assert.equal(error, 'Promise error');
            done();
        })).to.eventually.equal(0).and.notify(callback);
    });

});