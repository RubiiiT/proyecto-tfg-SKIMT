import React from 'react';
import { mostrarAlerta } from '../../utilities/alertas';

const VideoYPrecio = ({ juego, juegosCarrito, setJuegosCarrito, usuarioActivo }) => {

  const anadirJuegoCarrito = () => {
    if (juegosCarrito.some(item => item.nombre === juego.nombre)) {
      mostrarAlerta("warning", "Juego no disponible", "Ya tienes este juego en el carrito");
    } else if (usuarioActivo.juegos.some(j => j.juego_id === juego.juego_id)) {
      mostrarAlerta("warning", "Juego no disponible", "Ya tienes este juego en la biblioteca");
    } else {
      setJuegosCarrito(prev => [...prev, juego]);
      mostrarAlerta("success", "Juego añadido", `El juego ${juego.nombre} ha sido añadido con éxito`);
    }
  };

  return (
    <div className='divVideoYPrecio'>
      <iframe
        width="560"
        height="315"
        src={juego.video}
        title={juego.nombre}
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className='divPrecio'>
        <h2>Comprar juego Ya</h2>
        <h4>
          Precio: {juego.precio} <img src="/logoDivisa.png" alt="iconoMoneda" />
        </h4>
        <button onClick={anadirJuegoCarrito}>Añadir al carrito</button>
      </div>
    </div>
  );
};

export default VideoYPrecio;
