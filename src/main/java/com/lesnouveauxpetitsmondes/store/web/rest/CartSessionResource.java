package com.lesnouveauxpetitsmondes.store.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lesnouveauxpetitsmondes.store.service.dto.CartDTO;
import com.lesnouveauxpetitsmondes.store.service.dto.CartItemDTO;
import com.lesnouveauxpetitsmondes.store.service.session.CartSessionService;
import com.lesnouveauxpetitsmondes.store.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

/**
 * REST controller for managing Cart in redis session.
 */
@RestController
@RequestMapping("/api")
public class CartSessionResource {

    private final Logger log = LoggerFactory.getLogger(CartSessionResource.class);

    private final CartSessionService cartSessionService;

    public CartSessionResource(CartSessionService cartSessionService) {
        this.cartSessionService = cartSessionService;
    }

    /**
     * GET  /cart-session : get the current User Cart.
     *
     * @return the ResponseEntity with status 200 (OK) and the current user cart in body
     */
    @GetMapping("/cart-session")
    @Timed
    public CartDTO getSessionCart() {
        log.debug("REST request to get the current User Cart");
        return cartSessionService.getCartDTO();
    }

    /**
     * POST  /cart-session : Add a cartItem to the user's cart.
     *
     * @param cartItemDTO to be added to the user's cart
     * @return the ResponseEntity with status 201 (Created) and with body the new cartDTO, or with status 400 (Bad Request) if the cart has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cart-session")
    @Timed
    public ResponseEntity<CartItemDTO> addItemToCart(@RequestBody @Valid CartItemDTO cartItemDTO) throws URISyntaxException {
        log.debug("REST request to addCartItemToCartUser Cart : {}", cartItemDTO);

        CartItemDTO result = cartSessionService.addItemsToCart(cartItemDTO, false);

        if (result == null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("Cart", "productnotfound", "A cartItem must have an existing product")).body(null);
        }

        return ResponseEntity.created(new URI("/api/cart-session"))
            .headers(HeaderUtil.createEntityCreationAlert("Item added to cart: ", cartItemDTO.getProductName()))
            .body(result);
    }

    /**
     * PUT  /cart-session : Updates an existing cart item in the cart.
     *
     * @param cartItemDTO the cartDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cartDTO,
     * or with status 400 (Bad Request) if the cartDTO is not valid,
     * or with status 500 (Internal Server Error) if the cartDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cart-session")
    @Timed
    public ResponseEntity<CartItemDTO> updateItemInsideCart(@RequestBody @Valid CartItemDTO cartItemDTO) throws URISyntaxException {
        log.debug("REST request to update CartItem Qt : {}", cartItemDTO);

        CartItemDTO result = cartSessionService.addItemsToCart(cartItemDTO, true);

        if (result == null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("Cart", "productnotfound", "A cartItem must be full by an existing product")).body(null);
        }

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("Qt updated ", cartItemDTO.getProductName()))
            .body(result);
    }

    /**
     * DELETE  /cart-session : delete a cart item from the cart.
     *
     * @param cartItemDTO the cart item of the current user cart to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cart-session")
    @Timed
    public ResponseEntity<Void> deleteItemInsideCart(@RequestBody @Valid CartItemDTO cartItemDTO) {
        log.debug("REST request to delete CartItem : {}", cartItemDTO);
        cartSessionService.removeItemsFromCart(cartItemDTO);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("The item has been deleted from the cart: ", cartItemDTO.getProductName())).build();
    }
}
