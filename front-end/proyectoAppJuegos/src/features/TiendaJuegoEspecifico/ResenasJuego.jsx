import React from 'react';

const ResenasJuego = ({ resenas }) => (
  <div id='divResenas'>
    <h1>Reseñas</h1>
    <div className="resenasGrid">
      {resenas && resenas.length > 0 ? (
        resenas.map((resena, index) => (
          <div className="resenaCard" key={index}>
            <h4>Usuario: {resena.usuario.nombre}</h4>
            <p>⭐ {resena.puntuacion} / 10</p>
            <p>{resena.descripcion}</p>
          </div>
        ))
      ) : (
        <p>No hay reseñas aún.</p>
      )}
    </div>
  </div>
);

export default ResenasJuego;
