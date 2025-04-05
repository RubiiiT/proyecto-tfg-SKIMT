package com.skimt.backend.utilities;

import java.sql.*;

public class InicializadoraBaseDatos {

    public static void crearBaseDatos (String nombreBD) {
        String url = "jdbc:mysql://localhost:3306/";
        String usuario = "admin";
        String contrasena = "admin1234";


        try (Connection con = DriverManager.getConnection(url, usuario, contrasena))
             {
                 String stringCrearBD = "CREATE DATABASE IF NOT EXISTS "+nombreBD+";";
                 PreparedStatement pt = con.prepareStatement(stringCrearBD);


                 //Ejecutamos la consulta como "executeUpdate" ya que esto no es una consulta, sino una creacion de bbdd
                 int rs = pt.executeUpdate();

                 //si hay un warning , significa que la base de datos ya estaba creada ya que al ejecutar la sentencia de creacion, da un warning si ya esta creada
                 SQLWarning warning = pt.getWarnings();
                 if (warning != null) {

                     System.out.println("La base de datos '" + nombreBD + "' ya existe.");
                 } else {

                     System.out.println("Base de datos '" + nombreBD + "' creada exitosamente.");
                 }
                 System.out.println(rs);

        } catch (Exception e) {
            System.err.println("Algo ha salido mal en la creacion de la base de datos: "+e.getMessage());
        }
    }
}
