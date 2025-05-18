import { useState } from 'react';
import "./InicioSesion.scss";
import { auth } from "../../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import ServicioUsuario from '../../servicios/axios/ServicioUsuario';

import Modal from '../componentesUtiles/Modal';
import Registro from './Registro';
import FormularioSesion from './FormularioSesion';
import { mostrarAlerta } from '../../utilities/alertas';

function InicioSesion({ setUsuarioActivo }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [modal, setModal] = useState({ registrar: false });

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
      inicioSesionFirebase();
    }
  };

  const inicioSesionFirebase = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, usuario, contrasena);
      const user = userCredential.user;
      const token = await user.getIdToken();

      ServicioUsuario.inicioSesionBackEnd(token)
        .then(response => {
          mostrarAlerta("success", "Inicio de sesión exitoso", `Bienvenido, ${usuario}`);
          setUsuarioActivo(response.data);
        })
        .catch(error => {
          console.error("Error de autenticación: ", error.message);
          mostrarAlerta("error", "Error de autenticación", error.message);
        });

    } catch (error) {
      mostrarAlerta("error", "Error de autenticación", error.message);
      console.error("Error de autenticación: ", error.message);
    }
  };

  return (
    <>
      <div className="pantallaSesion">
        <FormularioSesion
          handleSubmit={handleSubmit}
          usuario={usuario}
          setUsuario={setUsuario}
          contrasena={contrasena}
          setContrasena={setContrasena}
          gestionarModal={gestionarModal}
        />
      </div>

      <Modal isOpen={modal.registrar} onClose={() => gestionarModal("registrar", false)}>
        <Registro onClose={() => gestionarModal("registrar", false)} />
      </Modal>
    </>
  );
}

export default InicioSesion;
