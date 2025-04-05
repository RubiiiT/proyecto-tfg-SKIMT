package com.skimt.backend.controllers;

import com.skimt.backend.Entities.Resena;
import com.skimt.backend.Entities.Usuario;
import com.skimt.backend.repositories.ResenaRepository;
import com.skimt.backend.repositories.UsuarioRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ResenaController {

    private final ResenaRepository repository;

    public ResenaController(ResenaRepository repository){
        this.repository = repository;
    }

    @GetMapping("/resenas")
    public List<Resena> getResenas(){
        return repository.findAll();
    }

}
