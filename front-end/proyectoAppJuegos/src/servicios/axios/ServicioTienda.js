import http from "./http-axios.js";

const API_URL = 'http://localhost:8080/juegos';

class ServicioTienda{
    todosLosJuegos(){
    return http.get(API_URL)
   }

   obtenerJuegosFiltrados = (filtros) => {
    return http.get(API_URL, {
      params: filtros
    });
  };

   juegosAleatorios() {
    return http.get('/juegos/aleatorios');
  }
}

export default new ServicioTienda();