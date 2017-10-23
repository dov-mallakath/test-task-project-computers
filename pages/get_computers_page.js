let CommonPage = require("../pages/common_page");

class GetComputersPage extends CommonPage {

    constructor() {
        super();
        this.computersUrl = "../computers";
        this.searchInput = $("input[id=searchbox]");
        this.searchButton = $("input[id=searchsubmit]");
        this.addButton = $("a[id=add]");
        this.messageWarning = $("div[class=\"alert-message warning\"]");
        this.computersLink = element.all(by.xpath("//table[@class=\"computers zebra-striped\"]/tbody/tr/td[1]/a"));
        this.introduced = element.all(by.xpath("//table[@class=\"computers zebra-striped\"]/tbody/tr/td[2]"));
        this.discontinued = element.all(by.xpath("//table[@class=\"computers zebra-striped\"]/tbody/tr/td[3]"));
        this.company = element.all(by.xpath("//table[@class=\"computers zebra-striped\"]/tbody/tr/td[4]"));
    };

    openComputersListPage() {
        return browser.get(this.computersUrl);
    };

    setSearchValue(value) {
        return this.searchInput.sendKeys(value);
    };

    pressSearchButton() {
        return this.searchButton.click();
    };

    getMessageWarning() {
        return this.messageWarning.getText();
    };

    addNewComputer() {
        return this.addButton.click();
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
}

module.exports = GetComputersPage;