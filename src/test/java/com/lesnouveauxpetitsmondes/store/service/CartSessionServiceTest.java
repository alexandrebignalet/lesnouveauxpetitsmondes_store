package com.lesnouveauxpetitsmondes.store.service;

import com.lesnouveauxpetitsmondes.store.LesnouveauxpetitsmondesStoreApp;
import com.lesnouveauxpetitsmondes.store.domain.*;
import com.lesnouveauxpetitsmondes.store.repository.ProductRepository;
import com.lesnouveauxpetitsmondes.store.security.AuthoritiesConstants;
import com.lesnouveauxpetitsmondes.store.service.dto.CartItemDTO;
import com.lesnouveauxpetitsmondes.store.service.mapper.CartItemMapper;
import com.lesnouveauxpetitsmondes.store.service.mapper.CartMapper;
import com.lesnouveauxpetitsmondes.store.service.session.CartSessionServiceImpl;
import com.lesnouveauxpetitsmondes.store.web.rest.ProductResourceIntTest;
import com.lesnouveauxpetitsmondes.store.web.rest.UserResourceIntTest;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = LesnouveauxpetitsmondesStoreApp.class)
public class CartSessionServiceTest {

    @Autowired
    private HttpSession httpSession;

    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private CartItemMapper cartItemMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private ProductRepository productRepository;

    @Mock
    private UserService mockUserService;
    private static final BigDecimal DEFAULT_PRODUCT_PRICE = new BigDecimal(100);
    private User user;

    private CartSessionServiceImpl cartSessionService;
    private CartItemDTO productsAddedInCart;
    private Cart sessionCart;

    @Before
    public void setup() {

        user = UserResourceIntTest.createEntity(em);
        when(mockUserService.getUserWithAuthorities()).thenReturn(user);

        cartSessionService = new CartSessionServiceImpl(this.httpSession, this.cartMapper, this.cartItemMapper, this.mockUserService, this.productRepository);

        sessionCart = cartSessionService.getCart();

        Product product = ProductResourceIntTest.createEntity(em);
        product.setPrice(DEFAULT_PRODUCT_PRICE);
        em.persist(product);
        em.flush();

        productsAddedInCart = cartItemMapper.toDto(new CartItem().product(product).quantity(10));
        cartSessionService.addItemsToCart(productsAddedInCart, false);
    }

    @Test
    @Transactional
    public void testAddingItemToCart() {
        assertNotNull(this.cartSessionService.getSession());

        productsAddedInCart.setQuantity(5);
        cartSessionService.addItemsToCart(productsAddedInCart, false);

        assertEquals(cartSessionService.getSessionKeyName(), user.getLogin() + CartSessionServiceImpl.CART_ATTRIBUTE_NAME);
        assertNotNull(sessionCart);
        assertEquals(sessionCart.getItems().size(), 1);
        assert(((CartItem)sessionCart.getItems().toArray()[0]).getQuantity() == 15);
        assertEquals(sessionCart.getTotal(), DEFAULT_PRODUCT_PRICE.multiply(new BigDecimal(15)));

        productsAddedInCart.setQuantity(2);
        cartSessionService.addItemsToCart(productsAddedInCart, true);
        assertEquals(sessionCart.getTotal(), DEFAULT_PRODUCT_PRICE.multiply(new BigDecimal(2)));
    }

    @Test
    @Transactional
    public void testRemoveItemFromCart() {
        assertNotNull(sessionCart);
        assertEquals(sessionCart.getItems().size(), 1);

        cartSessionService.removeItemsFromCart(productsAddedInCart);

        assertEquals(sessionCart.getItems().size(), 0);
    }
}
