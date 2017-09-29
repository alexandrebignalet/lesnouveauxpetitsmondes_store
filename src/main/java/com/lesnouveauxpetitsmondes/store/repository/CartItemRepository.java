package com.lesnouveauxpetitsmondes.store.repository;

import com.lesnouveauxpetitsmondes.store.domain.CartItem;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CartItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Long> {

}
