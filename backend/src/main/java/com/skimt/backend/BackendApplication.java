package com.skimt.backend;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.skimt.backend.utilities.InicializadoraBaseDatos;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		//InicializadoraBaseDatos.crearBaseDatos("bbdd_tfg");
		//InicializadoraBaseDatos.insertarDatosPrueba("bbdd_tfg");


		SpringApplication.run(BackendApplication.class, args);
		
	}



}

