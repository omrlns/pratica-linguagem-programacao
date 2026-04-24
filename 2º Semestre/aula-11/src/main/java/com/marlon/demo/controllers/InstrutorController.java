package com.marlon.demo.controllers;

import com.marlon.demo.models.Instrutor;
import com.marlon.demo.repositories.InstrutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/instrutores")
public class InstrutorController {

    @Autowired
    private InstrutorRepository repository;

    @PostMapping
    public Instrutor criar(@Validated(Instrutor.CreateInstrutor.class) @RequestBody Instrutor instrutor) {
        return repository.save(instrutor);
    }
}