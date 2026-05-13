package com.marlon.hotelspring.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.Objects;

@Entity
@Table(name = Hospede.TABLE_NAME)
public class Hospede {

    public interface CreateHospede {}
    public interface UpdateHospede {}

    public static final String TABLE_NAME = "hospede";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "nome", length = 100, nullable = false)
    @NotNull(groups = CreateHospede.class)
    @NotEmpty(groups = CreateHospede.class)
    @Size(groups = CreateHospede.class, min = 2, max = 100)
    private String nome;

    @Column(name = "email", length = 100, nullable = false, unique = true)
    @NotNull(groups = CreateHospede.class)
    @NotEmpty(groups = CreateHospede.class)
    @Size(groups = CreateHospede.class, min = 5, max = 100)
    private String email;

    public Hospede() {
    }

    public Hospede(Long id, String nome, String email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Hospede hospede = (Hospede) o;
        return Objects.equals(id, hospede.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}