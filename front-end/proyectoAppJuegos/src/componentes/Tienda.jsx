import React, { useEffect, useState } from 'react';
import ServicioTienda from '../servicios/axios/ServicioTienda';
import "../estilos/Tienda.scss";
import { loadBootstrapCSS, loadBootstrapJS } from '../servicios/bootstrap/LoadBootstrap';


const Tienda = ({juegosCarrito,setJuegosCarrito}) => {
  const [juegos, setJuegos] = useState([]);
  const [juegosSlider, setJuegosSlider] = useState([]);

  //Cargas css y js de la pagina web bootstrap
  useEffect(() => {
    const loadBootstrap = async () => {
      await loadBootstrapCSS();
      await loadBootstrapJS(); 
    };

    loadBootstrap();
  }, []); 

  //Cargas los jeugos aleatorios
  useEffect(() => {
    ServicioTienda.juegosAleatorios()
      .then(res => setJuegosSlider(res.data))
      .catch(err => console.error(err));
  }, []); 

  //Cargas todos los juegos
  useEffect(() => {
    ServicioTienda.todosLosJuegos()
      .then(res => setJuegos(res.data))
      .catch(err => console.error(err));
  }, []); 

  return (
    <div className="listaJuegos">
      <h2 className="tituloLista">🎮 Juegos Destacados</h2>

      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" >
        <ol className="carousel-indicators">
          {juegosSlider.map((juego, index) => (
            <li
              key={juego.juego_id}
              data-target="#carouselExampleIndicators"
              data-slide-to={index}
              className={index === 0 ? 'active' : ''}
            ></li>
          ))}
        </ol>
        <div className="carousel-inner">
          {juegosSlider.map((juego, index) => (
            <div key={juego.juego_id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img
                className="d-block w-100"
                src={juego.foto_larga}
                alt={juego.nombre}
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>

          ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </a>
      </div>

      <h2 className="tituloLista">Juegos desde la base de datos:</h2>
      <ul className="lista">
        {juegos.map(juego => (
          <li key={juego.juego_id} className="juegoItem">
            <img className="portadaJuego" src={juego.portada} alt={juego.nombre} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tienda;
