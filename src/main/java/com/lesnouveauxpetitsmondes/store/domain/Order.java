package com.lesnouveauxpetitsmondes.store.domain;

import com.lesnouveauxpetitsmondes.store.domain.enumeration.OrderStatus;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Order.
 */
@Entity
@Table(name = "jhi_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "order")
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "shipped_date")
    private LocalDate shippedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Cart cart;

    @ManyToOne(optional = false)
    @NotNull
    private Address shippingAddress;

    @ManyToOne(optional = false)
    @NotNull
    private Address billingAddress;

    @ManyToOne(optional = false)
    @NotNull
    private UserExtraInfo userei;

    public Order() {
        this.status = OrderStatus.NEW;
        this.creationDate = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public Order creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getShippedDate() {
        return shippedDate;
    }

    public Order shippedDate(LocalDate shippedDate) {
        this.shippedDate = shippedDate;
        return this;
    }

    public void setShippedDate(LocalDate shippedDate) {
        this.shippedDate = shippedDate;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public Order status(OrderStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Cart getCart() {
        return cart;
    }

    public Order cart(Cart cart) {
        this.cart = cart;
        return this;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Address getShippingAddress() {
        return shippingAddress;
    }

    public Order shippingAddress(Address address) {
        this.shippingAddress = address;
        return this;
    }

    public void setShippingAddress(Address address) {
        this.shippingAddress = address;
    }

    public Address getBillingAddress() {
        return billingAddress;
    }

    public Order billingAddress(Address address) {
        this.billingAddress = address;
        return this;
    }

    public void setBillingAddress(Address address) {
        this.billingAddress = address;
    }

    public UserExtraInfo getUserei() {
        return userei;
    }

    public Order userei(UserExtraInfo userExtraInfo) {
        this.userei = userExtraInfo;
        return this;
    }

    public void setUserei(UserExtraInfo userExtraInfo) {
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
        Order order = (Order) o;
        if (order.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), order.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", creationDate='" + getCreationDate() + "'" +
            ", shippedDate='" + getShippedDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
