package com.skimt.backend.controllers;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.skimt.backend.Entities.Juego;
import com.skimt.backend.Entities.Usuario;
import com.skimt.backend.repositories.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/usuarios")
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
    public Usuario verificarToken(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            String uid = decodedToken.getUid();
            //devolver usuario con info cogida de la base de datos.
            Usuario usuarioInicioSesion = repository.findByfirebaseUid(uid).get();
            System.out.println(usuarioInicioSesion);
            return usuarioInicioSesion;
        } catch (FirebaseAuthException e) {
            System.out.println(e.getMessage());
            return null;
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

    @PutMapping("/{id}/juegos")
    public ResponseEntity<Usuario> anadirJuegosUsuario(@PathVariable Long id, @RequestBody Set<Juego> juegosNuevos) {
        return repository.findById(id)
                .map(usuarioExistente -> {
                    //Aqui vamos a añadir los juegos al usuario
                    Set<Juego> juegosUsuario = usuarioExistente.getJuegos();
                    juegosUsuario.addAll(juegosNuevos);
                    //Reemplazamos la lista anterior con la nueva lista con los juegos
                    usuarioExistente.setJuegos(juegosUsuario);

                    Usuario actualizado = repository.save(usuarioExistente);
                    return ResponseEntity.ok(actualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/crear-admin")
    public void crearUsuarioAdmin() {
        try {
            // Verifica si el usuario admin ya existe en Firebase
            String email = "admin@gmail.com";
            String password = "admin1234";

            try {
                FirebaseAuth.getInstance().getUserByEmail(email);
                return;
            } catch (Exception e) {
                // El usuario no existe, proceder a la creación
            }

            // Crear el usuario admin en Firebase
            UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                    .setEmail(email)
                    .setPassword(password)
                    .setDisplayName("Admin User");

            UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
            String firebaseUid = userRecord.getUid();
            System.out.println("Usuario Admin creado con éxito en Firebase: " + firebaseUid);

            // Crear el objeto Usuario para la base de datos
            Usuario nuevoUsuario = new Usuario();
            nuevoUsuario.setFirebase_uid(firebaseUid);
            nuevoUsuario.setNombre("Admin");
            nuevoUsuario.setDinero(0);
            nuevoUsuario.setEmail(email);

            // Guardar el usuario en la base de datos
            repository.save(nuevoUsuario);

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
        }
    }

}
