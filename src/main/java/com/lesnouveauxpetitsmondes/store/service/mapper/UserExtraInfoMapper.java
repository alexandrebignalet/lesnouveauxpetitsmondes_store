package com.lesnouveauxpetitsmondes.store.service.mapper;

import com.lesnouveauxpetitsmondes.store.domain.*;
import com.lesnouveauxpetitsmondes.store.service.dto.UserExtraInfoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserExtraInfo and its DTO UserExtraInfoDTO.
 */
@Mapper(componentModel = "spring", uses = {AddressMapper.class, UserMapper.class, })
public interface UserExtraInfoMapper extends EntityMapper <UserExtraInfoDTO, UserExtraInfo> {

    @Mapping(source = "shippingAddress", target = "shippingAddress")

    @Mapping(source = "billingAddress", target = "billingAddress")

    @Mapping(source = "user", target = "user")
    UserExtraInfoDTO toDto(UserExtraInfo userExtraInfo);

    @Mapping(source = "user", target = "user")
    UserExtraInfo toEntity(UserExtraInfoDTO userExtraInfoDTO);
    default UserExtraInfo fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserExtraInfo userExtraInfo = new UserExtraInfo();
        userExtraInfo.setId(id);
        return userExtraInfo;
    }
}
