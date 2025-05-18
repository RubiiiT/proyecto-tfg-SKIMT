import React from 'react';

const BotonesSesion = ({ gestionarModal }) => (
  <div className="botones">
    <button
      type="button"
      className="btn"
      id="btnRegistrar"
      onClick={() => gestionarModal('registrar', true)}
    >
      Registrarse
    </button>
    <button type="submit" className="btn" id="btnIniciarSesion">
      Iniciar sesión
    </button>
  </div>
);

export default BotonesSesion;
