package com.marlon.demo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Objects;

@Entity
@Table(name = Instrutor.TABLE_NAME)
public class Instrutor {
    public static final String TABLE_NAME = "instrutor";

    public interface CreateInstrutor {}
    public interface UpdateInstrutor {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "nome", length = 100, nullable = false)
    @NotNull(groups = CreateInstrutor.class)
    @NotEmpty(groups = CreateInstrutor.class)
    private String nome;

    @Column(name = "email", length = 100, nullable = false, unique = true)
    @NotNull(groups = CreateInstrutor.class)
    @NotEmpty(groups = CreateInstrutor.class)
    private String email;

    @Column(name = "especialidade", length = 100, nullable = false)
    @NotNull(groups = CreateInstrutor.class)
    @NotEmpty(groups = CreateInstrutor.class)
    private String especialidade;

    public Instrutor() {}

    public Instrutor(Long id, String nome, String email, String especialidade) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.especialidade = especialidade;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getEspecialidade() { return especialidade; }
    public void setEspecialidade(String especialidade) { this.especialidade = especialidade; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Instrutor instrutor = (Instrutor) o;
        return Objects.equals(id, instrutor.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}