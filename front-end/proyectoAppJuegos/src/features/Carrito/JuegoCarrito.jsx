import React from 'react';

const JuegoCarrito = ({ juego, onEliminar, index }) => {
  return (
    <li className="juego-item">
      <img src={juego.foto_larga} alt={juego.nombre} className="juego-imagen" />
      <div className="juego-detalles">
        <h3>{juego.nombre}</h3>
        <p>{juego.precio} <img src="logoDivisa.png" alt="iconoMoneda" /></p>
        <button 
          className="btnEliminar" 
          onClick={() => onEliminar(index)}
        >
          🗑️
        </button>
      </div>
    </li>
  );
};

export default JuegoCarrito;