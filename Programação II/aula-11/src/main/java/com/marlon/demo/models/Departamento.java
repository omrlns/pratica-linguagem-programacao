package com.marlon.demo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Objects;

@Entity
@Table(name = Departamento.TABLE_NAME)
public class Departamento {
    public static final String TABLE_NAME = "departamento";

    public interface CreateDepartamento {}
    public interface UpdateDepartamento {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "nome", length = 100, nullable = false)
    @NotNull(groups = CreateDepartamento.class)
    @NotEmpty(groups = CreateDepartamento.class)
    private String nome;

    @Column(name = "localizacao", length = 150, nullable = false)
    @NotNull(groups = CreateDepartamento.class)
    @NotEmpty(groups = CreateDepartamento.class)
    private String localizacao;

    public Departamento() {}

    public Departamento(Long id, String nome, String localizacao) {
        this.id = id;
        this.nome = nome;
        this.localizacao = localizacao;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getLocalizacao() { return localizacao; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Departamento that = (Departamento) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}