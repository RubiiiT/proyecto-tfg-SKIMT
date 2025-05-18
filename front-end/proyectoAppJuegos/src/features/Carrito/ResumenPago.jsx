import React from 'react';

const ResumenPago = ({ totalPrecio, cantidad, onComprar }) => {
  return (
    <div id='divPago'>
      <div>
        <div className='infoPago'>
          <h3>Nº de Juegos:</h3>
          <h3>{cantidad}</h3>
        </div>
        <div className='infoPago'>
          <h3>Total:</h3>
          <h3>{totalPrecio} <img src="logoDivisa.png" alt="iconoMoneda" /></h3>
        </div>
      </div>
      <button className='btnComprar' onClick={onComprar}>Comprar</button>
    </div>
  );
};

export default ResumenPago;