// AsideJuegos.jsx
import React from 'react';

const AsideJuegos = ({ juegos, filtro, setFiltro, onJuegoClick }) => {
  return (
    <aside className="aside-biblioteca">
      <input
        type="text"
        placeholder="Filtrar por nombre..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="filtro-input"
      />
      <ul className="lista-juegos-aside">
        {juegos.length === 0 ? (
          <li>No se encontraron juegos.</li>
        ) : (
          juegos.map((juego) => (
            <li
              key={juego.juego_id}
              className="juego-item-aside"
              onClick={() => onJuegoClick(juego)}
            >
              {juego.portada && <img src={juego.portada} alt={juego.nombre} />}
              <span>{juego.nombre}</span>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
};

export default AsideJuegos;
