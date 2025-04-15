package com.skimt.backend.Entities;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PedidoJuegoId implements Serializable {

    private Long pedidoId;
    private Long juegoId;

    public PedidoJuegoId() {}

    public PedidoJuegoId(Long pedidoId, Long juegoId) {
        this.pedidoId = pedidoId;
        this.juegoId = juegoId;
    }

    // Getters y Setters
    public Long getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(Long pedidoId) {
        this.pedidoId = pedidoId;
    }

    public Long getJuegoId() {
        return juegoId;
    }

    public void setJuegoId(Long juegoId) {
        this.juegoId = juegoId;
    }

    // equals() y hashCode() son obligatorios cuando hacemos priamry keys compuestas como estas para ver si podemos o no insertar
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PedidoJuegoId)) return false;
        PedidoJuegoId that = (PedidoJuegoId) o;
        return Objects.equals(pedidoId, that.pedidoId) &&
                Objects.equals(juegoId, that.juegoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pedidoId, juegoId);
    }
}
