import ServicioTienda from "../../servicios/axios/ServicioTienda";
import { mostrarAlerta } from "../../utilities/alertas";

const ListaJuegos = ({ setJuegos,juegos, onClickJuego }) => {
  
  //Para que coja el resultado cuando pulse el boton, no al instante
  const onBorrar= async(juego)=>{
    const resultado = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a borrar permanentemente el juego ${juego.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef076d',
      cancelButtonColor: '#555',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    });

    console.log(resultado)

    if(resultado.isConfirmed){
      ServicioTienda.borrarJuego(juego.juego_id).then((response)=>{
        mostrarAlerta("success","Juego borrado",`El juego ${juego.nombre} ha sido borrado`)
        setJuegos(prev => prev.filter(j => j.juego_id !== juego.juego_id));
      })
      .catch((error)=>{
        console.log(error)
        mostrarAlerta("error","Error borrado","Ha sucedido un problema")
      })
    }
  }

  return (
    <ul className="lista">
      {juegos.map(juego => (
        <li key={juego.juego_id} className="juegoItem" >
          <img className="portadaJuego" src={juego.portada} alt={juego.nombre} onClick={() => onClickJuego(juego)} />
          <div className="botones-acciones">
            <button className="btn-editar" onClick={() => onEditar(juego)}>Editar</button>
            <button className="btn-borrar" onClick={() => onBorrar(juego)}>Borrar</button>
          </div>
        </li>
      ))}
    </ul>
  )
};
  
  export default ListaJuegos;
  