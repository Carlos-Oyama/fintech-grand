package com.grand.repository;

import com.grand.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceitaRepository extends JpaRepository<Receita, Integer> {
    boolean existsByUsuario_IdUsuario(Integer idUsuario);
}
