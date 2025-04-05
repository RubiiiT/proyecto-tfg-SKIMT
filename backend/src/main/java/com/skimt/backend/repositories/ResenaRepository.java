package com.skimt.backend.repositories;

import com.skimt.backend.Entities.Resena;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResenaRepository extends JpaRepository<Resena,Long> {


}
