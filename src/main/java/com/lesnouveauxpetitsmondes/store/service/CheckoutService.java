package com.lesnouveauxpetitsmondes.store.service;

import com.lesnouveauxpetitsmondes.store.domain.enumeration.OrderStatus;
import com.lesnouveauxpetitsmondes.store.service.dto.CartItemDTO;
import com.lesnouveauxpetitsmondes.store.service.dto.OrderDTO;
import com.lesnouveauxpetitsmondes.store.service.mapper.AddressMapper;
import com.lesnouveauxpetitsmondes.store.service.mapper.CartItemMapper;
import com.paypal.api.payments.*;
import com.paypal.base.rest.PayPalRESTException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class CheckoutService {

    private final Logger log = LoggerFactory.getLogger(CheckoutService.class);

    public static final String DEFAULT_CURRENCY = "EUR";
    private AddressMapper addressMapper;
    private CartItemMapper cartItemMapper;
    private PaypalService paypalService;
    private OrderService orderService;

    public CheckoutService(AddressMapper addressMapper, CartItemMapper cartItemMapper,
                           PaypalService paypalService, OrderService orderService) {
        log.debug("Initialization of CheckoutService");
        this.addressMapper = addressMapper;
        this.cartItemMapper = cartItemMapper;
        this.paypalService = paypalService;
        this.orderService = orderService;
    }

    public OrderDTO payOrder(OrderDTO orderDTO, CreditCard creditCard)
        throws PayPalRESTException {
        Address address = addressMapper.toPaypalEntity(orderDTO.getBillingAddress());

        creditCard.setBillingAddress(address);

        Details details = new Details();
        details.setShipping("0"); // shipping cost not handled yet.
        details.setTax("0"); // taxes fees not handled yet.
        details.setSubtotal(orderDTO.getCart().getTotal().toString()); // subtotal before taxes

        // TODO add shipping and tax system
        String total = orderDTO.getCart().getTotal().add(BigDecimal.ZERO).add(BigDecimal.ZERO).toString();
        Amount amount = new Amount();
        amount.setCurrency(DEFAULT_CURRENCY);
        amount.setTotal(total);

        List<Item> items = new ArrayList<>();
        for (CartItemDTO cartItemDTO: orderDTO.getCart().getItems()) {
            items.add(cartItemMapper.toPaypalItem(cartItemDTO));
        }
        ItemList itemList = new ItemList();
        itemList.setItems(items);

        boolean isOrderPaid = null != paypalService.processCreditCardPayment(creditCard, amount, itemList, null);

        if (isOrderPaid) {
            orderDTO.setStatus(OrderStatus.PAID);
        }

        return orderService.save(orderDTO);
    }
}
