import '../estilos/MenuSuperior.scss'

const MenuSuperior = ({usuarioActivo}) => {

  console.log(usuarioActivo)

  return (
    <div className="barraSuperior">
      <div className="menuIzquierda">
        <div className="zonaLogo">
          <p>SKIMT</p>
        </div>
      </div>
      <div className="menuMedioIzquierda">
        <ul className="linksMenu">
          <li>
            <a className="link">Tienda</a>
          </li>
          <li>
            <a  className="link">Biblioteca</a>
          </li>
        </ul>
      </div>
      <div className="menuMedioDerecha">
        <ul className="linksMenu">
            <li>
                <a  className="link">Obtener Puntos</a>
            </li>
            <li>
                <h2>{usuarioActivo.dinero}</h2>
                <img src="logoDivisa.png" alt="iconoMoneda" />
            </li>
        </ul>
      </div>
      <div className="menuDerecha">
        <ul className="linksMenu">
          <li>
            <a> <img className='fotoCarrito' src="logoCarrito.png" alt="carrito" /></a>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default MenuSuperior;
