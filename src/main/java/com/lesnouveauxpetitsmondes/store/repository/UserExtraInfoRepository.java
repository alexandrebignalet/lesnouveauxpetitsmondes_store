package com.lesnouveauxpetitsmondes.store.repository;

import com.lesnouveauxpetitsmondes.store.domain.UserExtraInfo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserExtraInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserExtraInfoRepository extends JpaRepository<UserExtraInfo,Long> {

}
