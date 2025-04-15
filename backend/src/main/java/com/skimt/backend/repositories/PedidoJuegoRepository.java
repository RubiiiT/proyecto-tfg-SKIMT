package com.skimt.backend.repositories;

import com.skimt.backend.Entities.PedidoJuego;
import com.skimt.backend.Entities.PedidoJuegoId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoJuegoRepository extends JpaRepository<PedidoJuego, PedidoJuegoId> {


}
