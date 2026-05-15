package com.marlon.hotelspring.services;

import com.marlon.hotelspring.models.Reserva;
import com.marlon.hotelspring.repositories.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public Reserva findById(Long id) {
        Optional<Reserva> obj = reservaRepository.findById(id);
        return obj.orElseThrow(() -> new RuntimeException("Reserva não encontrada! Id: " + id));
    }

    @Transactional
    public Reserva create(Reserva obj) {
        obj.setId(null);
        return reservaRepository.save(obj);
    }

    @Transactional
    public void update(Reserva obj) {
        Reserva newObj = findById(obj.getId());
        updateData(newObj, obj);
        reservaRepository.save(newObj);
    }

    private void updateData(Reserva newObj, Reserva obj) {
        newObj.setDataReserva(obj.getDataReserva());
        // Dependendo da regra de negócio, você pode ou não permitir alterar o hóspede da reserva
    }

    @Transactional
    public void delete(Long id) {
        findById(id);
        try {
            reservaRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Não é possível excluir esta reserva.");
        }
    }

    public List<Reserva> findAllByHospede_Id(Long hospedeId) {
        return reservaRepository.findAllByHospede_Id(hospedeId);
    }
}