package com.skimt.backend.Entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Juego {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long juegoId;

    @Column(nullable = false, unique = true, length = 255)
    private String nombre;

    @Column(nullable = false)
    private int precio;

    @Column(length = 500)
    private String descripcion;
    
    @Column(length = 500)
    private String categoria;

    @Column(length = 255)
    private String portada;

    @Column(length = 255)
    private String video;

    @Column(length = 255)
    private String foto_larga;

    @ManyToMany(mappedBy = "juegos")
    private Set<Usuario> usuarios = new HashSet<>();

    // Constructor vacío
    public Juego() {}

    // Constructor con todos los campos (incluyendo categoria)
    public Juego(Long juego_id, String nombre, int precio, String descripcion, String categoria, String portada, String video, String foto_larga) {
        this.juegoId = juego_id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.portada = portada;
        this.video = video;
        this.foto_larga = foto_larga;
    }

    // Getters y Setters
    public Long getJuego_id() {
        return juegoId;
    }

    public void setJuego_id(Long juego_id) {
        this.juegoId = juego_id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getPrecio() {
        return precio;
    }

    public void setPrecio(int precio) {
        this.precio = precio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getPortada() {
        return portada;
    }

    public void setPortada(String portada) {
        this.portada = portada;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public String getFoto_larga() {
        return foto_larga;
    }

    public void setFoto_larga(String foto_larga) {
        this.foto_larga = foto_larga;
    }

    public Set<Usuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(Set<Usuario> usuarios) {
        this.usuarios = usuarios;
    }

    @Override
    public String toString() {
        return "Juego{" +
                "juego_id=" + juegoId +
                ", nombre='" + nombre + '\'' +
                ", precio=" + precio +
                ", descripcion='" + descripcion + '\'' +
                ", categoria='" + categoria + '\'' +
                ", portada='" + portada + '\'' +
                ", video='" + video + '\'' +
                ", foto_larga='" + foto_larga + '\'' +
                '}';
    }
}
