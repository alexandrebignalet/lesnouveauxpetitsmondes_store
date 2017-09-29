import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Order e2e test', () => {

    let navBarPage: NavBarPage;
    let orderDialogPage: OrderDialogPage;
    let orderComponentsPage: OrderComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Orders', () => {
        navBarPage.goToEntity('order-lpnm');
        orderComponentsPage = new OrderComponentsPage();
        expect(orderComponentsPage.getTitle()).toMatch(/lesnouveauxpetitsmondesStoreApp.order.home.title/);

    });

    it('should load create Order dialog', () => {
        orderComponentsPage.clickOnCreateButton();
        orderDialogPage = new OrderDialogPage();
        expect(orderDialogPage.getModalTitle()).toMatch(/lesnouveauxpetitsmondesStoreApp.order.home.createOrEditLabel/);
        orderDialogPage.close();
    });

   /* it('should create and save Orders', () => {
        orderComponentsPage.clickOnCreateButton();
        orderDialogPage.setCreationDateInput('2000-12-31');
        expect(orderDialogPage.getCreationDateInput()).toMatch('2000-12-31');
        orderDialogPage.setShippedDateInput('2000-12-31');
        expect(orderDialogPage.getShippedDateInput()).toMatch('2000-12-31');
        orderDialogPage.statusSelectLastOption();
        orderDialogPage.cartSelectLastOption();
        orderDialogPage.shippingAddressSelectLastOption();
        orderDialogPage.billingAddressSelectLastOption();
        orderDialogPage.usereiSelectLastOption();
        orderDialogPage.save();
        expect(orderDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); */

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OrderComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-order-lpnm div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OrderDialogPage {
    modalTitle = element(by.css('h4#myOrderLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    creationDateInput = element(by.css('input#field_creationDate'));
    shippedDateInput = element(by.css('input#field_shippedDate'));
    statusSelect = element(by.css('select#field_status'));
    cartSelect = element(by.css('select#field_cart'));
    shippingAddressSelect = element(by.css('select#field_shippingAddress'));
    billingAddressSelect = element(by.css('select#field_billingAddress'));
    usereiSelect = element(by.css('select#field_userei'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCreationDateInput = function (creationDate) {
        this.creationDateInput.sendKeys(creationDate);
    }

    getCreationDateInput = function () {
        return this.creationDateInput.getAttribute('value');
    }

    setShippedDateInput = function (shippedDate) {
        this.shippedDateInput.sendKeys(shippedDate);
    }

    getShippedDateInput = function () {
        return this.shippedDateInput.getAttribute('value');
    }

    setStatusSelect = function (status) {
        this.statusSelect.sendKeys(status);
    }

    getStatusSelect = function () {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    statusSelectLastOption = function () {
        this.statusSelect.all(by.tagName('option')).last().click();
    }
    cartSelectLastOption = function () {
        this.cartSelect.all(by.tagName('option')).last().click();
    }

    cartSelectOption = function (option) {
        this.cartSelect.sendKeys(option);
    }

    getCartSelect = function () {
        return this.cartSelect;
    }

    getCartSelectedOption = function () {
        return this.cartSelect.element(by.css('option:checked')).getText();
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

    usereiSelectLastOption = function () {
        this.usereiSelect.all(by.tagName('option')).last().click();
    }

    usereiSelectOption = function (option) {
        this.usereiSelect.sendKeys(option);
    }

    getUsereiSelect = function () {
        return this.usereiSelect;
    }

    getUsereiSelectedOption = function () {
        return this.usereiSelect.element(by.css('option:checked')).getText();
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
