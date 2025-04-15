import React, { useEffect, useState } from 'react';
import "../estilos/Carrito.scss";

import { useNavigate } from 'react-router-dom';
import ServicioPedido from '../servicios/axios/ServicioPedido';

const Carrito = ({juegosCarrito ,setJuegosCarrito,usuarioActivo, setUsuarioActivo}) => {

 const [totalPrecio, setTotalPrecio] = useState(0); // Para almacenar el total

 //Para que , una vez se haya hecho la compra, nos devuelva a la tienda
  const navigate = useNavigate();
  
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
    else{
      //Aqui guardamos el pedido en la tabla pedidos y en la intermedia, y tambien los juegos en la biblioteca del usuario
      const fechaActual = new Date().toISOString().split('T')[0];
      //Esto lo hacmeos para obtener solo el id y el precio de cada juego ya que solo necesitamos esa info para guardarlo en la base de datos
      const juegosFormateados = juegosCarrito.map(juego => ({
        juegoId: juego.juego_id,
        precioUnitario: juego.precio
      }));

      ServicioPedido.crearPedido({
        "usuarioId": usuarioActivo.usuario_id,
        "fechaPedido": fechaActual,
        precioTotal:totalPrecio,
        juegos:juegosFormateados
      })

      .then((response)=>{
        console.log("BIEN: "+response)
        //Actualizamos el dinero y los juegos
        setUsuarioActivo((prevUsuario) => ({
          ...prevUsuario,
          dinero: prevUsuario.dinero - totalPrecio,
          juegos: [...prevUsuario.juegos, ...juegosCarrito],
        }));
        
        setJuegosCarrito([])
        
        alert("Todo joya, juegos comprados")

        navigate("/tienda")
      })
      .catch((error)=>{
        console.log("ERROR: "+error)
      })
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
