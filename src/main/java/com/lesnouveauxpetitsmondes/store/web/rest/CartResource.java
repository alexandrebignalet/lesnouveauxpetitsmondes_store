package com.lesnouveauxpetitsmondes.store.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lesnouveauxpetitsmondes.store.security.AuthoritiesConstants;
import com.lesnouveauxpetitsmondes.store.service.CartService;
import com.lesnouveauxpetitsmondes.store.service.dto.CartDTO;
import com.lesnouveauxpetitsmondes.store.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Cart.
 */
@RestController
@RequestMapping("/api")
public class CartResource {

    private final Logger log = LoggerFactory.getLogger(CartResource.class);

    private static final String ENTITY_NAME = "cart";

    private final CartService cartService;

    public CartResource(CartService cartService) {
        this.cartService = cartService;
    }

    /**
     * POST  /carts : Create a new cart.
     *
     * @param cartDTO the cartDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cartDTO, or with status 400 (Bad Request) if the cart has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/carts")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<CartDTO> createCart(@RequestBody CartDTO cartDTO) throws URISyntaxException {
        log.debug("REST request to save Cart : {}", cartDTO);
        if (cartDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new cart cannot already have an ID")).body(null);
        }
        CartDTO result = cartService.save(cartDTO);
        return ResponseEntity.created(new URI("/api/carts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /carts : Updates an existing cart.
     *
     * @param cartDTO the cartDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cartDTO,
     * or with status 400 (Bad Request) if the cartDTO is not valid,
     * or with status 500 (Internal Server Error) if the cartDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/carts")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<CartDTO> updateCart(@RequestBody CartDTO cartDTO) throws URISyntaxException {
        log.debug("REST request to update Cart : {}", cartDTO);
        if (cartDTO.getId() == null) {
            return createCart(cartDTO);
        }
        CartDTO result = cartService.save(cartDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cartDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /carts : get all the carts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of carts in body
     */
    @GetMapping("/carts")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public List<CartDTO> getAllCarts() {
        log.debug("REST request to get all Carts");
        return cartService.findAll();
    }

    /**
     * GET  /carts/:id : get the "id" cart.
     *
     * @param id the id of the cartDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cartDTO, or with status 404 (Not Found)
     */
    @GetMapping("/carts/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<CartDTO> getCart(@PathVariable Long id) {
        log.debug("REST request to get Cart : {}", id);
        CartDTO cartDTO = cartService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cartDTO));
    }

    /**
     * DELETE  /carts/:id : delete the "id" cart.
     *
     * @param id the id of the cartDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/carts/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteCart(@PathVariable Long id) {
        log.debug("REST request to delete Cart : {}", id);
        cartService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/carts?query=:query : search for the cart corresponding
     * to the query.
     *
     * @param query the query of the cart search
     * @return the result of the search
     */
    @GetMapping("/_search/carts")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public List<CartDTO> searchCarts(@RequestParam String query) {
        log.debug("REST request to search Carts for query {}", query);
        return cartService.search(query);
    }

}
