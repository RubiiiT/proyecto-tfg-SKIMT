import { useState } from 'react';
import "../estilos/InicioSesion.scss";
// Para el firebase
import { signInWithEmailAndPassword,auth } from "../config/firebaseConfig";
import ServicioFirebase from '../servicios/axios/ServicioFirebase';
//Para el modal del registro
import Modal from './Modal';

import Registro from './Registro';

function InicioSesion() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  //Modal para el registro
  const [modal, setModal] = useState({
    registrar: false

  });

  const gestionarModal = (tipo, estado) => {
    setModal((prev) => ({ ...prev, [tipo]: estado }));
   
  };

  const funcionAlerta = (icono,titulo,texto)=>{
    Swal.fire({ icon: icono, title: titulo, text: texto,
        
      color:"#EF076D",
      customClass: {
       confirmButton: 'botonConfirmarAlerta'
     }
     });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (usuario.length === 0 && contrasena.length === 0) {
      funcionAlerta("error", "Error Inicio de Sesión", "Por favor, rellene los dos campos");
    } else if (usuario.length === 0) {
      funcionAlerta("error", "Error Inicio de Sesión", "Por favor, rellene el campo de usuario");
    } else if (contrasena.length === 0) {
      funcionAlerta("error", "Error Inicio de Sesión", "Por favor, rellene el campo de contraseña");
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

      ServicioFirebase.verificarToken(token)
     
      .then(response=>{
        // 
        console.log("Respuesta del backend:", response.data);
        funcionAlerta("success", "Inicio de sesión exitoso", `Bienvenido, ${usuario}`);
      })
      .catch(error=>{
        console.error("Error de autenticación: ", error.message);
        funcionAlerta("error", "Error de autenticación", error.message);
      
      })

     
    } catch (error) {
      funcionAlerta("error", "Error de autenticación", error.message);
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
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Escribe tu usuario"
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
