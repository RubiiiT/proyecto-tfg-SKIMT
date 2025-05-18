const FiltroJuegos = ({ filtros, onChange, onSubmit, onReset }) => (
    <div className="filtro">
      <form onSubmit={onSubmit} className="filtroForm">
        <input
          type="text"
          name="nombre"
          value={filtros.nombre}
          onChange={onChange}
          placeholder="Nombre del Juego"
          className="form-control"
        />
        <select
          name="categoria"
          value={filtros.categoria}
          onChange={onChange}
          className="form-control"
        >
          <option value="">Selecciona una categoría</option>
          <option value="accion">Acción</option>
          <option value="aventura">Aventura</option>
          <option value="deportes">Deportes</option>
        </select>
        <input
          type="number"
          name="precio"
          value={filtros.precio}
          onChange={onChange}
          placeholder="Precio máximo"
          className="form-control"
        />
        <button type="submit" className="btn1">Aplicar Filtros</button>
        <button type="button" onClick={onReset} className="btn2">Reiniciar Filtros</button>
      </form>
    </div>
  );
  
  export default FiltroJuegos;
  