package com.lesnouveauxpetitsmondes.store.repository;

import com.lesnouveauxpetitsmondes.store.domain.Category;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Category entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

}
