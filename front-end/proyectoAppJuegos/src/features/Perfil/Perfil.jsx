import React from 'react';
import './Perfil.scss';
import PerfilInfo from './PerfilInfo';
import HistorialPedidos from './HistorialPedidos';

const Perfil = ({ usuarioActivo, setUsuarioActivo, setJuegosCarrito }) => {

  const cerrarSesion = () => {
    setJuegosCarrito([]);
    setUsuarioActivo(null);
  };

  return (
    <div className="contenedorPrincipal">
      <div className="perfil-container">
        <h2 className="perfil-titulo">Perfil del Usuario</h2>

        <PerfilInfo 
          nombre={usuarioActivo.nombre} 
          email={usuarioActivo.email} 
          dinero={usuarioActivo.dinero} 
        />

        <HistorialPedidos pedidos={usuarioActivo.pedidos} />

        <button className='btn' onClick={cerrarSesion}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Perfil;
