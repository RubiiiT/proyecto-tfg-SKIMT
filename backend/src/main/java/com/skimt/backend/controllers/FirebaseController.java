package com.skimt.backend.controllers;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FirebaseController {

    @PostMapping("/verificarToken")
    public String verificarToken(@RequestBody String token) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            String uid = decodedToken.getUid();
            return "Token válido, UID: " + uid;
        } catch (FirebaseAuthException e) {
            return "Token inválido: " + e.getMessage();
        }
    }
}
