package com.skimt.backend.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    //Aqui lo dejamos asi ya que la tabla intermedia solo tendra las claves entonces se puede dejar asi
    @ManyToMany(mappedBy = "juegos", cascade = CascadeType.ALL)
    @JsonIgnore  //Esto ultimo para el tema de recursividad ya que si luego intento recueprar juegos o usuarios, va a entrar en un bucle infinito
    //Porque un juego tiene un array de usuarios que a su vez tiene un array de juegos y asi infinitamente
    private Set<Usuario> usuarios = new HashSet<>();

    //Relacion oneToMany aun que sea ManyToMany porque estamos creando manualmente nosotros
    //la tabla intermedia porque tiene valores extras a aprte de las priamry keys
    @OneToMany(mappedBy = "juego", cascade = CascadeType.ALL)
    @JsonIgnore  //Esto ultimo para el tema de recursividad ya que si luego intento recueprar juegos o pedidos, va a entrar en un bucle infinito
    //Porque un juego tiene un array de pedidos que a su vez tiene un array de juegos y asi infinitamente
    private Set<PedidoJuego> pedidos = new HashSet<>();


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

    public Set<PedidoJuego> getPedidos() {
        return pedidos;
    }

    public void setPedidos(Set<PedidoJuego> pedidos) {
        this.pedidos = pedidos;
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
