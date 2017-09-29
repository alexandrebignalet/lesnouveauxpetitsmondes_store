package com.lesnouveauxpetitsmondes.store.service;

import com.lesnouveauxpetitsmondes.store.config.paypal.PaypalConfiguration;
import com.paypal.api.payments.*;
import com.paypal.base.rest.PayPalRESTException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaypalService {

    private final Logger log = LoggerFactory.getLogger(PaypalService.class);

    private static final String CREDIT_CARD_PAYMENT_METHOD = "credit_card";
    private static final String IMMEDIATE_PAYMENT_INTENT = "sale";

    private PaypalConfiguration paypalConfiguration;

    public PaypalService(PaypalConfiguration paypalConfiguration){
        this.paypalConfiguration = paypalConfiguration;
    }

    public Payment processCreditCardPayment(CreditCard creditCard, Amount amount,
                                            ItemList items, String transactionDescription) throws PayPalRESTException {
        Payment createdPayment = null;

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setItemList(items);
        transaction
            .setDescription(transactionDescription);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        // Set funding instrument
        FundingInstrument fundingInstrument = new FundingInstrument();
        fundingInstrument.setCreditCard(creditCard);

        List<FundingInstrument> fundingInstrumentList = new ArrayList<>();
        fundingInstrumentList.add(fundingInstrument);

        // Set payer details
        Payer payer = new Payer();
        payer.setFundingInstruments(fundingInstrumentList);
        payer.setPaymentMethod(CREDIT_CARD_PAYMENT_METHOD);

        Payment payment = new Payment();
        payment.setIntent(IMMEDIATE_PAYMENT_INTENT);
        payment.setTransactions(transactions);
        payment.setPayer(payer);

        try {
            createdPayment = payment.create(paypalConfiguration.getAPIContext());
            log.info("Created payment with id = "
                + createdPayment.getId() + " and status = "
                + createdPayment.getState());
        } catch (PayPalRESTException e) {
            log.debug("Payment with PayPal", Payment.getLastRequest(), null, e.getMessage());
            createdPayment = null;
        }

        return createdPayment;
    }
}
