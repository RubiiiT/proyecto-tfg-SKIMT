// DetalleJuego.jsx
import React from 'react';
import FormularioResena from './FormularioResena';

const DetalleJuego = ({ juego, onVolver, usuariosConJuego, usuarioActivo }) => {
  return (
    <div className="vista-detalle-juego">
      <button onClick={onVolver} className="boton-volver">← Volver</button>

      <div className="detalle-juego-contenido">
        <div className="info-juego">
          <img
            src={juego.foto_larga}
            alt={juego.nombre}
            className="juego-portada-grande"
          />
          <div className='ConjuntoInfoYJugadores'>
            <div className="informacion-juego">
              <h2 className="titulo-juego-detalle">{juego.nombre}</h2>
              <p className="descripcion-juego">{juego.descripcion}</p>
            </div>
            <div className="usuarios-con-juego">
              <h3>Usuarios con este juego</h3>
              <ul>
                {usuariosConJuego.length === 0 ? (
                  <li>No hay otros usuarios con este juego.</li>
                ) : (
                  usuariosConJuego.map((user) => (
                    <li key={user.id}>{user.nombre}</li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <FormularioResena usuarioActivo={usuarioActivo} juego={juego} />
    </div>
  );
};

export default DetalleJuego;
