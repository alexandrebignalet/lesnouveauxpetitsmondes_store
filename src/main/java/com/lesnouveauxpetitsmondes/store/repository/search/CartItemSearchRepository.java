package com.lesnouveauxpetitsmondes.store.repository.search;

import com.lesnouveauxpetitsmondes.store.domain.CartItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CartItem entity.
 */
public interface CartItemSearchRepository extends ElasticsearchRepository<CartItem, Long> {
}
