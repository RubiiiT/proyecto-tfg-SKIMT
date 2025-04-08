package com.skimt.backend.controllers;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class FirebaseController {

    // usamos un mapa al estilo json
    //Este metodo recibe un token de usuario y lo verifica y devuelve el usuario
    @PostMapping("/verificarToken")
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
}
//Hacer metodo para registar