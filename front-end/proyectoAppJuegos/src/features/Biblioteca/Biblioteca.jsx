import React, { useState, useEffect } from 'react';
import ServicioBiblioteca from '../../servicios/axios/ServicioBiblioteca';

import AsideJuegos from './AsideJuegos';
import Estanteria from './Estanteria';
import DetalleJuego from './DetalleJuego';
import './Biblioteca.scss';

const Biblioteca = ({ usuarioActivo }) => {
  const [filtro, setFiltro] = useState('');
  const [juegosFiltrados, setJuegosFiltrados] = useState([]);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
  const [usuariosConJuego, setUsuariosConJuego] = useState([]);

  useEffect(() => {
    setFiltro('');
    setJuegoSeleccionado(null);
    setUsuariosConJuego([]);
  }, [usuarioActivo]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      if (juegoSeleccionado && usuarioActivo) {
        try {
          const response = await ServicioBiblioteca.obtenerUsuariosPorJuego(juegoSeleccionado.juego_id, usuarioActivo.usuario_id);
          setUsuariosConJuego(response.data);
        } catch (error) {
          console.error("Error al obtener usuarios con el juego", error);
        }
      }
    };
    obtenerUsuarios();
  }, [juegoSeleccionado, usuarioActivo]);

  useEffect(() => {
    const obtenerJuegos = async () => {
      if (usuarioActivo) {
        try {
          const response = await ServicioBiblioteca.juegoPorNombre(filtro, usuarioActivo.usuario_id);
          setJuegosFiltrados(response.data);
        } catch (error) {
          console.error("Error al obtener juegos", error);
          setJuegosFiltrados([]);
        }
      }
    };

    obtenerJuegos();
  }, [filtro, usuarioActivo]);

  const handleJuegoClick = (juego) => setJuegoSeleccionado(juego);
  const handleVolver = () => setJuegoSeleccionado(null);

  return (
    <div className="biblioteca-container">
      <AsideJuegos
        juegos={juegosFiltrados}
        filtro={filtro}
        setFiltro={setFiltro}
        onJuegoClick={handleJuegoClick}
      />

      <main className="seccion-principal">
        {!juegoSeleccionado ? (
          <Estanteria juegos={juegosFiltrados} onJuegoClick={handleJuegoClick} />
        ) : (
          <DetalleJuego
            juego={juegoSeleccionado}
            onVolver={handleVolver}
            usuariosConJuego={usuariosConJuego}
            usuarioActivo={usuarioActivo}
          />
        )}
      </main>
    </div>
  );
};

export default Biblioteca;
