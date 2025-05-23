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


import java.util.*;

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
        Optional<Juego> juegoOptional = juegoRepository.findById(id);
        return juegoOptional
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/juegos/usuario/{id}")
    public ResponseEntity<Set<Juego>> getJuegosPorUsuarioId(@PathVariable Long id) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        return usuarioOptional.map(usuario -> ResponseEntity.ok(usuario.getJuegos())).orElseGet(() -> ResponseEntity.notFound().build());


    }

    @PostMapping("/juegos")
    public ResponseEntity<Juego> crearJuego(@RequestBody Juego nuevoJuego) {
        try {
            Juego juegoGuardado = juegoRepository.save(nuevoJuego);
            return ResponseEntity.ok(juegoGuardado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/juegos/{id}")
    public ResponseEntity<Void> borrarJuego(@PathVariable Long id) {
        Optional<Juego> juegoOptional = juegoRepository.findById(id);
        
        if (juegoOptional.isPresent()) {
            juegoRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // 404
        }
    }

    @PutMapping("/juegos/{id}")
    public ResponseEntity<?> actualizarJuego(@PathVariable Long id, @RequestBody Juego juegoActualizado) {
        Optional<Juego> juegoOptional = juegoRepository.findById(id);

        if (juegoOptional.isPresent()) {
            Juego juegoExistente = juegoOptional.get();

            juegoExistente.setNombre(juegoActualizado.getNombre());
            juegoExistente.setDescripcion(juegoActualizado.getDescripcion());
            juegoExistente.setPrecio(juegoActualizado.getPrecio());
            juegoExistente.setPortada(juegoActualizado.getPortada());
            juegoExistente.setFoto_larga(juegoActualizado.getFoto_larga());
            juegoExistente.setVideo(juegoActualizado.getVideo());
            juegoExistente.setCategoria(juegoActualizado.getCategoria());

            juegoRepository.save(juegoExistente);

            return ResponseEntity.ok(juegoExistente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
