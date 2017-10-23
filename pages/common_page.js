class CommonPage {

    constructor() {
        this.headerH1 = element(by.xpath("//*[@id=\"main\"]/h1"));
    }

    getPageHeader() {
        return this.headerH1.getText();
    };

}

module.exports = CommonPage;