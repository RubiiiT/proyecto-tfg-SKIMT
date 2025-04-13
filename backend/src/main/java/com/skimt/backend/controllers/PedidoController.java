package com.skimt.backend.controllers;


import com.skimt.backend.Entities.Pedido;
import com.skimt.backend.Entities.Resena;
import com.skimt.backend.repositories.PedidoRepository;
import com.skimt.backend.repositories.ResenaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PedidoController {

    private final PedidoRepository repository;

    public PedidoController(PedidoRepository repository){
        this.repository = repository;
    }

    @GetMapping("/pedidos")
    public List<Pedido> getPedidos(){
        return repository.findAll();
    }

}

