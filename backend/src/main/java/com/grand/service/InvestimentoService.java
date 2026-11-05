package com.grand.service;

import com.grand.model.Investimento;
import com.grand.model.Usuario;
import com.grand.repository.InvestimentoRepository;
import com.grand.repository.UsuarioRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class InvestimentoService {
    private final InvestimentoRepository repository;
    private final UsuarioRepository usuarioRepository;

    public InvestimentoService(InvestimentoRepository repository, UsuarioRepository usuarioRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Investimento> listar() {
        return repository.findAll();
    }

    public Investimento buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Investimento nao encontrado"));
    }

    public Investimento criar(Investimento investimento) {
        investimento.setIdInvestimento(null);
        investimento.setUsuario(buscarUsuario(investimento.getUsuario()));
        return repository.save(investimento);
    }

    public Investimento atualizar(Integer id, Investimento investimento) {
        buscarPorId(id);
        investimento.setIdInvestimento(id);
        investimento.setUsuario(buscarUsuario(investimento.getUsuario()));
        return repository.save(investimento);
    }

    public void excluir(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Investimento nao encontrado");
        }
        repository.deleteById(id);
    }

    private Usuario buscarUsuario(Usuario usuario) {
        if (usuario == null || usuario.getIdUsuario() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe usuario.idUsuario");
        }
        if (!usuarioRepository.existsById(usuario.getIdUsuario())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario nao encontrado");
        }
        return usuarioRepository.getReferenceById(usuario.getIdUsuario());
    }
}
