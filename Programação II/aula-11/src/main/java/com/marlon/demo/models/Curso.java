package com.marlon.demo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Objects;

@Entity
@Table(name = Curso.TABLE_NAME)
public class Curso {
    public static final String TABLE_NAME = "curso";

    public interface CreateCurso {}
    public interface UpdateCurso {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "titulo", length = 150, nullable = false)
    @NotNull(groups = CreateCurso.class)
    @NotEmpty(groups = CreateCurso.class)
    @Size(groups = CreateCurso.class, min = 3, max = 150)
    private String titulo;

    @Column(name = "codigo", length = 20, nullable = false, unique = true)
    @NotNull(groups = CreateCurso.class)
    @NotEmpty(groups = CreateCurso.class)
    private String codigo;

    // Relacionamentos
    @ManyToOne
    @JoinColumn(name = "instrutor_id", nullable = false)
    @NotNull(groups = CreateCurso.class)
    private Instrutor instrutor;

    @ManyToOne
    @JoinColumn(name = "departamento_id", nullable = false)
    @NotNull(groups = CreateCurso.class)
    private Departamento departamento;

    @ManyToOne
    @JoinColumn(name = "nivel_id", nullable = false)
    @NotNull(groups = CreateCurso.class)
    private Nivel nivel;

    public Curso() {}

    public Curso(Long id, String titulo, String codigo, Instrutor instrutor, Departamento departamento, Nivel nivel) {
        this.id = id;
        this.titulo = titulo;
        this.codigo = codigo;
        this.instrutor = instrutor;
        this.departamento = departamento;
        this.nivel = nivel;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }
    public Instrutor getInstrutor() { return instrutor; }
    public void setInstrutor(Instrutor instrutor) { this.instrutor = instrutor; }
    public Departamento getDepartamento() { return departamento; }
    public void setDepartamento(Departamento departamento) { this.departamento = departamento; }
    public Nivel getNivel() { return nivel; }
    public void setNivel(Nivel nivel) { this.nivel = nivel; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Curso curso = (Curso) o;
        return Objects.equals(id, curso.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}