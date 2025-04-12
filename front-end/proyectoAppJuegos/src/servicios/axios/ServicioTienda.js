import http from "./http-axios.js";

class ServicioTienda{
    todosLosJuegos(){
    return http.get('http://localhost:8080/juegos')
   }

   juegosAleatorios() {
    return http.get('/juegos/aleatorios');
  }
}

export default new ServicioTienda();