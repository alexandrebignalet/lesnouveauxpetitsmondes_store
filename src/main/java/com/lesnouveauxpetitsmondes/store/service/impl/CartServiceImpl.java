package com.lesnouveauxpetitsmondes.store.service.impl;

import com.lesnouveauxpetitsmondes.store.service.CartService;
import com.lesnouveauxpetitsmondes.store.domain.Cart;
import com.lesnouveauxpetitsmondes.store.repository.CartRepository;
import com.lesnouveauxpetitsmondes.store.repository.search.CartSearchRepository;
import com.lesnouveauxpetitsmondes.store.service.dto.CartDTO;
import com.lesnouveauxpetitsmondes.store.service.mapper.CartMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Cart.
 */
@Service
@Transactional
public class CartServiceImpl implements CartService{

    private final Logger log = LoggerFactory.getLogger(CartServiceImpl.class);

    private final CartRepository cartRepository;

    private final CartMapper cartMapper;

    private final CartSearchRepository cartSearchRepository;

    public CartServiceImpl(CartRepository cartRepository, CartMapper cartMapper, CartSearchRepository cartSearchRepository) {
        this.cartRepository = cartRepository;
        this.cartMapper = cartMapper;
        this.cartSearchRepository = cartSearchRepository;
    }

    /**
     * Save a cart.
     *
     * @param cartDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CartDTO save(CartDTO cartDTO) {
        log.debug("Request to save Cart : {}", cartDTO);
        Cart cart = cartMapper.toEntity(cartDTO);
        cart = cartRepository.save(cart);
        CartDTO result = cartMapper.toDto(cart);
        cartSearchRepository.save(cart);
        return result;
    }

    /**
     *  Get all the carts.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CartDTO> findAll() {
        log.debug("Request to get all Carts");
        return cartRepository.findAll().stream()
            .map(cartMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

//    /**
//     *  Get the user's Cart.
//     *
//     *  @return the entity
//     */
//    public CartDTO find() {
//        log.debug("Request to get the user's Cart");
//
//        return cartRepository.findAll().stream()
//            .map(cartMapper::toDto)
//            .collect(Collectors.toCollection(LinkedList::new));
//    }

    /**
     *  Get one cart by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CartDTO findOne(Long id) {
        log.debug("Request to get Cart : {}", id);
        Cart cart = cartRepository.findOne(id);
        return cartMapper.toDto(cart);
    }

    /**
     *  Delete the  cart by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cart : {}", id);
        cartRepository.delete(id);
        cartSearchRepository.delete(id);
    }

    /**
     * Search for the cart corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CartDTO> search(String query) {
        log.debug("Request to search Carts for query {}", query);
        return StreamSupport
            .stream(cartSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(cartMapper::toDto)
            .collect(Collectors.toList());
    }
}
