package com.skimt.backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long usuarioId;

    @Column(nullable = false, unique = true)
    private String firebaseUid;

    @Column(nullable = false, length = 100,unique = true)
    private String nombre;

    @Column(nullable = false)
    private int dinero;

    // Añadimos el campo email
    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Resena> resenas = new HashSet<>();

    // Relación ManyToMany con Juego
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "usuario_juego", // Nombre de la tabla intermedia
            joinColumns = @JoinColumn(name = "usuarioId"), // Clave foránea a la tabla Usuario
            inverseJoinColumns = @JoinColumn(name = "juegoId") // Clave foránea a la tabla Juego
    )
    private Set<Juego> juegos = new HashSet<>();

    // Constructor vacío
    public Usuario() {}

    // Constructor con todos los campos
    public Usuario(Long usuario_id, String firebase_uid, String nombre, int dinero, String email) {
        this.usuarioId = usuario_id;
        this.firebaseUid = firebase_uid;
        this.nombre = nombre;
        this.dinero = dinero;
        this.email = email;
    }



    // Getters y Setters

    public Set<Resena> getResenas() {
        return resenas;
    }

    public void setResenas(Set<Resena> resenas) {
        this.resenas = resenas;
    }

    public Long getUsuario_id() {
        return usuarioId;
    }

    public void setUsuario_id(Long usuario_id) {
        this.usuarioId = usuario_id;
    }

    public String getFirebase_uid() {
        return firebaseUid;
    }

    public void setFirebase_uid(String firebase_uid) {
        this.firebaseUid = firebase_uid;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getDinero() {
        return dinero;
    }

    public void setDinero(int dinero) {
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
                "usuario_id=" + usuarioId +
                ", firebase_uid='" + firebaseUid + '\'' +
                ", nombre='" + nombre + '\'' +
                ", dinero=" + dinero +
                ", email='" + email + '\'' +
                '}';
    }
}
