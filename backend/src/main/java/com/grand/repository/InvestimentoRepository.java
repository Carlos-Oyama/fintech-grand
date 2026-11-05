package com.grand.repository;

import com.grand.model.Investimento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestimentoRepository extends JpaRepository<Investimento, Integer> {
    boolean existsByUsuario_IdUsuario(Integer idUsuario);
}
