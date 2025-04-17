package com.skimt.backend.repositories;

import com.skimt.backend.Entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Buscar por firebase UID
    Optional<Usuario> findByfirebaseUid(String firebase_uid);

    // Buscar usuarios que tienen un juego, excepto el usuario actual
    @Query("SELECT u FROM Usuario u JOIN u.juegos j WHERE j.id = :juegoId AND u.id <> :usuarioId")
    List<Usuario> findUsuariosByJuegoIdExceptUsuarioId(@Param("juegoId") Long juegoId, @Param("usuarioId") Long usuarioId);

}
