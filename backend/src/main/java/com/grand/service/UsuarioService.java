package com.grand.service;

import com.grand.model.Usuario;
import com.grand.repository.ContaRepository;
import com.grand.repository.DespesaRepository;
import com.grand.repository.InvestimentoRepository;
import com.grand.repository.ReceitaRepository;
import com.grand.repository.UsuarioRepository;
import java.util.List;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;
    private final ContaRepository contaRepository;
    private final DespesaRepository despesaRepository;
    private final ReceitaRepository receitaRepository;
    private final InvestimentoRepository investimentoRepository;

    public UsuarioService(
            UsuarioRepository repository,
            ContaRepository contaRepository,
            DespesaRepository despesaRepository,
            ReceitaRepository receitaRepository,
            InvestimentoRepository investimentoRepository) {
        this.repository = repository;
        this.contaRepository = contaRepository;
        this.despesaRepository = despesaRepository;
        this.receitaRepository = receitaRepository;
        this.investimentoRepository = investimentoRepository;
    }

    public List<Usuario> listar() {
        return repository.findAll();
    }

    public Usuario buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario nao encontrado"));
    }

    public Usuario criar(Usuario usuario) {
        usuario.setIdUsuario(null);
        if (usuario.getDataCriacao() == null) {
            usuario.setDataCriacao(LocalDateTime.now());
        }
        return repository.save(usuario);
    }

    public Usuario atualizar(Integer id, Usuario usuario) {
        Usuario existente = buscarPorId(id);
        usuario.setIdUsuario(id);
        usuario.setDataCriacao(existente.getDataCriacao());
        return repository.save(usuario);
    }

    public void excluir(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario nao encontrado");
        }
        if (contaRepository.existsByUsuario_IdUsuario(id)
                || despesaRepository.existsByUsuario_IdUsuario(id)
                || receitaRepository.existsByUsuario_IdUsuario(id)
                || investimentoRepository.existsByUsuario_IdUsuario(id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Usuario possui registros vinculados");
        }
        repository.deleteById(id);
    }
}
