// servicioUsuarios.js
import http from "./http-axios";

const endPoint = "/usuarios";

class ServicioJuego {
  sumarDinero(idUsuario, puntos) {
    return http.put(`${endPoint}/${idUsuario}/dinero`, { puntos });
  }
}

export default new ServicioJuego();
