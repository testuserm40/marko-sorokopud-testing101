export class PageMyAccount {
    constructor(page) {
        this.page = page;   
        this.accountFormDisplayNameInput = page.locator('#display-name-id');
    }
}