import { useState } from 'react';
import "../estilos/InicioSesion.scss";
// Para el firebase
import { auth } from "../config/firebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import ServicioUsuario from '../servicios/axios/ServicioUsuario';
//Para el modal del registro
import Modal from './Modal';

import Registro from './Registro';


import { mostrarAlerta } from '../utilities/alertas';

function InicioSesion({setUsuarioActivo}) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  //Modal para el registro
  const [modal, setModal] = useState({
    registrar: false

  });

  const gestionarModal = (tipo, estado) => {
    setModal((prev) => ({ ...prev, [tipo]: estado }));
   
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (usuario.length === 0 && contrasena.length === 0) {
      
      mostrarAlerta("error", "Error Inicio de Sesión", "Por favor, rellene los dos campos");
    } else if (usuario.length === 0) {
      mostrarAlerta("error", "Error Inicio de Sesión", "Por favor, rellene el campo de usuario");
    } else if (contrasena.length === 0) {
      mostrarAlerta("error", "Error Inicio de Sesión", "Por favor, rellene el campo de contraseña");
    } else {
      
      inicioSesionFirebase()
    }
  };
  

  const inicioSesionFirebase = async()=>{
    try {
      const userCredential = await signInWithEmailAndPassword(auth, usuario, contrasena); 
      const user = userCredential.user;
      console.log('Usuario autenticado', user);
      
      // Puedes obtener el token si lo necesitas
      const token = await user.getIdToken();
      console.log("Token JWT:", token);

      console.log("CONEXION BACK")

      ServicioUsuario.inicioSesionBackEnd(token)
      .then(response=>{
        // 
        console.log("Respuesta del backend:", response.data);
        mostrarAlerta("success", "Inicio de sesión exitoso", `Bienvenido, ${usuario}`);
        //Tengo que hacer que desde el back devuelva el usuario entero
        setUsuarioActivo(response.data)
      })
      .catch(error=>{
        console.error("Error de autenticación: ", error.message);
        mostrarAlerta("error", "Error de autenticación", error.message);
      
      })

     
    } catch (error) {
      mostrarAlerta("error", "Error de autenticación", error.message);
      console.error("Error de autenticación: ", error.message);
    }
  }

  return (
    <>
    <div className="pantallaSesion">
      <form onSubmit={handleSubmit} className="formularioSesion">
        <h2 id='tituloInicioSesion'>SKIMT</h2>
        
        <div className='campos'>
        <div className="campo">
          <label htmlFor="usuario">Correo</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Escribe tu correo"
          />
        </div>

        <div className="campo">
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Escribe tu contraseña"
          />
        </div>
        </div>

        <div className="botones">
         
          <button type="button" className="btn" id='btnRegistrar' onClick={()=>gestionarModal("registrar",true)}>Registrarse</button>
          <button type="submit" className="btn" id='btnIniciarSesion'>Iniciar sesión</button>
        </div>
      </form>
    </div>
    
    <Modal isOpen={modal.registrar} onClose={() => gestionarModal("registrar", false)}>
    {<Registro onClose={()=>gestionarModal("registrar",false)}></Registro>}
  </Modal>
     </>
  );
}

export default InicioSesion;
