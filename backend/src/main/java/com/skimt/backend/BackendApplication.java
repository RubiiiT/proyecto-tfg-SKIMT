package com.skimt.backend;

import com.skimt.backend.utilities.InicializadoraBaseDatos;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		//InicializadoraBaseDatos.crearBaseDatos("bbdd_tfg");
		InicializadoraBaseDatos.insertarDatosPrueba("bbdd_tfg");

		SpringApplication.run(BackendApplication.class, args);
		
	}

}

