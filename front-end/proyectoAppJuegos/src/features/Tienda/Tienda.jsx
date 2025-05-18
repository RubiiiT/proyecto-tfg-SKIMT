import React, { useEffect, useState } from 'react';
import ServicioTienda from '../../servicios/axios/ServicioTienda';
import { loadBootstrapCSS, loadBootstrapJS } from '../../servicios/bootstrap/LoadBootstrap';
import { useNavigate } from 'react-router-dom';
import JuegosSlider from './JuegosSlider';
import FiltroJuegos from './FiltroJuegos';
import ListaJuegos from './ListaJuegos';
import './Tienda.scss';

import Modal from"../componentesUtiles/Modal"
import CrearJuego from"../componentesUtiles/CrearJuego"

const Tienda = ({juegos, setJuegos ,usuarioActivo}) => {

    //Para admin
    const [modal, setModal] = useState({
        crearJuego: false
      });
    
      const gestionarModal = (tipo, estado) => {
        setModal((prev) => ({ ...prev, [tipo]: estado }));
      };

    //Para usuarios normales
    console.log(usuarioActivo)
  const navigate = useNavigate();
  const [juegosSlider, setJuegosSlider] = useState([]);
  const [filtros, setFiltros] = useState({ nombre: '', categoria: '', precio: '' });

  useEffect(() => {
    loadBootstrapCSS();
    loadBootstrapJS();
  }, []);

  useEffect(() => {
    ServicioTienda.juegosAleatorios().then(res => setJuegosSlider(res.data));
    ServicioTienda.todosLosJuegos().then(res => setJuegos(res.data));
  }, [setJuegos]);

  const manejarCambiosFiltros = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: name === "categoria" && value === "" ? null : value }));
  };

  const aplicarFiltros = (e) => {
    e.preventDefault();
    ServicioTienda.obtenerJuegosFiltrados(filtros).then(res => setJuegos(res.data));
  };

  const resetearFiltros = () => {
    setFiltros({ nombre: '', categoria: '', precio: '' });
    ServicioTienda.todosLosJuegos().then(res => setJuegos(res.data));
  };

  const irAJuegoEspecifico = (juego) => {
    navigate(`/tienda/${juego.juego_id}`);
  };

  return (
    <div className="listaJuegos">
      <FiltroJuegos
        filtros={filtros}
        onChange={manejarCambiosFiltros}
        onSubmit={aplicarFiltros}
        onReset={resetearFiltros}
      />

    {/* Para modo admin */}
    {usuarioActivo?.email === "admin@gmail.com" && (
        <>
          <button id='botonCrearJuego' onClick={() => gestionarModal("crearJuego", true)}>Crear nuevo juego</button>

          <Modal isOpen={modal.crearJuego} onClose={() => gestionarModal("crearJuego", false)}>
            <CrearJuego onClose={() => gestionarModal("crearJuego", false)} />
          </Modal>
        </>
      )}


      <JuegosSlider juegos={juegosSlider} onClickJuego={irAJuegoEspecifico} />

      <h4 className="filtro">Otros juegos</h4>
      <ListaJuegos juegos={juegos} onClickJuego={irAJuegoEspecifico} />
    </div>
  );
};

export default Tienda;
