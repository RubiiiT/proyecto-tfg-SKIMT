import http from "./http-axios.js";

const endPointBase = '/juegos';

class ServicioTienda{
    todosLosJuegos(){
    return http.get(endPointBase)
   };

   obtenerJuegosFiltrados = (filtros) => {
    return http.get(endPointBase, {
      params: filtros
    });
  };

   juegosAleatorios() {
    return http.get('/juegos/aleatorios');
  };

  obtenerJuegoPorId(id){
    return http.get(`/juegos/${id}`)
  }

  obtenerJuegosDeUsuario(idUsuario){
    return http.get(endPointBase+"/usuario/"+idUsuario)
  }
}

export default new ServicioTienda();