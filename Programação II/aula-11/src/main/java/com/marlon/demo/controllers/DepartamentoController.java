package com.marlon.demo.controllers;

import com.marlon.demo.models.Departamento;
import com.marlon.demo.repositories.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/departamentos")
public class DepartamentoController {
    @Autowired
    private DepartamentoRepository repository;

    @PostMapping
    public Departamento criar(@Validated(Departamento.CreateDepartamento.class) @RequestBody Departamento departamento) {
        return repository.save(departamento);
    }
}
