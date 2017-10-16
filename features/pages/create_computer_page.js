'use strict';
let moment = require('moment');

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
        this.deleteButtonArray = element.all(by.xpath("//input[@class='btn danger']"));
        this.errorDivArray = element.all(by.xpath("//div[@class='clearfix error']"));
        this.headerH1 = element(by.xpath("//*[@id=\"main\"]/h1"));
        this.optionsCompanies = element.all(by.xpath("//select[@name=\"company\"]/option"));
        this.selectedCompany = element(by.xpath("//select[@name=\"company\"]/option[@selected]"))
    };

    getPageHeader() {
        return this.headerH1.getText();
    };

    getComputerName() {
        return this.computerName.getAttribute('value');
    };

    getIntroducedDate() {
        return this.introducedDate.getAttribute('value');
    };

    getDiscontinuedDate() {
        return this.discontinuedDate.getAttribute('value');
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
        this.optionsCompanies.get(companyIndex).click();
        return this.optionsCompanies.get(companyIndex).getText();
    };


    createNewComputer() {
        this.createButton.click();
    };

    cancelNewComputerCreation() {
        this.cancelButton.click();
    };

    deleteComputer() {
        this.deleteButton.click();
    };

    getSelectedCompany() {
        return this.selectedCompany.getText();
    };

    urlChanged(url) {
        return browser.getCurrentUrl().then(function (actualUrl) {
            return url != actualUrl;
        });
    };

    convertDate(inputDateSrting) {
        return moment(inputDateSrting, 'Y-M-D').format('DD MMM Y')
    };

}

module.exports = CreateComputerPage;
