package com.lesnouveauxpetitsmondes.store.web.rest;

import com.lesnouveauxpetitsmondes.store.LesnouveauxpetitsmondesStoreApp;
import com.lesnouveauxpetitsmondes.store.domain.Cart;
import com.lesnouveauxpetitsmondes.store.domain.CartItem;
import com.lesnouveauxpetitsmondes.store.domain.Product;
import com.lesnouveauxpetitsmondes.store.domain.User;
import com.lesnouveauxpetitsmondes.store.repository.CartItemRepository;
import com.lesnouveauxpetitsmondes.store.repository.ProductRepository;
import com.lesnouveauxpetitsmondes.store.repository.search.CartItemSearchRepository;
import com.lesnouveauxpetitsmondes.store.service.CartItemService;
import com.lesnouveauxpetitsmondes.store.service.UserService;
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
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpSession;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CartItemResource REST controller.
 *
 * @see CartItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LesnouveauxpetitsmondesStoreApp.class)
public class CartItemResourceIntTest {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartItemMapper cartItemMapper;

    @Autowired
    private CartItemService cartItemService;

    @Mock
    private UserService mockUserService;

    @Autowired
    private CartItemSearchRepository cartItemSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCartItemMockMvc;

    private CartItem cartItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CartItemResource cartItemResource = new CartItemResource(cartItemService);
        this.restCartItemMockMvc = MockMvcBuilders.standaloneSetup(cartItemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CartItem createEntity(EntityManager em) {
        CartItem cartItem = new CartItem()
            .quantity(DEFAULT_QUANTITY);
        // Add required entity
        Product product = ProductResourceIntTest.createEntity(em);
        em.persist(product);
        em.flush();

        Cart cart = new Cart();
        em.persist(cart);
        em.flush();

        cartItem.setProduct(product);
        cartItem.setCart(cart);
        return cartItem;
    }

    @Before
    public void initTest() {
        cartItemSearchRepository.deleteAll();
        cartItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createCartItem() throws Exception {
        int databaseSizeBeforeCreate = cartItemRepository.findAll().size();

        // Create the CartItem
        CartItemDTO cartItemDTO = cartItemMapper.toDto(cartItem);
        System.out.println("CARTITEMDTO: " + cartItemDTO.toString());
        restCartItemMockMvc.perform(post("/api/cart-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cartItemDTO)))
            .andExpect(status().isCreated());

        // Validate the CartItem in the database
        List<CartItem> cartItemList = cartItemRepository.findAll();
        assertThat(cartItemList).hasSize(databaseSizeBeforeCreate + 1);
        CartItem testCartItem = cartItemList.get(cartItemList.size() - 1);
        assertThat(testCartItem.getQuantity()).isEqualTo(DEFAULT_QUANTITY);

        // Validate the CartItem in Elasticsearch
        CartItem cartItemEs = cartItemSearchRepository.findOne(testCartItem.getId());
        assertThat(cartItemEs).isEqualToComparingFieldByField(testCartItem);
    }

    @Test
    @Transactional
    public void createCartItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cartItemRepository.findAll().size();

        // Create the CartItem with an existing ID
        cartItem.setId(1L);
        CartItemDTO cartItemDTO = cartItemMapper.toDto(cartItem);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCartItemMockMvc.perform(post("/api/cart-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cartItemDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<CartItem> cartItemList = cartItemRepository.findAll();
        assertThat(cartItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = cartItemRepository.findAll().size();
        // set the field null
        cartItem.setQuantity(null);

        // Create the CartItem, which fails.
        CartItemDTO cartItemDTO = cartItemMapper.toDto(cartItem);

        restCartItemMockMvc.perform(post("/api/cart-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cartItemDTO)))
            .andExpect(status().isBadRequest());

        List<CartItem> cartItemList = cartItemRepository.findAll();
        assertThat(cartItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCartItems() throws Exception {
        // Initialize the database
        cartItemRepository.saveAndFlush(cartItem);

        // Get all the cartItemList
        restCartItemMockMvc.perform(get("/api/cart-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cartItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }

    @Test
    @Transactional
    public void getCartItem() throws Exception {
        // Initialize the database
        cartItemRepository.saveAndFlush(cartItem);

        // Get the cartItem
        restCartItemMockMvc.perform(get("/api/cart-items/{id}", cartItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cartItem.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }

    @Test
    @Transactional
    public void getNonExistingCartItem() throws Exception {
        // Get the cartItem
        restCartItemMockMvc.perform(get("/api/cart-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCartItem() throws Exception {
        // Initialize the database
        cartItemRepository.saveAndFlush(cartItem);
        cartItemSearchRepository.save(cartItem);

        int databaseSizeBeforeUpdate = cartItemRepository.findAll().size();

        // Update the cartItem
        CartItem updatedCartItem = cartItemRepository.findOne(cartItem.getId());
        updatedCartItem
            .quantity(UPDATED_QUANTITY);
        CartItemDTO cartItemDTO = cartItemMapper.toDto(updatedCartItem);

        restCartItemMockMvc.perform(put("/api/cart-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cartItemDTO)))
            .andExpect(status().isOk());

        // Validate the CartItem in the database
        List<CartItem> cartItemList = cartItemRepository.findAll();
        assertThat(cartItemList).hasSize(databaseSizeBeforeUpdate);
        CartItem testCartItem = cartItemList.get(cartItemList.size() - 1);
        assertThat(testCartItem.getQuantity()).isEqualTo(UPDATED_QUANTITY);

        // Validate the CartItem in Elasticsearch
        CartItem cartItemEs = cartItemSearchRepository.findOne(testCartItem.getId());
        assertThat(cartItemEs).isEqualToComparingFieldByField(testCartItem);
    }

    @Test
    @Transactional
    public void updateNonExistingCartItem() throws Exception {
        int databaseSizeBeforeUpdate = cartItemRepository.findAll().size();

        // Create the CartItem
        CartItemDTO cartItemDTO = cartItemMapper.toDto(cartItem);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCartItemMockMvc.perform(put("/api/cart-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cartItemDTO)))
            .andExpect(status().isCreated());

        // Validate the CartItem in the database
        List<CartItem> cartItemList = cartItemRepository.findAll();
        assertThat(cartItemList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCartItem() throws Exception {
        // Initialize the database
        cartItemRepository.saveAndFlush(cartItem);
        cartItemSearchRepository.save(cartItem);
        int databaseSizeBeforeDelete = cartItemRepository.findAll().size();

        // Get the cartItem
        restCartItemMockMvc.perform(delete("/api/cart-items/{id}", cartItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean cartItemExistsInEs = cartItemSearchRepository.exists(cartItem.getId());
        assertThat(cartItemExistsInEs).isFalse();

        // Validate the database is empty
        List<CartItem> cartItemList = cartItemRepository.findAll();
        assertThat(cartItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCartItem() throws Exception {
        // Initialize the database
        cartItemRepository.saveAndFlush(cartItem);
        cartItemSearchRepository.save(cartItem);

        // Search the cartItem
        restCartItemMockMvc.perform(get("/api/_search/cart-items?query=id:" + cartItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cartItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CartItem.class);
        CartItem cartItem1 = new CartItem();
        cartItem1.setId(1L);
        CartItem cartItem2 = new CartItem();
        cartItem2.setId(cartItem1.getId());
        assertThat(cartItem1).isEqualTo(cartItem2);
        cartItem2.setId(2L);
        assertThat(cartItem1).isNotEqualTo(cartItem2);
        cartItem1.setId(null);
        assertThat(cartItem1).isNotEqualTo(cartItem2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CartItemDTO.class);
        CartItemDTO cartItemDTO1 = new CartItemDTO();
        cartItemDTO1.setId(1L);
        CartItemDTO cartItemDTO2 = new CartItemDTO();
        assertThat(cartItemDTO1).isNotEqualTo(cartItemDTO2);
        cartItemDTO2.setId(cartItemDTO1.getId());
        assertThat(cartItemDTO1).isEqualTo(cartItemDTO2);
        cartItemDTO2.setId(2L);
        assertThat(cartItemDTO1).isNotEqualTo(cartItemDTO2);
        cartItemDTO1.setId(null);
        assertThat(cartItemDTO1).isNotEqualTo(cartItemDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cartItemMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cartItemMapper.fromId(null)).isNull();
    }
}
