import { useState } from 'react';
import "../estilos/InicioSesion.css";

function InicioSesion() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para iniciar sesión
    console.log('Usuario:', usuario, 'Contraseña:', contraseña);
  };

  return (
    <div className="pantallaSesion">
      <form onSubmit={handleSubmit} className="formularioSesion">
        <h2>Iniciar sesión</h2>
        
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
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            placeholder="Escribe tu contraseña"
          />
        </div>

        <div className="botones">
          <button type="submit" className="btn" id='btnIniciarSesion'>Iniciar sesión</button>
          <button type="button" className="btn" id='btnRegistrar'>Registrarse</button>
        </div>
      </form>
    </div>
  );
}

export default InicioSesion;
