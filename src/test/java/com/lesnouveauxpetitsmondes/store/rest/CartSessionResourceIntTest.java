package com.lesnouveauxpetitsmondes.store.web.rest;

import com.lesnouveauxpetitsmondes.store.LesnouveauxpetitsmondesStoreApp;
import com.lesnouveauxpetitsmondes.store.domain.Cart;
import com.lesnouveauxpetitsmondes.store.domain.CartItem;
import com.lesnouveauxpetitsmondes.store.domain.Product;
import com.lesnouveauxpetitsmondes.store.domain.User;
import com.lesnouveauxpetitsmondes.store.repository.ProductRepository;
import com.lesnouveauxpetitsmondes.store.service.UserService;
import com.lesnouveauxpetitsmondes.store.service.dto.CartDTO;
import com.lesnouveauxpetitsmondes.store.service.dto.CartItemDTO;
import com.lesnouveauxpetitsmondes.store.service.mapper.CartItemMapper;
import com.lesnouveauxpetitsmondes.store.service.mapper.CartMapper;
import com.lesnouveauxpetitsmondes.store.service.session.CartSessionService;
import com.lesnouveauxpetitsmondes.store.service.session.CartSessionServiceImpl;
import com.lesnouveauxpetitsmondes.store.web.rest.errors.ExceptionTranslator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertNotNull;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CartSessionResource REST controller.
 *
 * @see CartSessionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LesnouveauxpetitsmondesStoreApp.class)
public class CartSessionResourceIntTest {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    @Autowired
    private CartItemMapper cartItemMapper;

    @Mock
    private UserService mockUserService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCartSessionMockMvc;

    private Cart cart;

    private CartSessionService cartSessionService;

    @Autowired
    private HttpSession httpSession;

    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private ProductRepository productRepository;

    private Product product;
    private Product product2;

    @Before
    public void setup() {

        MockitoAnnotations.initMocks(this);
        User user = UserResourceIntTest.createEntity(em);
        when(mockUserService.getUserWithAuthorities()).thenReturn(user);

        this.cartSessionService = new CartSessionServiceImpl(httpSession, cartMapper, cartItemMapper, mockUserService, productRepository);
        this.cart = this.cartSessionService.getCart();

        CartSessionResource cartSessionResource = new CartSessionResource(this.cartSessionService);
        this.restCartSessionMockMvc = MockMvcBuilders.standaloneSetup(cartSessionResource)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();

        product = ProductResourceIntTest.createEntity(em);
        product2 = ProductResourceIntTest.createEntity(em);

        productRepository.saveAndFlush(product);
        productRepository.saveAndFlush(product2);

        cartSessionService.addItemsToCart(cartItemMapper.toDto(new CartItem().product(product2).quantity(15)), false);
    }

    @Test
    @Transactional
    public void cartIsCreatedOnAppStart() throws Exception {
        assertNotNull(cart);
        assert cart.getTotal().intValue() > 0;
        assert cart.getItems().size() == 1;
    }

    @Test
    @Transactional
    public void getCurrentUserCart() throws Exception {

        // Get the current user cart
        restCartSessionMockMvc.perform(get("/api/cart-session")
            .sessionAttr(cartSessionService.getSessionKeyName(), cart))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.total").value(cart.getTotal().intValue()));
    }

    @Test
    @Transactional
    public void createItemInsideCart() throws Exception {

        int cartSizeBeforeCreation = cart.getItems().size();
        // Add a CartItem in the User Cart
        CartItemDTO cartItemDTO = cartItemMapper.toDto(new CartItem().product(product).quantity(DEFAULT_QUANTITY));

        restCartSessionMockMvc.perform(post("/api/cart-session")
            .sessionAttr(cartSessionService.getSessionKeyName(), cart)
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cartItemDTO)))
            .andExpect(status().isCreated());

        assertThat(cart.getItems()).hasSize(cartSizeBeforeCreation + 1);
    }

    @Test
    @Transactional
    public void updateCart() throws Exception {

        int cartSizeBeforeUpdate = cart.getItems().size();

        CartItemDTO cartItemDTO = cartItemMapper.toDto(new CartItem().product(product).quantity(UPDATED_QUANTITY));

        restCartSessionMockMvc.perform(put("/api/cart-session")
            .sessionAttr(cartSessionService.getSessionKeyName(), cart)
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cartItemDTO)))
            .andExpect(status().isOk());

        assertThat(cart.getItems()).hasSize(cartSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void updateCartWithNonExistingProduct() throws Exception {

        Product product = new Product().price(BigDecimal.TEN);
        product.setId(Long.MAX_VALUE);

        CartItem cartItem = new CartItem().product(product).quantity(10);

        // Create the Cart
        CartItemDTO cartItemDTO = cartItemMapper.toDto(cartItem);

        // If a product inside cart doesnt exist, it will return a 400
        restCartSessionMockMvc.perform(put("/api/cart-session")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cartItemDTO)))
            .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    public void deleteItemInsideCart() throws Exception {

        int cartSizeBeforeDeletion = cart.getItems().size();

        CartItemDTO cartItemDTO = cartItemMapper.toDto(new CartItem().product(product2).quantity(UPDATED_QUANTITY));

        // Delete a cart item from inside the cart
        restCartSessionMockMvc.perform(delete("/api/cart-session")
            .sessionAttr(cartSessionService.getSessionKeyName(), cart)
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cartItemDTO)))
            .andExpect(status().isOk());

        assertThat(cart.getItems()).hasSize(cartSizeBeforeDeletion - 1);
    }
}
