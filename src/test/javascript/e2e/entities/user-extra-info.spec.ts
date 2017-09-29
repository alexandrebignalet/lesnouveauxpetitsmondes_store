import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';


describe('UserExtraInfo e2e test', () => {

    let navBarPage: NavBarPage;
    let userExtraInfoDialogPage: UserExtraInfoDialogPage;
    let userExtraInfoComponentsPage: UserExtraInfoComponentsPage;


    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UserExtraInfos', () => {
        navBarPage.goToEntity('user-extra-info');
        userExtraInfoComponentsPage = new UserExtraInfoComponentsPage();
        expect(userExtraInfoComponentsPage.getTitle()).toMatch(/lesnouveauxpetitsmondesStoreApp.userExtraInfo.home.title/);

    });

    it('should load create UserExtraInfo dialog', () => {
        userExtraInfoComponentsPage.clickOnCreateButton();
        userExtraInfoDialogPage = new UserExtraInfoDialogPage();
        expect(userExtraInfoDialogPage.getModalTitle()).toMatch(/lesnouveauxpetitsmondesStoreApp.userExtraInfo.home.createOrEditLabel/);
        userExtraInfoDialogPage.close();
    });

   /* it('should create and save UserExtraInfos', () => {
        userExtraInfoComponentsPage.clickOnCreateButton();
        userExtraInfoDialogPage.shippingAddressSelectLastOption();
        userExtraInfoDialogPage.billingAddressSelectLastOption();
        userExtraInfoDialogPage.userSelectLastOption();
        userExtraInfoDialogPage.save();
        expect(userExtraInfoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); */

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UserExtraInfoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-user-extra-info div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UserExtraInfoDialogPage {
    modalTitle = element(by.css('h4#myUserExtraInfoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    shippingAddressSelect = element(by.css('select#field_shippingAddress'));
    billingAddressSelect = element(by.css('select#field_billingAddress'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    shippingAddressSelectLastOption = function () {
        this.shippingAddressSelect.all(by.tagName('option')).last().click();
    }

    shippingAddressSelectOption = function (option) {
        this.shippingAddressSelect.sendKeys(option);
    }

    getShippingAddressSelect = function () {
        return this.shippingAddressSelect;
    }

    getShippingAddressSelectedOption = function () {
        return this.shippingAddressSelect.element(by.css('option:checked')).getText();
    }

    billingAddressSelectLastOption = function () {
        this.billingAddressSelect.all(by.tagName('option')).last().click();
    }

    billingAddressSelectOption = function (option) {
        this.billingAddressSelect.sendKeys(option);
    }

    getBillingAddressSelect = function () {
        return this.billingAddressSelect;
    }

    getBillingAddressSelectedOption = function () {
        return this.billingAddressSelect.element(by.css('option:checked')).getText();
    }

    userSelectLastOption = function () {
        this.userSelect.all(by.tagName('option')).last().click();
    }

    userSelectOption = function (option) {
        this.userSelect.sendKeys(option);
    }

    getUserSelect = function () {
        return this.userSelect;
    }

    getUserSelectedOption = function () {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
