import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ServicioTienda from '../../servicios/axios/ServicioTienda';
import ServicioResena from '../../servicios/axios/ServicioResena';

import "./TiendaJuegoEspecifico.scss";

import VistaJuego from './VistaJuego';
import VideoYPrecio from './VideoYPrecio';
import ResenasJuego from './ResenasJuego';

const TiendaJuegoEspecifico = ({ usuarioActivo, juegosCarrito, setJuegosCarrito }) => {
  const [juego, setJuego] = useState(null);
  const [resenas, setResenas] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    ServicioTienda.obtenerJuegoPorId(id)
      .then(response => setJuego(response.data))
      .catch(error => console.log("Error al obtener juego:", error));
  }, [id]);

  useEffect(() => {
    ServicioResena.cogerResenaPorIdJuego(id)
      .then(response => setResenas(response.data))
      .catch(error => console.log("Error al obtener reseñas:", error));
  }, [id]);

  if (!juego) return <p>Cargando juego...</p>;

  return (
    <div id='divJuegoEspecifico'>
      <VistaJuego juego={juego} />
      <VideoYPrecio
        juego={juego}
        juegosCarrito={juegosCarrito}
        setJuegosCarrito={setJuegosCarrito}
        usuarioActivo={usuarioActivo}
      />
      <ResenasJuego resenas={resenas} />
    </div>
  );
};

export default TiendaJuegoEspecifico;
