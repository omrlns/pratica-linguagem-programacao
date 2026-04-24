package com.marlon.demo.controllers;

import com.marlon.demo.models.Curso;
import com.marlon.demo.repositories.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cursos")
public class CursoController {
    @Autowired
    private CursoRepository repository;

    @PostMapping
    public Curso criar(@Validated(Curso.CreateCurso.class) @RequestBody Curso curso) {
        return repository.save(curso);
    }
}