package com.marlon.hotelspring.services;

import com.marlon.hotelspring.models.Servico;
import com.marlon.hotelspring.repositories.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository servicoRepository;

    public Servico findById(Long id) {
        Optional<Servico> obj = servicoRepository.findById(id);
        return obj.orElseThrow(() -> new RuntimeException("Serviço não encontrado! Id: " + id));
    }

    @Transactional
    public Servico create(Servico obj) {
        obj.setId(null);
        return servicoRepository.save(obj);
    }

    @Transactional
    public void update(Servico obj) {
        Servico newObj = findById(obj.getId());
        updateData(newObj, obj);
        servicoRepository.save(newObj);
    }

    private void updateData(Servico newObj, Servico obj) {
        newObj.setNomeServico(obj.getNomeServico());
        newObj.setQuantidade(obj.getQuantidade());
    }

    @Transactional
    public void delete(Long id) {
        findById(id);
        try {
            servicoRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Não é possível excluir este serviço.");
        }
    }
}