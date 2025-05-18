import React from 'react';

const VistaJuego = ({ juego }) => (
  <>
    <div className='divFotoLarga'>
      <img src={juego.foto_larga} alt="Foto_largo" />
    </div>
    <div className='divInfoJuego'>
      <h2>{juego.nombre}</h2>
      <p>{juego.descripcion}</p>
    </div>
  </>
);

export default VistaJuego;
