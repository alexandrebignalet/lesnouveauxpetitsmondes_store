package com.lesnouveauxpetitsmondes.store.repository;

import com.lesnouveauxpetitsmondes.store.domain.Cart;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Cart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {

}
