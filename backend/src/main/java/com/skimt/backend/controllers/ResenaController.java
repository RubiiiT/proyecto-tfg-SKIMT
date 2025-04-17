package com.skimt.backend.controllers;

import com.skimt.backend.Entities.Juego;
import com.skimt.backend.Entities.Resena;
import com.skimt.backend.Entities.ResenaDTO;
import com.skimt.backend.Entities.Usuario;
import com.skimt.backend.repositories.JuegoRepository;
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
    private final JuegoRepository juegoRepository;

    public ResenaController(ResenaRepository resenaRepository, UsuarioRepository usuarioRepository,JuegoRepository juegoRepository) {
        this.resenaRepository = resenaRepository;
        this.usuarioRepository = usuarioRepository;
        this.juegoRepository = juegoRepository;
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
    public ResponseEntity<?> crearResena(@RequestBody ResenaDTO resenaDTO) {

        Optional<Usuario> usuarioOpt = usuarioRepository.findById(resenaDTO.getUsuarioId());
        Optional<Juego> juegoOpt = juegoRepository.findById(resenaDTO.getJuegoId());

        if (usuarioOpt.isEmpty() || juegoOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Usuario o juego no encontrados");
        }

        Resena nuevaResena = new Resena(
                usuarioOpt.get(),
                juegoOpt.get(),
                resenaDTO.getDescripcion(),
                resenaDTO.getPuntuacion()
        );

        Resena guardada = resenaRepository.save(nuevaResena);
        return ResponseEntity.ok(guardada);
    }

    // Hacer metodo para recuperar reseña dependiendo del id del juego
    @GetMapping("/juego/{id}")
    public ResponseEntity<Resena> getResenaByJuegoId(@PathVariable Long id) {
        
        return null;
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
