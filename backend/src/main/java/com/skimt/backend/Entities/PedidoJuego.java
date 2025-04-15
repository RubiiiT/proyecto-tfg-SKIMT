package com.skimt.backend.Entities;

import jakarta.persistence.*;

//Esto representa la tabla intermedia entre pedido y juego ya que es una relacion manyToMany
@Entity
public class PedidoJuego {

    @EmbeddedId
    private PedidoJuegoId id = new PedidoJuegoId();

    @ManyToOne
    @MapsId("pedidoId") // vincula el campo de la PK con el objeto Pedido
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    @ManyToOne
    @MapsId("juegoId") // vincula el campo de la PK con el objeto Juego
    @JoinColumn(name = "juego_id")
    private Juego juego;

    private Double precioUnitario;

    public PedidoJuego() {}

    // Getters y Setters

    public PedidoJuegoId getId() {
        return id;
    }

    public void setId(PedidoJuegoId id) {
        this.id = id;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public Juego getJuego() {
        return juego;
    }

    public void setJuego(Juego juego) {
        this.juego = juego;
    }

    public Double getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(Double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }
}
