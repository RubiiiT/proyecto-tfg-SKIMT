package com.skimt.backend.Entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long usuario_id;

    @Column(nullable = false, unique = true)
    private String firebase_uid;

    @Column(nullable = false, length = 100,unique = true)
    private String nombre;

    @Column(nullable = false)
    private Double dinero;

    // Añadimos el campo email
    @Column(nullable = false, unique = true, length = 255)
    private String email;

    // Relación ManyToMany con Juego
    @ManyToMany
    @JoinTable(
            name = "usuario_juego", // Nombre de la tabla intermedia
            joinColumns = @JoinColumn(name = "usuario_id"), // Clave foránea a la tabla Usuario
            inverseJoinColumns = @JoinColumn(name = "juego_id") // Clave foránea a la tabla Juego
    )
    private Set<Juego> juegos = new HashSet<>();

    // Constructor vacío
    public Usuario() {}

    // Constructor con todos los campos
    public Usuario(Long usuario_id, String firebase_uid, String nombre, Double dinero, String email) {
        this.usuario_id = usuario_id;
        this.firebase_uid = firebase_uid;
        this.nombre = nombre;
        this.dinero = dinero;
        this.email = email;
    }

    // Getters y Setters
    public Long getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(Long usuario_id) {
        this.usuario_id = usuario_id;
    }

    public String getFirebase_uid() {
        return firebase_uid;
    }

    public void setFirebase_uid(String firebase_uid) {
        this.firebase_uid = firebase_uid;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getDinero() {
        return dinero;
    }

    public void setDinero(Double dinero) {
        this.dinero = dinero;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Juego> getJuegos() {
        return juegos;
    }

    public void setJuegos(Set<Juego> juegos) {
        this.juegos = juegos;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "usuario_id=" + usuario_id +
                ", firebase_uid='" + firebase_uid + '\'' +
                ", nombre='" + nombre + '\'' +
                ", dinero=" + dinero +
                ", email='" + email + '\'' +
                '}';
    }
}
