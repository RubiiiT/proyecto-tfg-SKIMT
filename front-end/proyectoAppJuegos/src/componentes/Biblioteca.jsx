import React, { useState, useEffect } from 'react';
import ServicioBiblioteca from '../servicios/axios/ServicioBiblioteca';
import '../estilos/Biblioteca.scss';

import ServicioResena from '../servicios/axios/ServicioResena';

const Biblioteca = ({ usuarioActivo }) => {

  console.log(usuarioActivo)

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
          console.log(response.data);
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
      try {
        const response = await ServicioBiblioteca.juegoPorNombre(filtro, usuarioActivo.usuario_id); 
        setJuegosFiltrados(response.data);
      } catch (error) {
        console.error("Error al obtener juegos", error);
        setJuegosFiltrados([]);
      }
    };
  
    if (usuarioActivo) {
      obtenerJuegos();
    }
  }, [filtro, usuarioActivo]);

  const handleJuegoClick = (juego) => {
    setJuegoSeleccionado(juego);
  };

  const handleVolver = () => {
    setJuegoSeleccionado(null);
  };

  const crearResena = ()=>{
    ServicioResena.crearResena(
      {
        usuarioId: usuarioActivo.usuario_id,
        juegoId: juegoSeleccionado.juego_id,
        descripcion: "Este juego es una obra maestra.",
        puntuacion: 5
      }
    )
    .then((response)=>{
      alert("Todo joya "+response)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div id="divBibliotecaPrincipal" className="biblioteca-container">
      {/* ASIDE */}
      <aside className="aside-biblioteca">
        <input
          type="text"
          placeholder="Filtrar por nombre..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="filtro-input"
        />
        <ul className="lista-juegos-aside">
          {juegosFiltrados.length === 0 ? (
            <li>No se encontraron juegos.</li>
          ) : (
            juegosFiltrados.map((juego, index) => (
              <li
                key={index}
                className="juego-item-aside"
                onClick={() => handleJuegoClick(juego)}
              >
                {juego.portada && (
                  <img
                    src={juego.portada}
                    alt={juego.nombre}
                    className="juego-img-aside"
                  />
                )}
                <span>{juego.nombre}</span>
              </li>
            ))
          )}
        </ul>
      </aside>

      {/* SECCIÓN PRINCIPAL */}
      <main className="seccion-principal">
        {!juegoSeleccionado ? (
          <>
            <h2 className="titulo-estanteria">Estantería</h2>
            <div className="grid-estanteria">
              {juegosFiltrados.map((juego, index) => (
                <div
                  key={index}
                  className="juego-grid-item"
                  onClick={() => handleJuegoClick(juego)}
                >
                  {juego.portada && (
                    <img
                      src={juego.portada}
                      alt={juego.nombre}
                      className="juego-img-grid"
                    />
                  )}
                  <p>{juego.nombre}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="vista-detalle-juego">
            <button onClick={handleVolver} className="boton-volver">← Volver</button>

            <div className="detalle-juego-contenido">
              <div className="info-juego">
                <img
                  src={juegoSeleccionado.foto_larga}
                  alt={juegoSeleccionado.nombre}
                  className="juego-portada-grande"
                />
                <div className="informacion-juego">
                  <h2 className="titulo-juego-detalle">{juegoSeleccionado.nombre}</h2>
                  <p className="descripcion-juego">{juegoSeleccionado.descripcion}</p>
                </div>
              </div>

              {/* Usuarios con este juego */}
              <div className="usuarios-con-juego">
                <h3>Usuarios con este juego</h3>
                <ul>
                  {usuariosConJuego.length === 0 ? (
                    <li>No hay otros usuarios con este juego.</li>
                  ) : (
                    usuariosConJuego.map((user) => (
                      <li key={user.id}>{user.nombre}</li> 
                    ))
                  )}
                </ul>
              </div>
            </div>
            <div id='resenas'>
                  <button onClick={()=>crearResena()}>Crear resena</button>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default Biblioteca;
