package com.skimt.backend.controllers;

import com.skimt.backend.Entities.Resena;
import com.skimt.backend.Entities.Usuario;
import com.skimt.backend.repositories.ResenaRepository;
import com.skimt.backend.repositories.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/resenas")
public class ResenaController {

    private final ResenaRepository resenaRepository;
    private final UsuarioRepository usuarioRepository;

    public ResenaController(ResenaRepository resenaRepository, UsuarioRepository usuarioRepository) {
        this.resenaRepository = resenaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    public List<Resena> getResenas() {
        return resenaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resena> getResenaById(@PathVariable Long id) {
        return resenaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Resena> createResena(@RequestBody Resena resena) {
        // Si la reseña incluye un usuario, verificamos que exista
        if (resena.getUsuario() != null) {
            Optional<Usuario> usuario = usuarioRepository.findById(resena.getUsuario().getUsuario_id());
            if (usuario.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            resena.setUsuario(usuario.get());
        }
        Resena savedResena = resenaRepository.save(resena);
        return ResponseEntity.ok(savedResena);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResena(@PathVariable Long id) {
        if (!resenaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        resenaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
