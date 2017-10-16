'use strict';

class GetComputersPage {

    constructor() {
        browser.waitForAngularEnabled(false);
        this.computersUrl = "../computers";
        this.searchInput = $("input[id=searchbox]");
        this.searchButton = $("input[id=searchsubmit]");
        this.addButton = $("a[id=add]");
        this.headerH1 = element(by.xpath("//*[@id=\"main\"]/h1"));
        this.messageWarning = $("div[class=\"alert-message warning\"]")
        this.computersLink = element.all(by.xpath("//table[@class=\"computers zebra-striped\"]/tbody/tr/td[1]/a"));
        this.introduced = element.all(by.xpath("//table[@class=\"computers zebra-striped\"]/tbody/tr/td[2]"));
        this.discontinued = element.all(by.xpath("//table[@class=\"computers zebra-striped\"]/tbody/tr/td[2]"));
        this.company = element.all(by.xpath("//table[@class=\"computers zebra-striped\"]/tbody/tr/td[3]"));
    };

    openComputersListPage() {
        browser.manage().window().maximize();
        browser.get(this.computersUrl);
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

    getFirstIntroduced() {
        return this.introduced.get(0).getText()
    }

    getFirstDiscontinued() {
        return this.discontinued.get(0).getText()
    }

    getFirstCompany() {
        return this.company.get(0).getText()
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
