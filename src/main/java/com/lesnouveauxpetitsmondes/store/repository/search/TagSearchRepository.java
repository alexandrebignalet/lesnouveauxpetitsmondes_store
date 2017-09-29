package com.lesnouveauxpetitsmondes.store.repository.search;

import com.lesnouveauxpetitsmondes.store.domain.Tag;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Tag entity.
 */
public interface TagSearchRepository extends ElasticsearchRepository<Tag, Long> {
}
