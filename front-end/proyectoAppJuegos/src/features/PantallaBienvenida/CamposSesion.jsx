import React from 'react';

const CamposSesion = ({ usuario, setUsuario, contrasena, setContrasena }) => (
  <div className="campos">
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
);

export default CamposSesion;
