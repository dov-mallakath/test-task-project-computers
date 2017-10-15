'use strict';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let GetComputersSteps = function () {

    const EXPECTED_TITLE = "No computers found";

    let GetComputersPage = require("../pages/get_computers_page");

    this.World = function MyWorld() {
        this.page = new GetComputersPage();
    };

    this.Given('The computers page is opened', function (callback) {
        this.page.openComputersListPage();
        callback();
    });

    this.When('I search for $value', function (value, callback) {
        this.page.setSearchValue(value);
        this.page.pressSearchButton();
        callback();
    });

    this.Then('I will see No Computers Found header', function (callback) {
        // this.assertEqual('No computers found123', this.page.getPageHeader());
        //assert(this.page.getPageHeader(),'No computers found');
        expect(this.page.getPageHeader()).to.eventually.equal(EXPECTED_TITLE).and.notify(callback);
        //callback();
    });

    // this.Then('I wil see No Computers Found header', function (callback) {
    //     expect(this.page.getPageHeader()).to.eventually.equal('No Computers Found').and.notify(callback);
    //     callback(null, 'pending');
    // });


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
};

module.exports = GetComputersSteps;