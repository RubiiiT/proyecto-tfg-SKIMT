package com.skimt.backend.Entities;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pedidoId;

    @ManyToOne
    @JoinColumn(name = "usuarioId", nullable = false)
    private Usuario usuario;


    @Column(nullable = false)
    private int cantidadJuegos;

    @Column(nullable = false)
    private String fechaPedido;

    @Column(nullable = false)
    private int precioTotal;

    //Relacion oneToMany aun que sea ManyToMany porque estamos creando manualmente nosotros la tabla intermedia
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private Set<PedidoJuego> juegosPedidos = new HashSet<>();

    public Pedido() {
    }

    public Pedido(Long pedidoId, Usuario usuario, int cantidadJuegos, int precioTotal,String fechaPedido) {
        this.pedidoId = pedidoId;
        this.usuario = usuario;
        this.cantidadJuegos = cantidadJuegos;
        this.precioTotal = precioTotal;
        this.fechaPedido = fechaPedido;
    }

    public String getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(String fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public void setPedidoId(Long pedidoId) {
        this.pedidoId = pedidoId;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setPrecioTotal(int precioTotal) {
        this.precioTotal = precioTotal;
    }

    public void setCantidadJuegos(int cantidadJuegos) {
        this.cantidadJuegos = cantidadJuegos;
    }

    public Long getPedidoId() {
        return pedidoId;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public int getCantidadJuegos() {
        return cantidadJuegos;
    }

    public int getPrecioTotal() {
        return precioTotal;
    }

    @Override
    public String toString() {
        return "Pedido{" +
                "pedidoId=" + pedidoId +
                ", usuario=" + usuario +
                ", cantidadJuegos=" + cantidadJuegos +
                ", precioTotal=" + precioTotal +
                ", fechaPedido="+ fechaPedido+
                '}';
    }
}
