import React from 'react';
import '../estilos/Perfil.scss';

const Perfil = ({ usuarioActivo,setUsuarioActivo,setJuegosCarrito }) => {

    console.log(usuarioActivo)

    const cerrarSesion = ()=>{
        setJuegosCarrito([])
        setUsuarioActivo(null)
      }

  return (
    <div className="contenedorPrincipal">
  <div className="perfil-container">
    <h2 className="perfil-titulo">Perfil del Usuario</h2>
    <div className="perfil-info">
      <p><strong>Nombre:</strong> <span>{usuarioActivo.nombre}</span></p>
      <p><strong>Email:</strong> <span>{usuarioActivo.email}</span></p>
      <p><strong>Dinero disponible:</strong> 
        <span>{usuarioActivo.dinero} <img src="/logoDivisa.png" alt="iconoMoneda" /></span>
      </p>
    </div>

    <h3 className="subtitulo">Historial de Pedidos</h3>
    <div className="pedidos-lista">
      {usuarioActivo.pedidos && usuarioActivo.pedidos.length > 0 ? (
        usuarioActivo.pedidos.map((pedido, index) => (
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

    <button className='btn' onClick={cerrarSesion}>Cerrar Sesión</button>
  </div>
</div>

  );
};

export default Perfil;
