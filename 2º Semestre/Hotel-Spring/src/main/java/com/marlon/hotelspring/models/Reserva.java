package com.marlon.hotelspring.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = Reserva.TABLE_NAME)
public class Reserva {

    public interface CreateReserva {}
    public interface UpdateReserva {}

    public static final String TABLE_NAME = "reserva";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "data_reserva", nullable = false)
    @NotNull(groups = CreateReserva.class)
    private LocalDate dataReserva;

    @ManyToOne
    @JoinColumn(name = "hospede_id", nullable = false)
    private Hospede hospede;

    public Reserva() {
    }

    public Reserva(Long id, LocalDate dataReserva, Hospede hospede) {
        this.id = id;
        this.dataReserva = dataReserva;
        this.hospede = hospede;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getDataReserva() { return dataReserva; }
    public void setDataReserva(LocalDate dataReserva) { this.dataReserva = dataReserva; }
    public Hospede getHospede() { return hospede; }
    public void setHospede(Hospede hospede) { this.hospede = hospede; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Reserva reserva = (Reserva) o;
        return Objects.equals(id, reserva.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}