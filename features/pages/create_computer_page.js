'use strict';

require("babel-core").transform("code", {
    plugins: ["transform-async-to-generator"]
});

class CreateComputerPage {

    constructor() {
        browser.waitForAngularEnabled(false);
        this.computerName = $("input[name=name]");
        this.introducedDate = $("input[name=introduced]");
        this.discontinuedDate = $("input[name=discontinued]");
        this.selectCompany = $("select[name=company]");
        this.createButton = $("input[class=\"btn primary\"]");
        this.cancelButton = $("a[class=btn]");
        this.deleteButton = $("input[class=\"btn danger\"]");
        this.deleteButtonArray = element.all(by.css('danger'));
        this.errorDivArray = element.all(by.css('error'));
        this.headerH1 = element(by.xpath("//*[@id=\"main\"]/h1"));
        this.optionsCompanies = element.all(by.xpath("//select[@name=\"company\"]/option"))
        this.selectedCompany = element(by.xpath("//select[@name=\"company\"]/option[@selected]"))
    };

    getPageHeader() {
        return this.headerH1.getText();
    };

    getComputerName() {
        return this.computerName.getText();
    };

    getIntroducedDate() {
        return this.introducedDate.getText();
    };

    getDiscontinuedDate() {
        return this.discontinuedDate.getText();
    };

    enterComputerName(computerName) {
        this.computerName.sendKeys(computerName);
    };

    enterIntroducedDate(introducedDate) {
        this.introducedDate.sendKeys(introducedDate);
    };

    enterDiscontinuedDate(discontinuedDate) {
        this.discontinuedDate.sendKeys(discontinuedDate);
    };

    selectManufacturerByIndex(companyIndex) {
        this.selectCompany.click();
        let selectedCompany = this.optionsCompanies.get(companyIndex).getText();
        this.optionsCompanies.get(companyIndex).click();
        return selectedCompany;
    };


    createNewComputer() {
        this.createButton.click();
    };

    cancelNewComputerCreation() {
        this.cancelButton.click();
    }

    deleteComputer() {
        this.deleteButton.click();
    }

    getSelectedCompany() {
        return this.selectedCompany.getText();
    }

    isElementPresent(element) {
        let present = false;
        element.isPresent().then(function (isVisible) {
            present = expect(isVisible).to
        });
        return present;
    }

    createButtonIsPresent() {
        return this.createButton.isPresent();
    };

    isElementDisplayed(element) {

        element.isDisplayed().then(function (visible) {
            if (visible) {
                // click on the element
                return true;
            }
            // Not visible yet, but it is in the DOM, then try again
            return false;
        }).catch(function () {
            // Element not found in the DOM, try again
            return false;
        })
    };

    urlChanged(url) {
        return browser.getCurrentUrl().then(function (actualUrl) {
            return url != actualUrl;
        });
    };
}

module.exports = CreateComputerPage;
