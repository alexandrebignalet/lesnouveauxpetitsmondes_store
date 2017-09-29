package com.lesnouveauxpetitsmondes.store.service;

import com.lesnouveauxpetitsmondes.store.LesnouveauxpetitsmondesStoreApp;
import com.lesnouveauxpetitsmondes.store.config.paypal.PaypalConfiguration;
import com.lesnouveauxpetitsmondes.store.web.rest.AddressResourceIntTest;
import com.paypal.api.payments.*;
import com.paypal.base.rest.PayPalRESTException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static junit.framework.TestCase.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = LesnouveauxpetitsmondesStoreApp.class)
public class PaypalServiceIntTest {

    @Autowired
    private PaypalConfiguration paypalConfiguration;

    private PaypalService paypalService;

    @Before
    public void setUp(){
        paypalService = new PaypalService(paypalConfiguration);
    }

    @Test
    public void testPaymentByCreditCard(){

        Address billingAddress = new Address();
        billingAddress.setCity("Johnstown");
        billingAddress.setCountryCode("US");
        billingAddress.setLine1("52 N Main ST");
        billingAddress.setPostalCode("43210");
        billingAddress.setState("OH");

        CreditCard creditCard = new CreditCard();
        creditCard.setBillingAddress(billingAddress);
        creditCard.setExpireMonth(11);
        creditCard.setExpireYear(2018);
        creditCard.setFirstName("Joe");
        creditCard.setLastName("Shopper");
        creditCard.setNumber("4669424246660779");
        creditCard.setType("visa");

        Details details = new Details();
        details.setShipping("1");
        details.setSubtotal("5");
        details.setTax("1");

        Amount amount = new Amount();
        amount.setCurrency("USD");
        // Total must be equal to sum of shipping, tax and subtotal.
        amount.setTotal("7");
        amount.setDetails(details);

        String description = "This is the payment transaction description.";

        Item item = new Item();
        item.setName("Ground Coffee 40 oz").setQuantity("1").setCurrency("USD").setPrice("5");
        ItemList itemList = new ItemList();
        List<Item> items = new ArrayList<>();
        items.add(item);
        itemList.setItems(items);

        Payment payment = null;
        try {
            payment = paypalService.processCreditCardPayment(creditCard, amount, itemList, description);
        } catch (PayPalRESTException e) {
            assertNotNull(payment);
        }

        assertNotNull(payment);
    }
}
