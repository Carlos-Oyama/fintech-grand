package com.grand.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "DESPESA")
public class Despesa {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "despesa_seq_gen")
    @SequenceGenerator(
            name = "despesa_seq_gen",
            sequenceName = "SEQ_DESPESA",
            initialValue = 1,
            allocationSize = 1)
    @Column(name = "ID_DESPESA")
    private Integer idDespesa;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    @NotNull
    private Usuario usuario;

    @Column(name = "VALOR", precision = 15, scale = 2, nullable = false)
    @NotNull
    private BigDecimal valor;

    @Column(name = "DATA_DESPESA", nullable = false)
    @NotNull
    private LocalDate dataDespesa;

    @Lob
    @Column(name = "DESCRICAO")
    private String descricao;

    @Column(name = "CATEGORIA", length = 100)
    private String categoria;

    public Despesa() {
    }

    public Integer getIdDespesa() {
        return idDespesa;
    }

    public void setIdDespesa(Integer idDespesa) {
        this.idDespesa = idDespesa;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public LocalDate getDataDespesa() {
        return dataDespesa;
    }

    public void setDataDespesa(LocalDate dataDespesa) {
        this.dataDespesa = dataDespesa;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}
