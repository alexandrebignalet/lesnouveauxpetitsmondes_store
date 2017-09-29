package com.lesnouveauxpetitsmondes.store.service.mapper;

import com.lesnouveauxpetitsmondes.store.domain.Order;
import com.lesnouveauxpetitsmondes.store.service.dto.OrderDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Order and its DTO OrderDTO.
 */
@Mapper(componentModel = "spring", uses = {CartMapper.class, AddressMapper.class, UserExtraInfoMapper.class, })
public interface OrderMapper extends EntityMapper <OrderDTO, Order> {

    @Mapping(source = "cart", target = "cart")

    @Mapping(source = "shippingAddress", target = "shippingAddress")

    @Mapping(source = "billingAddress", target = "billingAddress")

    @Mapping(source = "userei", target = "userei")
    OrderDTO toDto(Order order);

    @InheritInverseConfiguration(name = "toDto")
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "shippedDate", source = "shippedDate")
    @Mapping(target = "creationDate", ignore = true)
    Order toEntity(OrderDTO orderDTO);
    default Order fromId(Long id) {
        if (id == null) {
            return null;
        }
        Order order = new Order();
        order.setId(id);
        return order;
    }
}
