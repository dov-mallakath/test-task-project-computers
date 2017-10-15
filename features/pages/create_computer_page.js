'use strict';

class CreateComputerPage {

    constructor() {
        browser.waitForAngularEnabled(false);
        this.computerName = $("input[name=name]");
        this.introducedDate = $("input[name=introduced]");
        this.discontinuedDate = $("input[name=discontinued]");
        this.company = $("select[name=company]");
        this.createButton = $("input[class=\"btn primary\"]");
        this.cancelButton = $("a[class=btn]");
        this.deleteButton = $("input[class=\"btn danger\"]");
        this.deleteButtonArray = element.all(by.css('danger'));
        this.errorDiv = $("div[class=\"clearfix error\"]");
        this.errorDivArray = element.all(by.css('error'));
        this.headerH1 = element(by.xpath("//*[@id=\"main\"]/h1"));
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

    selectManufacturer() {
        this.company.$('[value="age"]').click();
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

        element.isDisplayed().then(function(visible){
                if (visible) {
                    // click on the element
                    return true;
                }
                // Not visible yet, but it is in the DOM, then try again
                return false;
            }).catch(function(){
            // Element not found in the DOM, try again
                return false;
            })
    };

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


    urlChanged(url) {
        return browser.getCurrentUrl().then(function(actualUrl) {
            return url != actualUrl;
        });
    };
}

module.exports = CreateComputerPage;
