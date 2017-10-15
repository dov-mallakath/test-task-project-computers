'use strict';


let {defineSupportCode} = require('cucumber');
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let assert = require('cucumber-assert');
let GetComputersPage = require("../pages/get_computers_page");
let CreateComputerPage = require("../pages/create_computer_page");

// let CreateComputerSteps = function () {

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
            expect(this.page.getPageHeader()).to.eventually.equal(EXPECTED_TITLE).and.notify(callback);
            //expect(this.page.isElementPresent(this.page.createButton)).to.equal(true).and.notify(callback);
            expect(this.page.cancelButton.isPresent()).to.eventually.equal(false).and.notify(callback);
            //
            // assert.equal(false, this.page.isElementDisplayed(this.page.createButton)).and.notify(callback);
            // assert.equal(true, this.page.isElementDisplayed(this.page.cancelButton)).and.notify(callback);
            // assert.equal(true, this.page.isElementDisplayed(this.page.deleteButton));
            // assert.equal(0, this.page.countElements(this.page.createButton));
            // assert.equal(0, this.page.countElements(this.page.cancelButton));
            this.page.createButton.isPresent().then(function (isVisible) {
                //expect(isVisible).to.equal(true).and.notify(callback);//.and.notify(callback);
                assert.equal(true, isVisible);
                callback();
            });

            //callback();
            //assert.equal(0, this.page.countElements(this.page.deleteButtonArray));

            // this.page.createButton.then(function (items) {
            //     assert.equal(0, items.length)
            // });

            expect(this.page.deleteButtonArray.then(function (items) {
                return items.length;
            }).catch((error) => {
                assert.equal(error,'Promise error');
                done();
            })).to.eventually.equal(0).and.notify(callback);
            //expect(this.page.deleteButtonArray.count()).to.equal(0);
            //expect(this.page.createButton.isDisplayed()).to.eventually.be.false.and.notify(callback);
            // expect(this.page.isElementDisplayed(this.page.createButton)).to.equal(false).and.notify(callback);
            // expect(this.page.cancelButton.isDisplayed()).to.eventually.equal(true).and.notify(callback);
            // expect(this.page.deleteButton.isDisplayed()).to.eventually.equal(true).and.notify(callback);
            callback();
        });

        When('I fill no fields and I press Create button', function () {
            return this.page.createNewComputer();
        });

        Then('I\'m restricted to create the computer without filling required fields', function (callback) {
            expect(this.page.errorDivArray.then(function (items) {
                return items.length;
            }).catch((error) => {
                assert.equal(error,'Promise error');
                done();
            })).to.eventually.equal(0).and.notify(callback);
            callback();
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
            callback();
        });

        When('I search the created computer by name {string}', function (string) {
            this.pageGet.setSearchValue(string);
            return this.pageGet.pressSearchButton();
        });

        Then('I find one result', function (callback) {
            expect(this.pageGet.getPageHeader()).to.eventually.equal(COMPUTER_FOUND).and.notify(callback);
            expect(this.pageGet.computersLink.then(function (items) {
                return items.length;
            }).catch((error) => {
                assert.equal(error,'Promise error');
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
            callback();
        });

        When('I enter wrong data for Date fields', function () {
            this.page.enterIntroducedDate("2017-01-32");
            return this.page.enterDiscontinuedDate("2018-13-01");
        });

        Then('Fields are highlighted, computer not updated', function (callback) {
            expect(this.page.errorDivArray.then(function (items) {
                return items.length;
            }).catch((error) => {
                assert.equal(error,'Promise error');
                done();
            })).to.eventually.equal(2).and.notify(callback);
        });

        When('I enter correct data for Date fields', function () {
            this.page.enterIntroducedDate(INTRODUCED_DATE);
            return this.page.enterDiscontinuedDate(DISCONTINUED_DATE);
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
                assert.equal(error,'Promise error');
                done();
            })).to.eventually.equal(1).and.notify(callback);
        });

        When('I open the updated computer', function () {
            return this.pageGet.getFirstComputer().click();
        });

        Then('All updated form data is present and valid', function (callback) {
            this.page = new CreateComputerPage();
            expect(this.page.getPageHeader()).to.eventually.equal(COMPUTER_EDIT).and.notify(callback);
            expect(this.page.getComputerName()).to.eventually.equal(COMPUTER).and.notify(callback);
            expect(this.page.getIntroducedDate()).to.eventually.equal(INTRODUCED_DATE).and.notify(callback);
            expect(this.page.getDiscontinuedDate()).to.eventually.equal(DISCONTINUED_DATE).and.notify(callback);
        });

        When('I press Delete button', function () {
            return this.page.deleteButton.click();
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
                assert.equal(error,'Promise error');
                done();
            })).to.eventually.equal(0).and.notify(callback);
        });


    });









    // this.When('I calculate $first $operator $second', function (first, operator, second, callback) {
    //   this.page.setFirstValue(first);
    //   this.page.setOperator(operator);
    //   this.page.setSecondValue(second);
    //   this.page.clickGo();
    //   callback();
    // });
    //
    // this.When('I enter first value of $first', function (first, callback) {
    //   this.page.setFirstValue(first);
    //   callback();
    // });

    // this.When('I enter second value of $second', function (second, callback) {
    //   this.page.setSecondValue(second);
    //   callback();
    // });
    //
    // this.When('I click Go', function (callback) {
    //   this.page.clickGo();
    //   callback();
    // });
    //
    // this.Then('the result should equal $result', function (result, callback) {
    //   expect(this.page.getResult()).to.eventually.equal(result).and.notify(callback);
    // });
// };
//
// module.exports = CreateComputerSteps;