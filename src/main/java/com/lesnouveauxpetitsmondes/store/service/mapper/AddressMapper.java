package com.lesnouveauxpetitsmondes.store.service.mapper;

import com.lesnouveauxpetitsmondes.store.domain.Address;
import com.lesnouveauxpetitsmondes.store.service.dto.AddressDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Address and its DTO AddressDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AddressMapper extends EntityMapper <AddressDTO, Address> {

    @Mapping(source = "countryCode", target = "countryCode")
    @Mapping(source = "zipCode", target = "zipCode")
    Address toEntity(AddressDTO addressDTO);

    default Address fromId(Long id) {
        if (id == null) {
            return null;
        }
        Address address = new Address();
        address.setId(id);
        return address;
    }

    @Mapping(source = "street", target = "line1")
    @Mapping(source = "zipCode", target = "postalCode")
    com.paypal.api.payments.Address toPaypalEntity(AddressDTO addressDTO);
}
