package com.marlon.aula_12;

import com.marlon.aula_12.models.Hospede;
import com.marlon.aula_12.models.Reserva;
import com.marlon.aula_12.models.Servico;
import com.marlon.aula_12.repositories.HospedeRepository;
import com.marlon.aula_12.repositories.ReservaRepository;
import com.marlon.aula_12.repositories.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;

@SpringBootApplication
public class Application implements CommandLineRunner {

	@Autowired
	private HospedeRepository hospedeRepository;
	@Autowired
	private ReservaRepository reservaRepository;
	@Autowired
	private ServicoRepository servicoRepository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// criando um Hóspede
		Hospede h1 = new Hospede(null, "Marlon", "marlon@teste.com");
		h1 = hospedeRepository.save(h1);

		// criando uma Reserva
		Reserva r1 = new Reserva(null, LocalDate.now(), h1);
		r1 = reservaRepository.save(r1);

		// criando um Serviço
		Servico s1 = new Servico(null, "Frigobar", 2, r1);
		servicoRepository.save(s1);

		System.out.println("Dados salvos com sucesso no PostgreSQL!");
	}
}
