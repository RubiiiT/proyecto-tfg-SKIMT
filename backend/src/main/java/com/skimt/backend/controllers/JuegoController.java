package com.skimt.backend.controllers;

import com.skimt.backend.Entities.Juego;
import com.skimt.backend.repositories.JuegoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
public class JuegoController {

    private final JuegoRepository repository;

    public JuegoController(JuegoRepository repository) {
        this.repository = repository;
    }

    // Método para obtener todos los juegos con filtros opcionales
    @GetMapping("/juegos")
    public List<Juego> getJuegos(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) Double precio) {

        // Si el filtro de categoria es "Todas" o está vacío, lo dejamos como null
        if (categoria != null && categoria.equals("")) {
            categoria = null; // Esto asegura que no se filtre por categoría si está vacía
        }
        
        return repository.findByFilters(nombre, categoria, precio);
    }

    // Método para obtener juegos aleatorios
    @GetMapping("/juegos/aleatorios")
    public List<Juego> getJuegosAleatorios() {
        List<Juego> todos = repository.findAll();
        Collections.shuffle(todos);

        List<Juego> cinco = new ArrayList<>();
        int cantidad = Math.min(5, todos.size()); 

        for (int i = 0; i < cantidad; i++) {
            cinco.add(todos.get(i));
        }

        return cinco;
    }
    @GetMapping("/juegos/{id}")
    public ResponseEntity<Juego> getJuegoPorId(@PathVariable Long id) {
        Optional<Juego> juegoOptional = repository.findById(id);
        return juegoOptional
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
