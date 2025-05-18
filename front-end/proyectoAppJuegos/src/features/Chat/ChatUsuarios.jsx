import React from 'react';

const ChatUsuarios = ({ usuarios, usuarioActivo, onSeleccionar }) => {
  return (
    <div className="lista-usuarios">
      {usuarios
        .filter(
          usuario =>
            usuario.nombre !== 'admin' &&
            usuario.nombre !== usuarioActivo.nombre
        )
        .map(usuario => (
          <div
            key={usuario.uid}
            className="usuario-item"
            onClick={() => onSeleccionar(usuario)}
          >
            {usuario.nombre}
          </div>
        ))}
    </div>
  );
};

export default ChatUsuarios;
