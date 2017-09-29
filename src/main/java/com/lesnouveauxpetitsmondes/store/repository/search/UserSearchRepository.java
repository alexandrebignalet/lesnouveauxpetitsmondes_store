package com.lesnouveauxpetitsmondes.store.repository.search;

import com.lesnouveauxpetitsmondes.store.domain.User;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the User entity.
 */
public interface UserSearchRepository extends ElasticsearchRepository<User, Long> {
}
