package com.grand.service;

import com.grand.model.Receita;
import com.grand.model.Usuario;
import com.grand.repository.ReceitaRepository;
import com.grand.repository.UsuarioRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ReceitaService {
    private final ReceitaRepository repository;
    private final UsuarioRepository usuarioRepository;

    public ReceitaService(ReceitaRepository repository, UsuarioRepository usuarioRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Receita> listar() {
        return repository.findAll();
    }

    public Receita buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Receita nao encontrada"));
    }

    public Receita criar(Receita receita) {
        receita.setIdReceita(null);
        receita.setUsuario(buscarUsuario(receita.getUsuario()));
        return repository.save(receita);
    }

    public Receita atualizar(Integer id, Receita receita) {
        buscarPorId(id);
        receita.setIdReceita(id);
        receita.setUsuario(buscarUsuario(receita.getUsuario()));
        return repository.save(receita);
    }

    public void excluir(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Receita nao encontrada");
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
