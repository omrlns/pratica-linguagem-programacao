package com.marlon.demo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Objects;

@Entity
@Table(name = Nivel.TABLE_NAME)
public class Nivel {
    public static final String TABLE_NAME = "nivel";

    public interface CreateNivel {}
    public interface UpdateNivel {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "nome", length = 50, nullable = false)
    @NotNull(groups = CreateNivel.class)
    @NotEmpty(groups = CreateNivel.class)
    private String nome;

    @Column(name = "descricao", length = 255, nullable = false)
    @NotNull(groups = CreateNivel.class)
    @NotEmpty(groups = CreateNivel.class)
    private String descricao;

    public Nivel() {}

    public Nivel(Long id, String nome, String descricao) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Nivel nivel = (Nivel) o;
        return Objects.equals(id, nivel.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}