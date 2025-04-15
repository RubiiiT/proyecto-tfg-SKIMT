import React from 'react';
import '../estilos/Biblioteca.scss';

const Biblioteca = ({ usuarioActivo }) => {
    console.log(usuarioActivo)
  return (
    <div id='divBibliotecaPrincipal'>
      <h2>Mi Biblioteca</h2>
      <div id='juegosBiblioteca'>
        <ul>
          {usuarioActivo.juegos.map((juego, index) => (
            <li key={index} className='juegoItem'>
              {juego.portada && (
                <img src={juego.portada} alt={juego.nombre} className='juegoImagen' />
              )}
              <span className='juegoNombre'>{juego.nombre}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Biblioteca;
