import './MenuSuperior.scss'
import { Link } from 'react-router-dom';
import CarritoLateral from '../CarritoLateral/CarritoLateral';
import { useState } from 'react';

const MenuSuperior = ({usuarioActivo,setUsuarioActivo,juegosCarrito,setJuegosCarrito}) => {

  const [mostrarModal, setMostrarModal] = useState(false);

  const cambiarModal = () => setMostrarModal(!mostrarModal);

  //PONER QUE EL ADMIN SOLO VEA TIENDA Y PERFIL
 

  return (
    <>
    <div className="barraSuperior">
      <div className="menuIzquierda">
        <div className="zonaLogo">
          <p>SKIMT</p>
        </div>
      </div>
      <div className="menuMedioIzquierda">
        <ul className="linksMenu">
          <li>
            <Link to="/tienda" className="link">Tienda</Link>
         
          </li>
          <li>
          <Link to="/biblioteca" className="link">Biblioteca</Link>
          </li>
        </ul>
      </div>
      <div className="menuMedioDerecha">
        <ul className="linksMenu">
            <li>
            <Link to="/obtenerPuntos" className="link">Obtener Puntos</Link>
            </li>
            <li>
                <h2>{usuarioActivo.dinero}</h2>
                <img src="/logoDivisa.png" alt="iconoMoneda" />
            </li>
        </ul>
      </div>
      <div className="menuDerecha">
        <ul className="linksMenu">
          <li >
            
          <Link className="link" to="/perfil" >Perfil</Link>
          </li>
          <li>
            <a> <img className='fotoCarrito' src="/logoCarrito.png" alt="carrito"onClick={()=>cambiarModal()} /></a>
          </li>
          
        </ul>
      </div>
    </div>

   
        {mostrarModal &&  <CarritoLateral onClose={cambiarModal} isOpen={mostrarModal} juegosCarrito={juegosCarrito} setJuegosCarrito={setJuegosCarrito}></CarritoLateral>}
  
    </>
  );
};

export default MenuSuperior;
