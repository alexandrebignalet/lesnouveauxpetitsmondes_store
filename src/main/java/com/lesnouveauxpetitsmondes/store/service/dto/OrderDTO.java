package com.lesnouveauxpetitsmondes.store.service.dto;


import com.lesnouveauxpetitsmondes.store.domain.enumeration.OrderStatus;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the Order entity.
 */
public class OrderDTO implements Serializable {

    private Long id;

    private LocalDate creationDate;

    private LocalDate shippedDate;

    private OrderStatus status;

    private CartDTO cart;

    private AddressDTO shippingAddress;

    private AddressDTO billingAddress;

    private UserExtraInfoDTO userei;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getShippedDate() {
        return shippedDate;
    }

    public void setShippedDate(LocalDate shippedDate) {
        this.shippedDate = shippedDate;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public CartDTO getCart() {
        return cart;
    }

    public void setCart(CartDTO cart) {
        this.cart = cart;
    }

    public AddressDTO getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(AddressDTO address) {
        this.shippingAddress = address;
    }

    public AddressDTO getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(AddressDTO address) {
        this.billingAddress = address;
    }

    public UserExtraInfoDTO getUserei() {
        return userei;
    }

    public void setUserei(UserExtraInfoDTO userExtraInfo) {
        this.userei = userExtraInfo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrderDTO orderDTO = (OrderDTO) o;
        if(orderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderDTO{" +
            "id=" + getId() +
            ", creationDate='" + getCreationDate() + "'" +
            ", shippedDate='" + getShippedDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
