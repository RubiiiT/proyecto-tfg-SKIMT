import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../estilos/Tienda.scss";


const Tienda = () => {
    const [juegos, setJuegos] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:8080/juegos')
        .then(res => setJuegos(res.data))
        .catch(err => console.error(err));
    }, []);
  
    return (
      <div className="listaJuegos">
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
