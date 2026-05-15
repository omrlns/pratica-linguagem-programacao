package com.marlon.hotelspring.services;

import com.marlon.hotelspring.models.Hospede;
import com.marlon.hotelspring.repositories.HospedeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class HospedeService {

    @Autowired
    private HospedeRepository hospedeRepository;

    public Hospede findById(Long id) {
        Optional<Hospede> obj = hospedeRepository.findById(id);
        return obj.orElseThrow(() -> new RuntimeException("Hóspede não encontrado! Id: " + id));
    }

    @Transactional
    public Hospede create(Hospede obj) {
        obj.setId(null);
        return hospedeRepository.save(obj);
    }

    @Transactional
    public void update(Hospede obj) {
        Hospede newObj = findById(obj.getId());
        updateData(newObj, obj); // Transfere os dados novos
        hospedeRepository.save(newObj);
    }

    private void updateData(Hospede newObj, Hospede obj) {
        newObj.setNome(obj.getNome());
        newObj.setEmail(obj.getEmail());
    }

    @Transactional
    public void delete(Long id) {
        findById(id);
        try {
            hospedeRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("não é possível excluir o hóspede, pois há reservas vinculadas a ele.");
        }
    }
}