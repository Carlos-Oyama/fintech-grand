package com.grand.service;

import com.grand.model.Conta;
import com.grand.model.Usuario;
import com.grand.repository.ContaRepository;
import com.grand.repository.UsuarioRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ContaService {
    private final ContaRepository repository;
    private final UsuarioRepository usuarioRepository;

    public ContaService(ContaRepository repository, UsuarioRepository usuarioRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Conta> listar() {
        return repository.findAll();
    }

    public Conta buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Conta nao encontrada"));
    }

    public Conta criar(Conta conta) {
        conta.setIdConta(null);
        conta.setUsuario(buscarUsuario(conta.getUsuario()));
        return repository.save(conta);
    }

    public Conta atualizar(Integer id, Conta conta) {
        buscarPorId(id);
        conta.setIdConta(id);
        conta.setUsuario(buscarUsuario(conta.getUsuario()));
        return repository.save(conta);
    }

    public void excluir(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Conta nao encontrada");
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
