package com.lesnouveauxpetitsmondes.store.service;

import com.lesnouveauxpetitsmondes.store.service.dto.CartDTO;
import java.util.List;

/**
 * Service Interface for managing Cart.
 */
public interface CartService {

    /**
     * Save a cart.
     *
     * @param cartDTO the entity to save
     * @return the persisted entity
     */
    CartDTO save(CartDTO cartDTO);

    /**
     *  Get all the carts.
     *
     *  @return the list of entities
     */
    List<CartDTO> findAll();

    /**
     *  Get the "id" cart.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    CartDTO findOne(Long id);

    /**
     *  Delete the "id" cart.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the cart corresponding to the query.
     *
     *  @param query the query of the search
     *
     *  @return the list of entities
     */
    List<CartDTO> search(String query);
}
