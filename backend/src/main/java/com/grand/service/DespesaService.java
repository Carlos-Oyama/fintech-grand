package com.grand.service;

import com.grand.model.Despesa;
import com.grand.model.Usuario;
import com.grand.repository.DespesaRepository;
import com.grand.repository.UsuarioRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class DespesaService {
    private final DespesaRepository repository;
    private final UsuarioRepository usuarioRepository;

    public DespesaService(DespesaRepository repository, UsuarioRepository usuarioRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Despesa> listar() {
        return repository.findAll();
    }

    public Despesa buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Despesa nao encontrada"));
    }

    public Despesa criar(Despesa despesa) {
        despesa.setIdDespesa(null);
        despesa.setUsuario(buscarUsuario(despesa.getUsuario()));
        return repository.save(despesa);
    }

    public Despesa atualizar(Integer id, Despesa despesa) {
        buscarPorId(id);
        despesa.setIdDespesa(id);
        despesa.setUsuario(buscarUsuario(despesa.getUsuario()));
        return repository.save(despesa);
    }

    public void excluir(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Despesa nao encontrada");
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
