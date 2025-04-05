package com.skimt.backend.controllers;

import com.skimt.backend.Entities.Juego;

import com.skimt.backend.repositories.JuegoRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class JuegoController {

    private final JuegoRepository repository;

    public JuegoController(JuegoRepository repository){
        this.repository = repository;
    }

    @GetMapping("/juegos")
    public List<Juego> getJuegos(){
        return repository.findAll();
    }

}
