
var GetComputersPage = function() {

    this.computers = "../computers";
    this.searchInput = $("input[id=searchbox]");
    this.searchButton = $("input[id=searchsubmit]");
    this.headerH1 = element(by.xpath("//*[@id=\"main\"]/h1"));

    this.get = function() {
        browser.waitForAngularEnabled(false);
        browser.manage().window().maximize();
        browser.get(this.computers);
    };

    this.setSearchValue = function(value) {
        this.searchInput.sendKeys(value);
    };
    this.pressSearchButton = function() {
        this.searchButton.click();
    };
    this.getPageHeader = function () {
        return this.headerH1.getText();
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
};

module.exports = GetComputersPage;
