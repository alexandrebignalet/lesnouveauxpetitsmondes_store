package com.lesnouveauxpetitsmondes.store.service;

import com.lesnouveauxpetitsmondes.store.LesnouveauxpetitsmondesStoreApp;
import com.lesnouveauxpetitsmondes.store.domain.enumeration.OrderStatus;
import com.lesnouveauxpetitsmondes.store.service.dto.OrderDTO;
import com.lesnouveauxpetitsmondes.store.service.mapper.OrderMapper;
import com.lesnouveauxpetitsmondes.store.web.rest.OrderResourceIntTest;
import com.paypal.api.payments.CreditCard;
import com.paypal.base.rest.PayPalRESTException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import static junit.framework.TestCase.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = LesnouveauxpetitsmondesStoreApp.class)
public class CheckoutServiceIntTest {

    private CreditCard creditCard;

    @Autowired
    private CheckoutService checkoutService;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private EntityManager em;

    @Before
    public void setUp() {
        creditCard = new CreditCard();
        creditCard.setExpireMonth(11);
        creditCard.setExpireYear(2018);
        creditCard.setFirstName("Joe");
        creditCard.setLastName("Shopper");
        creditCard.setNumber("4669424246660779");
        creditCard.setType("visa");
    }

    @Test
    @Transactional
    public void testPayOrderShouldReturnTrueOnSuccess() throws PayPalRESTException {
        OrderDTO orderDTO = orderMapper.toDto(OrderResourceIntTest.createEntity(em));
        assert checkoutService.payOrder(orderDTO, creditCard) != null;
        assert(orderDTO.getStatus() == OrderStatus.PAID);
    }
}
