import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('CartItem e2e test', () => {

    let navBarPage: NavBarPage;
    let cartItemDialogPage: CartItemDialogPage;
    let cartItemComponentsPage: CartItemComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CartItems', () => {
        navBarPage.goToEntity('cart-item-lpnm');
        cartItemComponentsPage = new CartItemComponentsPage();
        expect(cartItemComponentsPage.getTitle()).toMatch(/lesnouveauxpetitsmondesStoreApp.cartItem.home.title/);

    });

    it('should load create CartItem dialog', () => {
        cartItemComponentsPage.clickOnCreateButton();
        cartItemDialogPage = new CartItemDialogPage();
        expect(cartItemDialogPage.getModalTitle()).toMatch(/lesnouveauxpetitsmondesStoreApp.cartItem.home.createOrEditLabel/);
        cartItemDialogPage.close();
    });

   /* it('should create and save CartItems', () => {
        cartItemComponentsPage.clickOnCreateButton();
        cartItemDialogPage.setQuantityInput('5');
        expect(cartItemDialogPage.getQuantityInput()).toMatch('5');
        cartItemDialogPage.productSelectLastOption();
        cartItemDialogPage.cartSelectLastOption();
        cartItemDialogPage.save();
        expect(cartItemDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); */

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CartItemComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cart-item-lpnm div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CartItemDialogPage {
    modalTitle = element(by.css('h4#myCartItemLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    quantityInput = element(by.css('input#field_quantity'));
    productSelect = element(by.css('select#field_product'));
    cartSelect = element(by.css('select#field_cart'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setQuantityInput = function (quantity) {
        this.quantityInput.sendKeys(quantity);
    }

    getQuantityInput = function () {
        return this.quantityInput.getAttribute('value');
    }

    productSelectLastOption = function () {
        this.productSelect.all(by.tagName('option')).last().click();
    }

    productSelectOption = function (option) {
        this.productSelect.sendKeys(option);
    }

    getProductSelect = function () {
        return this.productSelect;
    }

    getProductSelectedOption = function () {
        return this.productSelect.element(by.css('option:checked')).getText();
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
