package com.skimt.backend.Entities;

import java.util.List;

//Esta clase sera el pedido data transform object, el cual se recibira desde el front con toda la info necesaria para insertar
//los datos en el back
public class PedidoDTO {

    private Long usuarioId;
    private String fechaPedido;
    private int precioTotal;
    private List<JuegoPedidoDTO> juegos;

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(String fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public List<JuegoPedidoDTO> getJuegos() {
        return juegos;
    }

    public void setJuegos(List<JuegoPedidoDTO> juegos) {
        this.juegos = juegos;
    }

    public int getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(int precioTotal) {
        this.precioTotal = precioTotal;
    }

    //Como solo necesitamos el id y el precioUnitario, solo cogeremos estos para la insercion
    public static class JuegoPedidoDTO {
        private Long juegoId;
        private Double precioUnitario;

        // getters y setters

        public Long getJuegoId() {
            return juegoId;
        }

        public void setJuegoId(Long juegoId) {
            this.juegoId = juegoId;
        }

        public Double getPrecioUnitario() {
            return precioUnitario;
        }

        public void setPrecioUnitario(Double precioUnitario) {
            this.precioUnitario = precioUnitario;
        }
    }
}
