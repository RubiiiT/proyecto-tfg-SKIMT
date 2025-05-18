import React, { useState } from 'react';
import ServicioTienda from '../../servicios/axios/ServicioTienda';
import { mostrarAlerta } from '../../utilities/alertas';

import "./CrearJuego.scss";

const CrearJuego = ({ onClose }) => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    portada: '',
    foto_larga: '',
    video: '',
    categoria: ''
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formulario).some((campo) => campo.trim() === '')) {
      mostrarAlerta("warning", "Campos vacíos", "Todos los campos son obligatorios");
      return;
    }

    try {
      await ServicioTienda.crearJuego(formulario);
      mostrarAlerta("success", "Juego creado", `El juego ${formulario.nombre} fue creado correctamente`);
      onClose();
    } catch (error) {
      console.error("Error al crear juego:", error);
      mostrarAlerta("error", "Error", "No se pudo crear el juego");
    }
  };

  return (
    <div className="crear-juego-modal">
      <h2>Crear Nuevo Juego</h2>
      <form onSubmit={manejarSubmit} className="form-crear-juego">
        <div className="campos-contenedor">
          <div className="campo">
            <label>Nombre:</label>
            <input type="text" name="nombre" value={formulario.nombre} onChange={manejarCambio} />
          </div>
          <div className="campo">
            <label>Precio:</label>
            <input type="number" name="precio" value={formulario.precio} onChange={manejarCambio} />
          </div>
          <div className="campo">
            <label>Portada (URL):</label>
            <input type="text" name="portada" value={formulario.portada} onChange={manejarCambio} />
          </div>
          <div className="campo">
            <label>Foto larga (URL):</label>
            <input type="text" name="foto_larga" value={formulario.foto_larga} onChange={manejarCambio} />
          </div>
          <div className="campo">
            <label>Video (YouTube):</label>
            <input type="text" name="video" value={formulario.video} onChange={manejarCambio} />
          </div>
          <div className="campo">
            <label>Categoría:</label>
            <input type="text" name="categoria" value={formulario.categoria} onChange={manejarCambio} />
          </div>
          <div className="campo" style={{ gridColumn: '1 / -1' }}>
            <label>Descripción:</label>
            <textarea name="descripcion" value={formulario.descripcion} onChange={manejarCambio}></textarea>
          </div>
        </div>

        <div className="botones">
          <button type="submit" className="btn btn-crear">Crear</button>
          <button type="button" className="btn btn-cancelar" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CrearJuego;
