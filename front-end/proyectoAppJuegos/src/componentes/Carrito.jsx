import React, { useEffect, useState } from 'react';
import "../estilos/Carrito.scss";


const Carrito = ({juegosCarrito ,setJuegosCarrito,usuarioActivo}) => {

 const [totalPrecio, setTotalPrecio] = useState(0); // Para almacenar el total

  
  useEffect(() => {
    // Calculamos el total cada vez que el carrito cambie
    const total = juegosCarrito.reduce((acc, juego) => acc + juego.precio, 0);
    setTotalPrecio(total);
  }, [juegosCarrito]);

  const eliminarJuego = (index) => {
    // Eliminar el juego del carrito por su índice
    const nuevosJuegos = juegosCarrito.filter((_, i) => i !== index);
    setJuegosCarrito(nuevosJuegos); // Actualiza el carrito sin el juego eliminado
  }
  const funcionAlerta = (icono,titulo,texto)=>{
    Swal.fire({ icon: icono, title: titulo, text: texto,
        
      color:"#EF076D",
      customClass: {
       confirmButton: 'botonConfirmarAlerta'
     }
     });
  }

  const comprarJuego = ()=>{
    if (usuarioActivo.dinero<totalPrecio){
        funcionAlerta("error","Error compra","No tienes suficiente dinero ")
    }
  }

  return (
    
    <>
       

        <div id='divFondoCarrito'>
        <h2 className='tituloCarrito'>Tu Compra</h2>

            <div id='divPrincipalCarrito'>
            <div id='divJuegos'>

            <ul id='listaJuegos'>
            {juegosCarrito.length > 0 ? (
              juegosCarrito.map((juego, index) => (
                <>
                <li key={index} className="juego-item">
                  <img src={juego.foto_larga} alt={juego.nombre} className="juego-imagen" />
                  <div className="juego-detalles">
                    <h3>{juego.nombre}</h3>
                    <p>{juego.precio} <img src="logoDivisa.png" alt="iconoMoneda" /> </p>
                    <button 
                    className="btnEliminar" 
                    onClick={() => eliminarJuego(index)}
                  >
                    🗑️
                  </button>
                  </div>
                 
                </li>
                 <div className='separador'></div>
                 </>
                ))
                  ) : (
                    <p>No hay juegos en el carrito.</p>
                  )}
          </ul>

            </div>

            <div id='divPago'>
               
                <div>
                    <div className='infoPago'>
                        <h3>Nº de Juegos: </h3>
                        <h3>{juegosCarrito.length} </h3>
                     </div>
                    <div className='infoPago'>
                        <h3>Total: </h3>
                         <h3>{totalPrecio} <img src="logoDivisa.png" alt="iconoMoneda" /> </h3>
                    </div>
                </div>
                <button className='btnComprar' onClick={()=>comprarJuego()}>Comprar</button>
            </div>
            </div>
        </div>

    </> 
    
  );
};

export default Carrito;
