package com.lesnouveauxpetitsmondes.store.service.mapper;

import com.lesnouveauxpetitsmondes.store.domain.CartItem;
import com.lesnouveauxpetitsmondes.store.service.CheckoutService;
import com.lesnouveauxpetitsmondes.store.service.dto.CartItemDTO;
import com.paypal.api.payments.Item;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity CartItem and its DTO CartItemDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, CartMapper.class, })
public interface CartItemMapper extends EntityMapper <CartItemDTO, CartItem> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    @Mapping(source = "product.price", target = "productPrice")
    @Mapping(source = "cart.id", target = "cartId")
    CartItemDTO toDto(CartItem cartItem);

    @Mapping(source = "productId", target = "product")
    @Mapping(source = "cartId", target = "cart")
    CartItem toEntity(CartItemDTO cartItemDTO);
    default CartItem fromId(Long id) {
        if (id == null) {
            return null;
        }
        CartItem cartItem = new CartItem();
        cartItem.setId(id);
        return cartItem;
    }

    @Mapping(source="productName", target="name")
    @Mapping(source="quantity", target="quantity")
    @Mapping(target="currency", constant = CheckoutService.DEFAULT_CURRENCY)
    @Mapping(source="total", target = "price")
    Item toPaypalItem(CartItemDTO cartItemDTO);
}
