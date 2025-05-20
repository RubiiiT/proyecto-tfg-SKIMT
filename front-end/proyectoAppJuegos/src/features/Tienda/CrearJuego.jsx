import React, { useState, useEffect } from 'react';
import ServicioTienda from '../../servicios/axios/ServicioTienda';
import { mostrarAlerta } from '../../utilities/alertas';

import "./CrearJuego.scss";

const CrearJuego = ({ onClose, setJuegos, juego: juegoProp }) => {
  const [juego, setJuego] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    portada: '',
    foto_larga: '',
    video: '',
    categoria: ''
  });

  // Si viene un juego por props, lo usamos como estado inicial
  useEffect(() => {
    if (juegoProp) {
      setJuego(juegoProp);
    }
  }, [juegoProp]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setJuego((prev) => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(juego).some((campo) => String(campo).trim() === '')) {

      mostrarAlerta("warning", "Campos vacíos", "Todos los campos son obligatorios");
      return;
    }

    try {
      if (juegoProp) {
        // Modo modificar
        const response = await ServicioTienda.editarJuego(juego.juego_id, juego); 
        mostrarAlerta("success", "Juego modificado", `El juego ${juego.nombre} fue actualizado correctamente`);
        setJuegos(prev => prev.map(j => j._id === juego._id ? response.data : j));
      } else {
        // Modo crear
        const response = await ServicioTienda.crearJuego(juego);
        mostrarAlerta("success", "Juego creado", `El juego ${juego.nombre} fue creado correctamente`);
        setJuegos(prev => [...prev, response.data]);
      }
      onClose();
    } catch (error) {
      console.error("Error al guardar juego:", error);
      mostrarAlerta("error", "Error", `No se pudo ${juegoProp ? 'modificar' : 'crear'} el juego`);
    }
  };

  return (
    <div className="crear-juego-modal">
      <h2>{juegoProp ? 'Editar Juego' : 'Crear Nuevo Juego'}</h2>
      <form onSubmit={manejarSubmit} className="form-crear-juego">
        <div className="campos-contenedor">
          {/* Campos */}
          <div className="campo">
            <label>Nombre:</label>
            <input type="text" name="nombre" value={juego.nombre} onChange={manejarCambio} />
          </div>
          <div className="campo">
            <label>Precio:</label>
            <input type="number" name="precio" value={juego.precio} onChange={manejarCambio} />
          </div>
          <div className="campo">
            <label>Portada (URL):</label>
            <input type="text" name="portada" value={juego.portada} onChange={manejarCambio} />
          </div>
          <div className="campo">
            <label>Foto larga (URL):</label>
            <input type="text" name="foto_larga" value={juego.foto_larga} onChange={manejarCambio} />
          </div>
          <div className="campo">
            <label>Video (YouTube):</label>
            <input type="text" name="video" value={juego.video} onChange={manejarCambio} />
          </div>
          <div className="campo">
            <label>Categoría:</label>
            <input type="text" name="categoria" value={juego.categoria} onChange={manejarCambio} />
          </div>
          <div className="campo" style={{ gridColumn: '1 / -1' }}>
            <label>Descripción:</label>
            <textarea name="descripcion" value={juego.descripcion} onChange={manejarCambio}></textarea>
          </div>
        </div>

        <div className="botones">
          <button type="submit" className="btn btn-crear">{juegoProp ? 'Guardar cambios' : 'Crear'}</button>
          <button type="button" className="btn btn-cancelar" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CrearJuego;
