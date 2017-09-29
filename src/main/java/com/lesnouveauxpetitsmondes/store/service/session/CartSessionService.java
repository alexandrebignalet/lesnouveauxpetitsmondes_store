package com.lesnouveauxpetitsmondes.store.service.session;


import com.lesnouveauxpetitsmondes.store.domain.Cart;
import com.lesnouveauxpetitsmondes.store.service.dto.CartDTO;
import com.lesnouveauxpetitsmondes.store.service.dto.CartItemDTO;

public interface CartSessionService {

    CartItemDTO addItemsToCart(CartItemDTO cartItemDTO, boolean update);
    void removeItemsFromCart(CartItemDTO cartItemDTO);
    Cart getCart();
    CartDTO getCartDTO();
    String getSessionKeyName();
}
