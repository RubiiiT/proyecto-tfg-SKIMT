package com.skimt.backend.controllers;

import com.skimt.backend.Entities.*;
import com.skimt.backend.repositories.JuegoRepository;
import com.skimt.backend.repositories.PedidoJuegoRepository;
import com.skimt.backend.repositories.PedidoRepository;
import com.skimt.backend.repositories.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoRepository pedidoRepository;
    private final PedidoJuegoRepository pedidoJuegoRepository;
    private final UsuarioRepository usuarioRepository;
    private final JuegoRepository juegoRepository;


    public PedidoController(PedidoRepository pedidoRepository,PedidoJuegoRepository pedidoJuegorepository,UsuarioRepository usuarioRepository,JuegoRepository juegoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.pedidoJuegoRepository=pedidoJuegorepository;
        this.usuarioRepository=usuarioRepository;
        this.juegoRepository=juegoRepository;

    }

    @GetMapping
    public List<Pedido> getPedidos() {
        return pedidoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> getPedidoById(@PathVariable Long id) {
        return pedidoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pedido> createPedidoConRelacionesJuegos(@RequestBody PedidoDTO pedido) {

        Optional<Usuario> usuarioOpt = usuarioRepository.findById(pedido.getUsuarioId());
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Pedido pedidoNuevo = new Pedido();
        pedidoNuevo.setUsuario(usuarioOpt.get());
        pedidoNuevo.setFechaPedido(pedido.getFechaPedido());
        pedidoNuevo.setCantidadJuegos(pedido.getJuegos().size());
        pedidoNuevo.setPrecioTotal(pedido.getPrecioTotal());

        //Guardamos el pedido para poder tener el id y relacionarlo en la otra tabla intermedia
        pedidoRepository.save(pedidoNuevo);

        //Guardamos los juegos para que el usuario los tenga
        Usuario usuario = usuarioOpt.get();
        Set<Juego> juegosBibliotecaUsuario=usuario.getJuegos();
        for (PedidoDTO.JuegoPedidoDTO juegoDTO : pedido.getJuegos()) {
            Optional<Juego> juegoOpt = juegoRepository.findById(juegoDTO.getJuegoId());
            if (juegoOpt.isPresent()) {
                //Aqui guardamos las relaciones para crear filas en la tabla pedidoJuegos
                PedidoJuego pj = new PedidoJuego();
                pj.setPedido(pedidoNuevo);
                pj.setJuego(juegoOpt.get());
                pj.setPrecioUnitario(juegoDTO.getPrecioUnitario());

                pedidoJuegoRepository.save(pj);
                //Tambien lo gaurdamos en la biblioteca del usuario
                juegosBibliotecaUsuario.add(juegoOpt.get());
            }
        }
        //Ahora guardamos los juegos en el ususario para que los tenga en la biblioteca
        usuario.setJuegos(juegosBibliotecaUsuario);
        //Tambien cambiamos el dinero del usuario en la bbdd
        usuario.setDinero(usuario.getDinero()-pedido.getPrecioTotal());
        usuarioRepository.save(usuario);

        return ResponseEntity.ok(pedidoNuevo);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedido(@PathVariable Long id) {
        if (!pedidoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        pedidoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
