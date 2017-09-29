package com.lesnouveauxpetitsmondes.store.service.session;

import com.lesnouveauxpetitsmondes.store.domain.Cart;
import com.lesnouveauxpetitsmondes.store.domain.CartItem;
import com.lesnouveauxpetitsmondes.store.domain.Product;
import com.lesnouveauxpetitsmondes.store.repository.ProductRepository;
import com.lesnouveauxpetitsmondes.store.service.UserService;
import com.lesnouveauxpetitsmondes.store.service.dto.CartDTO;
import com.lesnouveauxpetitsmondes.store.service.dto.CartItemDTO;
import com.lesnouveauxpetitsmondes.store.service.mapper.CartItemMapper;
import com.lesnouveauxpetitsmondes.store.service.mapper.CartMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class CartSessionServiceImpl implements CartSessionService {

    private final Logger log = LoggerFactory.getLogger(CartSessionServiceImpl.class);

    private final HttpSession httpSession;
    private final CartMapper cartMapper;
    private final CartItemMapper cartItemMapper;
    private final UserService userService;
    private final ProductRepository productRepository;

    public static final String CART_ATTRIBUTE_NAME = ":ShoppingCart";
    private String sessionKeyName;

    public CartSessionServiceImpl(HttpSession httpSession, CartMapper cartMapper, CartItemMapper cartItemMapper, UserService userService, ProductRepository productRepository) {
        this.httpSession = httpSession;
        this.cartMapper = cartMapper;
        this.cartItemMapper = cartItemMapper;
        this.userService = userService;
        this.productRepository = productRepository;
    }

    private Cart getCartInSession() {
        this.sessionKeyName = this.userService.getUserWithAuthorities().getLogin() + CART_ATTRIBUTE_NAME;

        if (httpSession == null) {
            return new Cart();
        }

        Cart cart = (Cart)this.httpSession.getAttribute(this.sessionKeyName);

        if (cart == null) {
            cart = new Cart();
            httpSession.setAttribute(this.sessionKeyName, cart);
        }

        return cart;
    }

    @Override
    public CartItemDTO addItemsToCart(CartItemDTO cartItemDTO, boolean update) {
        Cart cart = this.getCartInSession();
        CartItem cartItem = cartItemMapper.toEntity(cartItemDTO);

        Product product = productRepository.findOne(cartItem.getProduct().getId());
        if (product == null) return null;

        cartItem.setProduct(product);

        if(!update) {
            cart.addItem(cartItem);
        } else {
            cart.updateQuantityToItem(cartItem);
        }

        return cartItemMapper.toDto(cartItem);
    }

    @Override
    public void removeItemsFromCart(CartItemDTO cartItemDTO) {
        Cart cart = this.getCartInSession();
        CartItem cartItem = cartItemMapper.toEntity(cartItemDTO);

        Product product = productRepository.findOne(cartItem.getProduct().getId());
        if (product == null) return;

        cartItem.setProduct(product);
        cart.removeItem(cartItem);
    }

    @Override
    public Cart getCart() {
        return this.getCartInSession();
    }

    public CartDTO getCartDTO() {
        return cartMapper.toDto(this.getCartInSession());
    }

    public HttpSession getSession(){
        return this.httpSession;
    }

    public String getSessionKeyName(){
        return this.sessionKeyName;
    }
}
