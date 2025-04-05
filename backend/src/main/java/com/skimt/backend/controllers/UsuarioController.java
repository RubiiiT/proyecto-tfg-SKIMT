package com.skimt.backend.controllers;


import com.skimt.backend.Entities.Usuario;
import com.skimt.backend.repositories.UsuarioRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UsuarioController {

    private final UsuarioRepository repository;

    public UsuarioController(UsuarioRepository repository){
        this.repository = repository;
    }

    @GetMapping("/usuarios")
    public List<Usuario> getUsuarios(){
        return repository.findAll();
    }

}
