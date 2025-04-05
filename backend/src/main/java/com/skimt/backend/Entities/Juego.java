package com.skimt.backend.Entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Juego {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long juego_id;

    // Añadimos el campo nombre y lo hacemos único
    @Column(nullable = false, unique = true, length = 255)
    private String nombre;

    @Column(nullable = false)
    private Double precio;

    @Column(length = 500)
    private String descripcion;

    @Column(length = 255)
    private String portada;

    @Column(length = 255)
    private String video;

    @Column(length = 255)
    private String foto_larga;

    // Relación ManyToMany con Usuario
    @ManyToMany(mappedBy = "juegos")
    private Set<Usuario> usuarios = new HashSet<>();

    // Constructor vacío
    public Juego() {}

    // Constructor con todos los campos
    public Juego(Long juego_id, String nombre, Double precio, String descripcion, String portada, String video, String foto_larga) {
        this.juego_id = juego_id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.portada = portada;
        this.video = video;
        this.foto_larga = foto_larga;
    }

    // Getters y Setters
    public Long getJuego_id() {
        return juego_id;
    }

    public void setJuego_id(Long juego_id) {
        this.juego_id = juego_id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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
                "juego_id=" + juego_id +
                ", nombre='" + nombre + '\'' +
                ", precio=" + precio +
                ", descripcion='" + descripcion + '\'' +
                ", portada='" + portada + '\'' +
                ", video='" + video + '\'' +
                ", foto_larga='" + foto_larga + '\'' +
                '}';
    }
}
