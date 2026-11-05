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
@Table(name = "INVESTIMENTO")
public class Investimento {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "investimento_seq_gen")
    @SequenceGenerator(
            name = "investimento_seq_gen",
            sequenceName = "SEQ_INVESTIMENTO",
            initialValue = 1,
            allocationSize = 1)
    @Column(name = "ID_INVESTIMENTO")
    private Integer idInvestimento;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    @NotNull
    private Usuario usuario;

    @Column(name = "VALOR", precision = 15, scale = 2, nullable = false)
    @NotNull
    private BigDecimal valor;

    @Column(name = "DATA_INVESTIMENTO", nullable = false)
    @NotNull
    private LocalDate dataInvestimento;

    @Lob
    @Column(name = "DESCRICAO")
    private String descricao;

    @Column(name = "TIPO_INVESTIMENTO", length = 100)
    private String tipoInvestimento;

    public Investimento() {
    }

    public Integer getIdInvestimento() {
        return idInvestimento;
    }

    public void setIdInvestimento(Integer idInvestimento) {
        this.idInvestimento = idInvestimento;
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

    public LocalDate getDataInvestimento() {
        return dataInvestimento;
    }

    public void setDataInvestimento(LocalDate dataInvestimento) {
        this.dataInvestimento = dataInvestimento;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getTipoInvestimento() {
        return tipoInvestimento;
    }

    public void setTipoInvestimento(String tipoInvestimento) {
        this.tipoInvestimento = tipoInvestimento;
    }
}
