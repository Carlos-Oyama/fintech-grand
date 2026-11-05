package com.grand.repository;

import com.grand.model.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DespesaRepository extends JpaRepository<Despesa, Integer> {
    boolean existsByUsuario_IdUsuario(Integer idUsuario);
}
