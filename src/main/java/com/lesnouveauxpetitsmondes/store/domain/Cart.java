package com.lesnouveauxpetitsmondes.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

/**
 * A Cart.
 */
@Entity
@Table(name = "cart")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Document(indexName = "cart")
public class Cart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @OneToMany(mappedBy = "cart")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<CartItem> items = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<CartItem> getItems() {
        return items;
    }

    public Cart items(Set<CartItem> cartItems) {
        this.items = cartItems;
        return this;
    }

    public Optional<CartItem> findProduct(CartItem cartItem) {
        return items.stream().filter(item -> cartItem.getProduct().getId().equals(item.getProduct().getId())).findFirst();
    }

    public Cart addItem(CartItem cartItem) {
        Optional<CartItem> itemSearched = findProduct(cartItem);

        if(itemSearched.isPresent()) {
            itemSearched.get().setQuantity(itemSearched.get().getQuantity() + cartItem.getQuantity());
            return this;
        }

        this.items.add(cartItem);
        cartItem.setCart(this);
        return this;
    }

    public Cart updateQuantityToItem(CartItem cartItem) {
        Optional<CartItem> maybeCartItem = findProduct(cartItem);
        maybeCartItem.ifPresent(cartItemPresent -> cartItemPresent.setQuantity(cartItem.getQuantity()));
        return this;
    }

    public Cart removeItem(CartItem cartItem) {
        Optional<CartItem> maybeCartItem = findProduct(cartItem);
        maybeCartItem.ifPresent(cartItemPresent -> this.items.remove(cartItemPresent));
        return this;
    }

    public void setItems(Set<CartItem> cartItems) {
        this.items = cartItems;
    }

    public BigDecimal getTotal() {
        return items.size() == 0 ? BigDecimal.ZERO : items.stream().map(CartItem::getTotalPrice).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Cart cart = (Cart) o;
        if (cart.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cart.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cart{" +
            "id=" + getId() +
            "}";
    }
}
