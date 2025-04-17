import React, { useEffect, useState } from 'react';
import ServicioTienda from '../servicios/axios/ServicioTienda';
import "../estilos/TiendaJuegoEspecifico.scss";
import { loadBootstrapCSS, loadBootstrapJS } from '../servicios/bootstrap/LoadBootstrap';



import { useParams } from 'react-router-dom';

const TiendaJuegoEspecifico = ({usuarioActivo,juegosCarrito,setJuegosCarrito,juegos}) => {

    const [juego, setJuego] = useState(null);

    const { id } = useParams();

    
    useEffect(()=>{
        ServicioTienda.obtenerJuegoPorId(id)
        .then((response)=>{
            console.log(response)
            setJuego(response.data)
        })
        .catch((error)=>{
            console.log("algo salio mal "+error)
        })
    },[]);
   

  const anadirJuegoCarrito =()=>{

    //Comprobamos que no exista el juego en el carrito para no añadir 2 juegos iguales
    if(juegosCarrito.some(item => item.nombre === juego.nombre)){
      alert("Ya tienes este juego en el carrito")
    }
    //Comprobamos que tampoco exista en nuesta biblioteca
    else if (usuarioActivo.juegos.some(juegoBiblio => juegoBiblio.juego_id === juego.juego_id)) {
      alert("Ya tienes este juego en tu biblioteca");
    }
    else{
      //Para que se mantengan los anteriores y se añada el nuevo juego
      setJuegosCarrito(prevJuegos => [...prevJuegos, juego]);
      alert("Juego añadido")
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
    {juego.resenas && juego.resenas.length > 0 ? (
      juego.resenas.map((resena, index) => (
        <div className="resenaCard" key={index}>
          <h4>{resena.usuario}</h4>
          <p>⭐ {resena.puntuacion} / 5</p>
          <p>{resena.texto}</p>
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
