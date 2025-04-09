package com.skimt.backend.repositories;

import com.skimt.backend.Entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    //Hacer metodo para coger usuario por firebase_uid

}
