package com.grand.repository;

import com.grand.model.Conta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContaRepository extends JpaRepository<Conta, Integer> {
    boolean existsByUsuario_IdUsuario(Integer idUsuario);
}
