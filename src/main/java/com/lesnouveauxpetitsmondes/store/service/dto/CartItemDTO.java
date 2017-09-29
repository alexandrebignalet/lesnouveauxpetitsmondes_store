package com.lesnouveauxpetitsmondes.store.service.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the CartItem entity.
 */
public class CartItemDTO implements Serializable {

    private Long id;

    @NotNull
    @Min(value = 1)
    private Integer quantity;

    @NotNull
    private Long productId;

    @NotNull
    private String productName;

    @NotNull
    @Min(value = 0)
    private BigDecimal productPrice;

    private Long cartId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public BigDecimal getProductPrice() { return productPrice; }

    @JsonIgnore // mandatory in order to not be serialized
    public BigDecimal getTotal() {
        return productPrice.multiply(new BigDecimal(quantity));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CartItemDTO cartItemDTO = (CartItemDTO) o;
        if(cartItemDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cartItemDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CartItemDTO{" +
            "id=" + getId() +
            ", cartId=" + getCartId()+
            ", productId=" + getProductId()+
            ", productName =" + getProductName() +
            ", quantity='" + getQuantity() + "'" +
            "}";
    }
}
