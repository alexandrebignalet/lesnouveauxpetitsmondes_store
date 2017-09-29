import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';


describe('Cart e2e test', () => {

    let navBarPage: NavBarPage;
    let cartDialogPage: CartDialogPage;
    let cartComponentsPage: CartComponentsPage;


    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Carts', () => {
        navBarPage.goToEntity('cart-lpnm');
        cartComponentsPage = new CartComponentsPage();
        expect(cartComponentsPage.getTitle()).toMatch(/lesnouveauxpetitsmondesStoreApp.cart.home.title/);

    });

    it('should load create Cart dialog', () => {
        cartComponentsPage.clickOnCreateButton();
        cartDialogPage = new CartDialogPage();
        expect(cartDialogPage.getModalTitle()).toMatch(/lesnouveauxpetitsmondesStoreApp.cart.home.createOrEditLabel/);
        cartDialogPage.close();
    });

    it('should create and save Carts', () => {
        cartComponentsPage.clickOnCreateButton();
        cartDialogPage.save();
        expect(cartDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CartComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cart-lpnm div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CartDialogPage {
    modalTitle = element(by.css('h4#myCartLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
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
