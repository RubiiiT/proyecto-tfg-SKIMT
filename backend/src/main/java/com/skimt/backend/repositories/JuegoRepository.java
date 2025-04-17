package com.skimt.backend.repositories;

import com.skimt.backend.Entities.Juego;


import java.util.List;
import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JuegoRepository extends JpaRepository<Juego, Long> {


    // Método de consulta personalizado para filtrar juegos por nombre, categoría y precio

    List<Juego> findByNombreLikeAndCategoriaAndPrecioLessThanEqual(String nombre, String categoria, Double precio);

    @Query("SELECT j FROM Juego j JOIN j.usuarios u WHERE u.id = :usuarioId")
    List<Juego> findByUsuarioId(@Param("usuarioId") Long usuarioId);

    @Query("SELECT j FROM Juego j JOIN j.usuarios u WHERE u.id = :usuarioId AND LOWER(j.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Juego> findByNombreContainingAndUsuarioId(@Param("nombre") String nombre, @Param("usuarioId") Long usuarioId);

    @Query("SELECT j FROM Juego j WHERE " +
            "(LOWER(j.nombre) LIKE LOWER(CONCAT(:nombre, '%')) OR :nombre IS NULL) AND " +
            "(j.categoria = :categoria OR :categoria IS NULL) AND " +
            "(j.precio <= :precio OR :precio IS NULL)")
    List<Juego> findByFilters(@Param("nombre") String nombre,
                              @Param("categoria") String categoria,
                              @Param("precio") Double precio);
}
