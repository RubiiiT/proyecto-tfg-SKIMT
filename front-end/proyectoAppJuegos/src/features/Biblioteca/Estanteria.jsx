// Estanteria.jsx
import React from 'react';

const Estanteria = ({ juegos, onJuegoClick }) => {
  return (
    <>
      <h2 className="titulo-estanteria">Estantería</h2>
      <div className="grid-estanteria">
        {juegos.map((juego) => (
          <div
            key={juego.juego_id}
            className="juego-grid-item"
            onClick={() => onJuegoClick(juego)}
          >
            {juego.portada && (
              <img src={juego.portada} alt={juego.nombre} />
            )}
            <p>{juego.nombre}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Estanteria;
