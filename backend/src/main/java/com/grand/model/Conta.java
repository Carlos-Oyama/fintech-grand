package com.grand.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Table(name = "CONTA")
public class Conta {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "conta_seq_gen")
    @SequenceGenerator(
            name = "conta_seq_gen",
            sequenceName = "SEQ_CONTA",
            initialValue = 1,
            allocationSize = 1)
    @Column(name = "ID_CONTA")
    private Integer idConta;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    @NotNull
    private Usuario usuario;

    @Column(name = "TIPO_CONTA", length = 50, nullable = false)
    @NotBlank
    private String tipoConta;

    @Column(name = "SALDO", precision = 15, scale = 2)
    private BigDecimal saldo;

    @Column(name = "MOEDA", length = 10)
    private String moeda;

    @Column(name = "STATUS", length = 20)
    private String status;

    public Conta() {
    }

    public Integer getIdConta() {
        return idConta;
    }

    public void setIdConta(Integer idConta) {
        this.idConta = idConta;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getTipoConta() {
        return tipoConta;
    }

    public void setTipoConta(String tipoConta) {
        this.tipoConta = tipoConta;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    public String getMoeda() {
        return moeda;
    }

    public void setMoeda(String moeda) {
        this.moeda = moeda;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
