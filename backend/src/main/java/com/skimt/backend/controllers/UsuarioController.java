package com.skimt.backend.controllers;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.skimt.backend.Entities.Usuario;
import com.skimt.backend.repositories.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    private final UsuarioRepository repository;

    public UsuarioController(UsuarioRepository repository) {
        this.repository = repository;
    }


    @GetMapping
    public List<Usuario> getUsuarios() {
        return repository.findAll();
    }


    // usamos un mapa al estilo json
    //Este metodo recibe un token de usuario y lo verifica y devuelve el usuario
    @PostMapping("/inicioSesion")
    public String verificarToken(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            String uid = decodedToken.getUid();
            //devolver usuario con info cogida de la base de datos.
            return "Token válido, UID: " + uid;
        } catch (FirebaseAuthException e) {
            return "Token inválido: " + e.getMessage();
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario nuevoUsuario) {
        return repository.save(nuevoUsuario);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario datosActualizados) {
        return repository.findById(id)
                .map(usuarioExistente -> {
                    usuarioExistente.setNombre(datosActualizados.getNombre());
                    usuarioExistente.setEmail(datosActualizados.getEmail());

                    Usuario actualizado = repository.save(usuarioExistente);
                    return ResponseEntity.ok(actualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
