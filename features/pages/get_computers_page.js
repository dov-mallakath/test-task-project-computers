'use strict';

class GetComputersPage {

    constructor() {
        browser.waitForAngularEnabled(false);
        this.computers = "../computers";
        this.searchInput = $("input[id=searchbox]");
        this.searchButton = $("input[id=searchsubmit]");
        this.addButton = $("a[id=add]");
        this.headerH1 = element(by.xpath("//*[@id=\"main\"]/h1"));
        this.messageWarning = $("div[class=\"alert-message warning\"]")
        this.computersLink = element.all(by.xpath("//table[@class=\"computers zebra-striped\"]/tbody/tr/td[1]/a"));
    };

    openComputersListPage() {
        browser.manage().window().maximize();
        browser.get(this.computers);
    };

    setSearchValue(value) {
        this.searchInput.sendKeys(value);
    };

    pressSearchButton() {
        this.searchButton.click();
    };

    getPageHeader() {
        return this.headerH1.getText();
    };

    getMessageWarning() {
        return this.messageWarning.getText();
    };


    addNewComputer() {
        this.addButton.click();
    }

    getFirstComputer() {
        return this.computersLink.get(0)
    }

    // this.setOperator = function(value) {
    //   element(by.model('operator')).element(by.cssContainingText('option', value)).click();
    // };
    //
    // this.getResult = function() {
    //   return element(by.binding('latest')).getText();
    // };
    //
    // this.clickGo = function() {
    //   element(by.id('gobutton')).click()
    // }
}

module.exports = GetComputersPage;
