package com.marlon.demo.controllers;

import com.marlon.demo.models.Nivel;
import com.marlon.demo.repositories.NivelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/niveis")
public class NivelController {
    @Autowired
    private NivelRepository repository;

    @PostMapping
    public Nivel criar(@Validated(Nivel.CreateNivel.class) @RequestBody Nivel nivel) {
        return repository.save(nivel);
    }
}