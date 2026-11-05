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
@Table(name = "RECEITA")
public class Receita {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "receita_seq_gen")
    @SequenceGenerator(
            name = "receita_seq_gen",
            sequenceName = "SEQ_RECEITA",
            initialValue = 1,
            allocationSize = 1)
    @Column(name = "ID_RECEITA")
    private Integer idReceita;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    @NotNull
    private Usuario usuario;

    @Column(name = "VALOR", precision = 15, scale = 2, nullable = false)
    @NotNull
    private BigDecimal valor;

    @Column(name = "MOEDA", length = 10)
    private String moeda;

    @Column(name = "DATA_RECEITA", nullable = false)
    @NotNull
    private LocalDate dataReceita;

    @Lob
    @Column(name = "DESCRICAO")
    private String descricao;

    @Column(name = "ORIGEM", length = 100)
    private String origem;

    public Receita() {
    }

    public Integer getIdReceita() {
        return idReceita;
    }

    public void setIdReceita(Integer idReceita) {
        this.idReceita = idReceita;
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

    public String getMoeda() {
        return moeda;
    }

    public void setMoeda(String moeda) {
        this.moeda = moeda;
    }

    public LocalDate getDataReceita() {
        return dataReceita;
    }

    public void setDataReceita(LocalDate dataReceita) {
        this.dataReceita = dataReceita;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getOrigem() {
        return origem;
    }

    public void setOrigem(String origem) {
        this.origem = origem;
    }
}
