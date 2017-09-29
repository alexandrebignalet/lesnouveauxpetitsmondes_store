package com.lesnouveauxpetitsmondes.store.repository.search;

import com.lesnouveauxpetitsmondes.store.domain.UserExtraInfo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the UserExtraInfo entity.
 */
public interface UserExtraInfoSearchRepository extends ElasticsearchRepository<UserExtraInfo, Long> {
}
