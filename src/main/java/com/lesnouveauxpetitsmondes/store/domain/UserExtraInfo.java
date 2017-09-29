package com.lesnouveauxpetitsmondes.store.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A UserExtraInfo.
 */
@Entity
@Table(name = "user_extra_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "userextrainfo")
public class UserExtraInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Address shippingAddress;

    @ManyToOne(optional = false)
    @NotNull
    private Address billingAddress;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
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

    public UserExtraInfo shippingAddress(Address address) {
        this.shippingAddress = address;
        return this;
    }

    public void setShippingAddress(Address address) {
        this.shippingAddress = address;
    }

    public Address getBillingAddress() {
        return billingAddress;
    }

    public UserExtraInfo billingAddress(Address address) {
        this.billingAddress = address;
        return this;
    }

    public void setBillingAddress(Address address) {
        this.billingAddress = address;
    }

    public User getUser() {
        return user;
    }

    public UserExtraInfo user(User user) {
        this.user = user;
        return this;
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
        UserExtraInfo userExtraInfo = (UserExtraInfo) o;
        if (userExtraInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userExtraInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserExtraInfo{" +
            "id=" + getId() +
            "}";
    }
}
