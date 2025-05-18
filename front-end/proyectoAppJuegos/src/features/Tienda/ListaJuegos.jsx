const ListaJuegos = ({ juegos, onClickJuego }) => (
    <ul className="lista">
      {juegos.map(juego => (
        <li key={juego.juego_id} className="juegoItem" onClick={() => onClickJuego(juego)}>
          <img className="portadaJuego" src={juego.portada} alt={juego.nombre} />
        </li>
      ))}
    </ul>
  );
  
  export default ListaJuegos;
  