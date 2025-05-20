

const JuegosSlider = ({ juegos, onClickJuego }) => (
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <h4 className="destacado">Juegos del Mes</h4>
      <ol className="carousel-indicators">
        {juegos.map((_, index) => (
          <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index} className={index === 0 ? 'active' : ''}></li>
        ))}
      </ol>
      <div className="carousel-inner">
        {juegos.map((juego, index) => (
          <div key={juego.juego_id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img
              src={juego.foto_larga}
              className="d-block w-100"
              alt={juego.nombre}
              onClick={() => onClickJuego(juego)}
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </a>
    </div>
  );
  
  export default JuegosSlider;
  