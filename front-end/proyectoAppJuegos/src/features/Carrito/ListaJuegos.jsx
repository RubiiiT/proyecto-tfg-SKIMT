import React from 'react';
import JuegoCarrito from './JuegoCarrito';

const ListaJuegos = ({ juegosCarrito, onEliminar }) => {
  if (juegosCarrito.length === 0) {
    return <p>No hay juegos en el carrito.</p>;
  }

  return (
    <ul id="listaJuegos">
      {juegosCarrito.map((juego, index) => (
        <React.Fragment key={index}>
          <JuegoCarrito juego={juego} index={index} onEliminar={onEliminar} />
          <div className='separador'></div>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default ListaJuegos;