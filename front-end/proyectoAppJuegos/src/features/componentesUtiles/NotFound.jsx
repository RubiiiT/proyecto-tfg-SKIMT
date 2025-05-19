// NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="pagina404">
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
      <button className="btn-volver" onClick={() => navigate('/tienda')}>
        Volver a la tienda
      </button>
    </div>
  );
};

export default NotFound;
