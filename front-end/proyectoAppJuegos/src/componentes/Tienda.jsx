import React, { useEffect, useState } from 'react';
import ServicioTienda from '../servicios/axios/ServicioTienda';
import "../estilos/Tienda.scss";
import { loadBootstrapCSS, loadBootstrapJS } from '../servicios/bootstrap/LoadBootstrap';
import { useNavigate } from 'react-router-dom';

const Tienda = ({usuarioActivo,juegosCarrito,juegos,setJuegos}) => {




 //Para que nos lleve al juego especifico
     const navigate = useNavigate();

  const [juegosSlider, setJuegosSlider] = useState([]);
  const [filtros, setFiltros] = useState({
    nombre: '',
    categoria: '',
    precio: ''
  });

  // Cargas css y js de la página web bootstrap
  useEffect(() => {
    const loadBootstrap = async () => {

       loadBootstrapCSS();
      await loadBootstrapJS(); 

    };

    loadBootstrap();
  }, []);

  // Cargas los juegos aleatorios
  useEffect(() => {
    ServicioTienda.juegosAleatorios()
      .then(res => setJuegosSlider(res.data))
      .catch(err => console.error(err));
  }, []);

 // Cargas todos los juegos
 useEffect(() => {
  ServicioTienda.todosLosJuegos()
    .then(res => setJuegos(res.data))
    .catch(err => console.error(err));
}, []);

  const manejarCambiosFiltros = (e) => {
    const { name, value } = e.target;

    const finalValue = name === "categoria" && value === "" ? null : value;

    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [name]: finalValue
    }));
  };

  const manejarSumbitFiltros = (e) => {
    e.preventDefault();

    ServicioTienda.obtenerJuegosFiltrados(filtros)
      .then(res => setJuegos(res.data))
      .catch(err => console.error(err));
  };

  const manejarReseteoFiltros = () => {
    setFiltros({
      nombre: '',
      categoria: '',
      precio: ''
    });

    ServicioTienda.todosLosJuegos()
      .then(res => setJuegos(res.data))
      .catch(err => console.error(err));
  };

  const irAJuegoEspecifico =(juego)=>{
    navigate(`/tienda/${juego.juego_id}`)
  }

  

  return (
    <div className="listaJuegos">

      <div className='filtro'>
      <form onSubmit={manejarSumbitFiltros} className="filtroForm">
        <div className="form-group">
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={filtros.nombre}
            onChange={manejarCambiosFiltros}
            className="form-control"
            placeholder="Nombre del Juego"  
          />
        </div>
        <div className="form-group">
          <select
            id="categoria"
            name="categoria"
            value={filtros.categoria}
            onChange={manejarCambiosFiltros}
            className="form-control"
          >
            <option value="" disabled>Selecciona una categoría</option> 
            <option value="accion">Acción</option>
            <option value="aventura">Aventura</option>
            <option value="deportes">Deportes</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="number"
            id="precio"
            name="precio"
            value={filtros.precio}
            onChange={manejarCambiosFiltros}
            className="form-control"
            min="0"
            placeholder="Precio máximo" 
          />
        </div>
        <button type="submit" className="btn1">Aplicar Filtros</button>
        <button type="button" onClick={manejarReseteoFiltros} className="btn2">Reiniciar Filtros</button>
      </form>
      </div>


     
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <h4 className='destacado'>Juegos del Mes</h4>
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
                onClick={()=>irAJuegoEspecifico(juego)}
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


      <h4 className='filtro'>Otros juegos</h4>

      <ul className="lista">
        {juegos.map(juego => (
          <li key={juego.juego_id} className="juegoItem" onClick={()=>irAJuegoEspecifico(juego)}>
            <img className="portadaJuego" src={juego.portada} alt={juego.nombre} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tienda;
