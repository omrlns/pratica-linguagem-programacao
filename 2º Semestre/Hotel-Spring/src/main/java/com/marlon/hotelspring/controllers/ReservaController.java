package com.marlon.hotelspring.controllers;

import com.marlon.hotelspring.models.Reserva;
import com.marlon.hotelspring.services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/reservas")
@Validated
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping("/{id}")
    public ResponseEntity<Reserva> findById(@PathVariable Long id) {
        Reserva obj = reservaService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody Reserva obj) {
        Reserva newObj = reservaService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(newObj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@Valid @RequestBody Reserva obj, @PathVariable Long id) {
        obj.setId(id);
        reservaService.update(obj);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reservaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // endpoint customizado/combinado
    @GetMapping("/hospede/{hospedeId}")
    public ResponseEntity<List<Reserva>> findAllByHospedeId(@PathVariable Long hospedeId) {
        List<Reserva> objs = reservaService.findAllByHospede_Id(hospedeId);
        return ResponseEntity.ok().body(objs);
    }
}