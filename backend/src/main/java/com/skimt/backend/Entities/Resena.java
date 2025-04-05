package com.skimt.backend.Entities;

import jakarta.persistence.*;

@Entity
public class Resena {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resena_id;  // Clave primaria

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;  // Relación con Usuario

    @ManyToOne
    @JoinColumn(name = "juego_id", nullable = false)
    private Juego juego;  // Relación con Juego

    @Column(length = 1000)
    private String descripcion;  // Descripción de la reseña

    @Column(nullable = false)
    private Integer puntuacion;  // Puntuación (por ejemplo, entre 1 y 5)

    // Constructor vacío
    public Resena() {}

    // Constructor con todos los campos
    public Resena(Usuario usuario, Juego juego, String descripcion, Integer puntuacion) {
        this.usuario = usuario;
        this.juego = juego;
        this.descripcion = descripcion;
        this.puntuacion = puntuacion;
    }

    // Getters y Setters
    public Long getResena_id() {
        return resena_id;
    }

    public void setResena_id(Long resena_id) {
        this.resena_id = resena_id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Juego getJuego() {
        return juego;
    }

    public void setJuego(Juego juego) {
        this.juego = juego;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getPuntuacion() {
        return puntuacion;
    }

    public void setPuntuacion(Integer puntuacion) {
        this.puntuacion = puntuacion;
    }

    @Override
    public String toString() {
        return "Resena{" +
                "resena_id=" + resena_id +
                ", usuario=" + usuario.getNombre() +
                ", juego=" + juego.getDescripcion() +
                ", descripcion='" + descripcion + '\'' +
                ", puntuacion=" + puntuacion +
                '}';
    }
}
