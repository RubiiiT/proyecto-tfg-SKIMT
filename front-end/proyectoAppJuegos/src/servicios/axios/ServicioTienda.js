import http from "./http-axios.js";

const endPointBase = '/juegos';

class ServicioTienda{
    todosLosJuegos(){
    return http.get(endPointBase)
   }

   obtenerJuegosFiltrados = (filtros) => {
    return http.get(endPointBase, {
      params: filtros
    });
  };

   juegosAleatorios() {
    return http.get('/juegos/aleatorios');
  }
}

export default new ServicioTienda();