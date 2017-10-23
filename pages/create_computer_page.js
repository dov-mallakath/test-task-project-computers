let CommonPage = require("../pages/common_page");
let moment = require('moment');

class CreateComputerPage extends CommonPage {

    constructor() {
        super();
        this.computerName = $("input[name=name]");
        this.introducedDate = $("input[name=introduced]");
        this.discontinuedDate = $("input[name=discontinued]");
        this.selectCompany = $("select[name=company]");
        this.createButton = $("input[class=\"btn primary\"]");
        this.cancelButton = $("a[class=btn]");
        this.deleteButton = $("input[class=\"btn danger\"]");
        this.deleteButtonArray = element.all(by.xpath("//input[@class='btn danger']"));
        this.errorDivArray = element.all(by.xpath("//div[@class='clearfix error']"));
        this.optionsCompanies = element.all(by.xpath("//select[@name=\"company\"]/option"));
        this.selectedCompany = element(by.xpath("//select[@name=\"company\"]/option[@selected]"))
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
        return this.computerName.sendKeys(computerName);
    };

    enterIntroducedDate(introducedDate) {
        return this.introducedDate.sendKeys(introducedDate);
    };

    enterDiscontinuedDate(discontinuedDate) {
        return this.discontinuedDate.sendKeys(discontinuedDate);
    };

    selectManufacturerByIndex(companyIndex) {
        this.selectCompany.click();
        this.optionsCompanies.get(companyIndex).click();
        return this.optionsCompanies.get(companyIndex).getText();
    };

    createNewComputer() {
        return this.createButton.click();
    };

    cancelNewComputerCreation() {
        return this.cancelButton.click();
    };

    deleteComputer() {
        return this.deleteButton.click();
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