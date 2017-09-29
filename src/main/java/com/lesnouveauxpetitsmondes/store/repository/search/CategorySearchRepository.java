package com.lesnouveauxpetitsmondes.store.repository.search;

import com.lesnouveauxpetitsmondes.store.domain.Category;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Category entity.
 */
public interface CategorySearchRepository extends ElasticsearchRepository<Category, Long> {
}
