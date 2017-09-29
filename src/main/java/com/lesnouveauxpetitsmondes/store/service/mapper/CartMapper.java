package com.lesnouveauxpetitsmondes.store.service.mapper;

import com.lesnouveauxpetitsmondes.store.domain.*;
import com.lesnouveauxpetitsmondes.store.service.dto.CartDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Cart and its DTO CartDTO.
 */
@Mapper(componentModel = "spring", uses = {CartItemMapper.class, })
public interface CartMapper extends EntityMapper <CartDTO, Cart> {

    @Mapping(target = "items", ignore = true)
    Cart toEntity(CartDTO cartDTO);
    default Cart fromId(Long id) {
        if (id == null) {
            return null;
        }
        Cart cart = new Cart();
        cart.setId(id);
        return cart;
    }
}
