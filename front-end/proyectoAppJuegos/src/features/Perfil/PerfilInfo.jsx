import React from 'react';

const PerfilInfo = ({ nombre, email, dinero }) => {
  return (
    <div className="perfil-info">
      <p><strong>Nombre:</strong> <span>{nombre}</span></p>
      <p><strong>Email:</strong> <span>{email}</span></p>
      <p><strong>Dinero disponible:</strong> 
        <span>{dinero} <img src="/logoDivisa.png" alt="iconoMoneda" /></span>
      </p>
    </div>
  );
};

export default PerfilInfo;
