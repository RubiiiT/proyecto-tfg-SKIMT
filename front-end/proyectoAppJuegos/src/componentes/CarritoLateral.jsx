import React, { useEffect, useState } from 'react';
import "../estilos/CarritoLateral.scss";
import { useNavigate } from 'react-router-dom';

// Componente CarritoLateral
const CarritoLateral = ({ isOpen, onClose, juegosCarrito ,setJuegosCarrito}) => {

  const [activo, setActivo] = useState(isOpen); // Usamos isOpen para iniciar el estado

    // No renderizamos el componente si no está activo ni abierto
    if (!activo && !isOpen) return null;

    //Para que nos lleve al compoente para pagar (carrito)
    const navigate = useNavigate();


  const [totalPrecio, setTotalPrecio] = useState(0); // Para almacenar el total

  
  useEffect(() => {
    // Calculamos el total cada vez que el carrito cambie
    const total = juegosCarrito.reduce((acc, juego) => acc + juego.precio, 0);
    setTotalPrecio(total);
  }, [juegosCarrito]);

  useEffect(() => {
    if (isOpen) {
      setActivo(true); // Si el carrito se abre, activamos la animación de entrada

      //desactiva el scroll de la pagina de tienda para que no se overlapeen los scrolls
      document.body.style.overflow = 'hidden';
    } else {
      // Si se cierra, dejamos que la animación se ejecute antes de cambiar el estado
   
        setActivo(false); // Después de la animación de salida, cambiamos el estado a 'false'

        //Vuelve a activar el scroll en la pagina principal porque cierro el carrito
        document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const cerrarCarrito = ()=>{
    setActivo(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => {
        onClose(); // Esto se ejecuta después del tiempo de animación
      }, 500); // Espera 500ms (ajústalo a lo que dure tu animación en CSS)
  }

  const eliminarJuego = (index) => {
    // Eliminar el juego del carrito por su índice
    const nuevosJuegos = juegosCarrito.filter((_, i) => i !== index);
    setJuegosCarrito(nuevosJuegos); // Actualiza el carrito sin el juego eliminado
  }

  const irAComprar= ()=>{
    cerrarCarrito();
    navigate("/carrito");
  }
  


  return (
    <div className='overlayFondo' >
    <div className={`carritoLateral ${activo ? 'activo' : 'desactivo'}`}>

        <div className='parteSuperior'>
        <h2>Mi Carrito</h2>
           <button className="btnVolver" onClick={cerrarCarrito}>
              <img src="flechaAtras.png" alt="Volver" />
           </button>
          
       </div>

          <ul>
            {juegosCarrito.length > 0 ? (
              juegosCarrito.map((juego, index) => (
                
                <li key={index} className="juego-item">
                  <img src={juego.portada} alt={juego.nombre} className="juego-imagen" />
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
                ))
                  ) : (
                    <p>No hay juegos en el carrito.</p>
                  )}
          </ul>

          <div id='separador'></div>
          <div className='totalJuegosCarrito'>
            <div className='totalPrecio'>
            <h2>Total:</h2>
           
            <h2>{totalPrecio} <img src="logoDivisa.png" alt="iconoMoneda" /> </h2>
            </div>
            <button className="btnComprar" onClick={()=>irAComprar()} >Ir al pago</button>
          </div>

    </div>
    </div>
  );
};

export default CarritoLateral;
