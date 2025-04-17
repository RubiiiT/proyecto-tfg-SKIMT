package com.skimt.backend.controllers;

import com.skimt.backend.Entities.Juego;
import com.skimt.backend.Entities.Usuario;
import com.skimt.backend.repositories.JuegoRepository;
import com.skimt.backend.repositories.UsuarioRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
public class JuegoController {

    private final JuegoRepository juegoRepository;
    private final UsuarioRepository usuarioRepository;

    public JuegoController(JuegoRepository juegoRepository, UsuarioRepository usuarioRepository) {
        this.juegoRepository = juegoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    // Obtener juegos con filtros opcionales
    @GetMapping("/juegos")
    public List<Juego> getJuegos(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) Double precio) {

        if (categoria != null && categoria.equals("")) {
            categoria = null;
        }

        return juegoRepository.findByFilters(nombre, categoria, precio);
    }

    // Obtener juegos aleatorios
    @GetMapping("/juegos/aleatorios")
    public List<Juego> getJuegosAleatorios() {
        List<Juego> todos = juegoRepository.findAll();
        Collections.shuffle(todos);

        return todos.subList(0, Math.min(5, todos.size()));
    }

    // Obtener usuarios que tienen un juego (menos el actual)
    @GetMapping("/juegos/{juegoId}/usuarios")
    public List<Usuario> getUsuariosQueTienenJuego(@PathVariable Long juegoId, @RequestParam Long usuarioId) {
        return usuarioRepository.findUsuariosByJuegoIdExceptUsuarioId(juegoId, usuarioId);
    }

    // Obtener juegos por nombre y usuario
    @GetMapping("/juegos/por-nombre-y-usuario")
    public List<Juego> obtenerJuegosPorNombreYUsuario(
            @RequestParam(required = false) String nombre,
            @RequestParam Long usuarioId) {
        if (nombre != null && !nombre.isEmpty()) {
            return juegoRepository.findByNombreContainingAndUsuarioId(nombre, usuarioId);
        } else {
            return juegoRepository.findByUsuarioId(usuarioId);
        }
    }
    @GetMapping("/juegos/{id}")
    public ResponseEntity<Juego> getJuegoPorId(@PathVariable Long id) {
        Optional<Juego> juegoOptional = repository.findById(id);
        return juegoOptional
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
