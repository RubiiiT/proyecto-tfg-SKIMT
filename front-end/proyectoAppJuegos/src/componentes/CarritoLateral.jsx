import React, { useEffect, useState } from 'react';
import "../estilos/CarritoLateral.scss";

// Componente CarritoLateral
const CarritoLateral = ({ isOpen, onClose, juegosCarrito }) => {
  const [activo, setActivo] = useState(isOpen); // Usamos isOpen para iniciar el estado



  useEffect(() => {
    if (isOpen) {
      setActivo(true); // Si el carrito se abre, activamos la animación de entrada
    } else {
      // Si se cierra, dejamos que la animación se ejecute antes de cambiar el estado
   
        setActivo(false); // Después de la animación de salida, cambiamos el estado a 'false'
     
    }
  }, [isOpen]);

  const cerrarCarrito = ()=>{
    setActivo(false);
    
    setTimeout(() => {
        onClose(); // Esto se ejecuta después del tiempo de animación
      }, 500); // Espera 500ms (ajústalo a lo que dure tu animación en CSS)
  }

  // No renderizamos el componente si no está activo ni abierto
  if (!activo && !isOpen) return null;

  return (
    <div className='overlayFondo'>
    <div className={`carritoLateral ${activo ? 'activo' : 'desactivo'}`}>
      <h2>Carrito de Compras</h2>
      <button onClick={cerrarCarrito}>X</button>
      <ul>
        {juegosCarrito.length > 0 ? (
          juegosCarrito.map((juego, index) => (
            <li key={index}>{juego.nombre}</li>
          ))
        ) : (
          <p>No hay juegos en el carrito.</p>
        )}
      </ul>
    </div>
    </div>
  );
};

export default CarritoLateral;
