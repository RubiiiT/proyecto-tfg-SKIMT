import React, { useEffect, useState } from 'react';
import ServicioTienda from '../servicios/axios/ServicioTienda';
import "../estilos/TiendaJuegoEspecifico.scss";
import { loadBootstrapCSS, loadBootstrapJS } from '../servicios/bootstrap/LoadBootstrap';

import { mostrarAlerta } from '../utilities/alertas';

import ServicioResena from '../servicios/axios/ServicioResena';

import { useParams } from 'react-router-dom';

const TiendaJuegoEspecifico = ({usuarioActivo,juegosCarrito,setJuegosCarrito,juegos}) => {

    const [juego, setJuego] = useState(null);

    const { id } = useParams();

    const [resenas,setResenas] = useState([]);
    
    useEffect(()=>{
        ServicioTienda.obtenerJuegoPorId(id)
        .then((response)=>{
           
            setJuego(response.data)
        })
        .catch((error)=>{
            console.log("algo salio mal "+error)
        })
    },[]);

    useEffect(()=>{
      ServicioResena.cogerResenaPorIdJuego(id)
      .then((response)=>{
        console.log(response)
        setResenas(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    },[id])
   

  const anadirJuegoCarrito =()=>{

    //Comprobamos que no exista el juego en el carrito para no añadir 2 juegos iguales
    if(juegosCarrito.some(item => item.nombre === juego.nombre)){
      mostrarAlerta("warning","Juego no disponible","Ya tienes este juego en el carrito")
      
    }
    //Comprobamos que tampoco exista en nuesta biblioteca
    else if (usuarioActivo.juegos.some(juegoBiblio => juegoBiblio.juego_id === juego.juego_id)) {
      mostrarAlerta("warning","Juego no disponible","Ya tienes este juego en la biblioteca")
    }
    else{
      //Para que se mantengan los anteriores y se añada el nuevo juego
      setJuegosCarrito(prevJuegos => [...prevJuegos, juego]);
      mostrarAlerta("success","Juego añadido","El juego "+juego.nombre+" ha sido añadido con exito")
      
    }
   
  }

  if (!juego) return <p>Cargando juego...</p>;

  return (
    <>
    <div id='divJuegoEspecifico'>
        <div className='divFotoLarga'>
            <img src={juego.foto_larga} alt="Foto_largo" />
        </div>
        <div className='divInfoJuego'>
            <h2>{juego.nombre}</h2>
            <p>{juego.descripcion}</p>

        </div>
        <div className='divVideoYPrecio'>
        <iframe width="560" height="315" 
        src={juego.video}
        title={juego.nombre} 
        frameBorder="0" 
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
        </iframe>
        <div className='divPrecio'>
            <h2>Comprar juego Ya</h2>
            <h4>Precio: {juego.precio} <img src="/logoDivisa.png" alt="iconoMoneda" /></h4>
            <button onClick={()=>anadirJuegoCarrito()}>Añadir al carrito</button>
        </div>

        
        </div>
        <div id='divResenas'>
  <h1>Reseñas</h1>
  <div className="resenasGrid">
    {resenas && resenas.length > 0 ? (
      resenas.map((resena, index) => (
        <div className="resenaCard" key={index}>
          <h4>Usuario: {resena.usuario.nombre}</h4>
          <p>⭐ {resena.puntuacion} / 10</p>
          <p>{resena.descripcion}</p>
        </div>
      ))
    ) : (
      <p>No hay reseñas aún.</p>
    )}
  </div>
</div>

    </div>
    </>
  );
};

export default TiendaJuegoEspecifico;
