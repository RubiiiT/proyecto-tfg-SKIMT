import React from 'react';
import CamposSesion from './CamposSesion';
import BotonesSesion from './BotonesSesion';

const FormularioSesion = ({
  handleSubmit,
  usuario,
  setUsuario,
  contrasena,
  setContrasena,
  gestionarModal,
}) => (
  <form onSubmit={handleSubmit} className="formularioSesion">
    <h2 id="tituloInicioSesion">SKIMT</h2>

    <CamposSesion
      usuario={usuario}
      setUsuario={setUsuario}
      contrasena={contrasena}
      setContrasena={setContrasena}
    />

    <BotonesSesion gestionarModal={gestionarModal} />
  </form>
);

export default FormularioSesion;
