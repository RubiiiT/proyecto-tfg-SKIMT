import React from 'react';

const HistorialPedidos = ({ pedidos }) => {
  return (
    <>
      <h3 className="subtitulo">Historial de Pedidos</h3>
      <div className="pedidos-lista">
        {pedidos && pedidos.length > 0 ? (
          pedidos.map((pedido, index) => (
            <div className="pedido-item" key={index}>
              <p><strong>Cantidad:</strong> <span>{pedido.cantidadJuegos}</span></p>
              <p><strong>Fecha:</strong> <span>{pedido.fechaPedido}</span></p>
              <p><strong>Total:</strong> <span>{pedido.precioTotal} <img src="/logoDivisa.png" alt="iconoMoneda" /></span></p>
            </div>
          ))
        ) : (
          <p className="sin-pedidos">Aún no hay pedidos realizados.</p>
        )}
      </div>
    </>
  );
};

export default HistorialPedidos;
