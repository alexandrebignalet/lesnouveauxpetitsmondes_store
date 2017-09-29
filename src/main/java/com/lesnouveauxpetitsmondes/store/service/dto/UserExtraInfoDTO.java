package com.lesnouveauxpetitsmondes.store.service.dto;


import com.lesnouveauxpetitsmondes.store.domain.Address;
import com.lesnouveauxpetitsmondes.store.domain.User;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the UserExtraInfo entity.
 */
public class UserExtraInfoDTO implements Serializable {

    private Long id;

    private Address shippingAddress;


    private Address billingAddress;


    private User user;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Address getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(Address address) {
        this.shippingAddress = address;
    }

    public Address getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(Address address) {
        this.billingAddress = address;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserExtraInfoDTO userExtraInfoDTO = (UserExtraInfoDTO) o;
        if(userExtraInfoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userExtraInfoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserExtraInfoDTO{" +
            "id=" + getId() +
            "}";
    }
}
