import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Address e2e test', () => {

    let navBarPage: NavBarPage;
    let addressDialogPage: AddressDialogPage;
    let addressComponentsPage: AddressComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Addresses', () => {
        navBarPage.goToEntity('address-lpnm');
        addressComponentsPage = new AddressComponentsPage();
        expect(addressComponentsPage.getTitle()).toMatch(/lesnouveauxpetitsmondesStoreApp.address.home.title/);

    });

    it('should load create Address dialog', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage = new AddressDialogPage();
        expect(addressDialogPage.getModalTitle()).toMatch(/lesnouveauxpetitsmondesStoreApp.address.home.createOrEditLabel/);
        addressDialogPage.close();
    });

    it('should create and save Addresses', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage.setNoInput('5');
        expect(addressDialogPage.getNoInput()).toMatch('5');
        addressDialogPage.setStreetInput('street');
        expect(addressDialogPage.getStreetInput()).toMatch('street');
        addressDialogPage.setCityInput('city');
        expect(addressDialogPage.getCityInput()).toMatch('city');
        addressDialogPage.setZipcodeInput('zipcode');
        expect(addressDialogPage.getZipcodeInput()).toMatch('zipcode');
        addressDialogPage.setCountryInput('country');
        expect(addressDialogPage.getCountryInput()).toMatch('country');
        addressDialogPage.save();
        expect(addressDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AddressComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-address-lpnm div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AddressDialogPage {
    modalTitle = element(by.css('h4#myAddressLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    noInput = element(by.css('input#field_no'));
    streetInput = element(by.css('input#field_street'));
    cityInput = element(by.css('input#field_city'));
    zipcodeInput = element(by.css('input#field_zipcode'));
    countryInput = element(by.css('input#field_country'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNoInput = function (no) {
        this.noInput.sendKeys(no);
    }

    getNoInput = function () {
        return this.noInput.getAttribute('value');
    }

    setStreetInput = function (street) {
        this.streetInput.sendKeys(street);
    }

    getStreetInput = function () {
        return this.streetInput.getAttribute('value');
    }

    setCityInput = function (city) {
        this.cityInput.sendKeys(city);
    }

    getCityInput = function () {
        return this.cityInput.getAttribute('value');
    }

    setZipcodeInput = function (zipcode) {
        this.zipcodeInput.sendKeys(zipcode);
    }

    getZipcodeInput = function () {
        return this.zipcodeInput.getAttribute('value');
    }

    setCountryInput = function (country) {
        this.countryInput.sendKeys(country);
    }

    getCountryInput = function () {
        return this.countryInput.getAttribute('value');
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
