package com.lesnouveauxpetitsmondes.store.service.dto;


import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the Cart entity.
 */
public class CartDTO implements Serializable {

    private Long id;
    private BigDecimal total;
    private Set<CartItemDTO> items = new HashSet<>();

    public BigDecimal getTotal() {
        return this.total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CartDTO cartDTO = (CartDTO) o;
        if(cartDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cartDTO.getId());
    }

    public Set<CartItemDTO> getItems() {
        return this.items;
    }

    public void setItems(Set<CartItemDTO> items) {
        this.items = items;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CartDTO{" +
            "id=" + getId() +
            ", total=" + getTotal() +
            ", items=" + getItems().size() +
            "}";
    }
}
