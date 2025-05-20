import ServicioTienda from "../../servicios/axios/ServicioTienda";
import { mostrarAlerta } from "../../utilities/alertas";
import Modal from "../componentesUtiles/Modal";
import CrearJuego from "./CrearJuego";

import { useState } from "react";

const ListaJuegos = ({ setJuegos, juegos, onClickJuego, usuarioActivo }) => {
  const [juegoEditando, setJuegoEditando] = useState(null);
  const [modal, setModal] = useState({ editarJuego: false });

  const gestionarModal = (tipo, estado, juego = null) => {
    setModal((prev) => ({ ...prev, [tipo]: estado }));
    setJuegoEditando(juego);
  };

  const onBorrar = async (juego) => {
    const resultado = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a borrar permanentemente el juego ${juego.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef076d",
      cancelButtonColor: "#555",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      ServicioTienda.borrarJuego(juego.juego_id)
        .then((response) => {
          mostrarAlerta("success", "Juego borrado", `El juego ${juego.nombre} ha sido borrado`);
          setJuegos((prev) => prev.filter((j) => j.juego_id !== juego.juego_id));
        })
        .catch((error) => {
          console.log(error);
          mostrarAlerta("error", "Error borrado", "Ha sucedido un problema");
        });
    }
  };

  

  return (
    <>
      <ul className="lista">
        {juegos.map((juego) => (
          <li key={juego.juego_id} className="juegoItem">
            <img className="portadaJuego" src={juego.portada} alt={juego.nombre} onClick={() => onClickJuego(juego)} />

            {usuarioActivo?.email === "admin@gmail.com" && (
              <div className="botones-acciones">
                <button className="btn-editar" onClick={() => gestionarModal("editarJuego", true, juego)}>Editar</button>
                <button className="btn-borrar" onClick={() => onBorrar(juego)}>Borrar</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Modal ÚNICO para edición */}
      <Modal isOpen={modal.editarJuego} onClose={() => gestionarModal("editarJuego", false)}>
        {juegoEditando && (
          <CrearJuego
            onClose={() => gestionarModal("editarJuego", false)}
            setJuegos={setJuegos}
            juego={juegoEditando}
          />
        )}
      </Modal>
    </>
  );
};

export default ListaJuegos;
