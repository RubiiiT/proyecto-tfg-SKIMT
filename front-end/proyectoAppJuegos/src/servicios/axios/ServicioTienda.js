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

  crearJuego(juego){
    return http.post(endPointBase,juego)
  }
  
  borrarJuego(id){
    return http.delete(endPointBase+`/${id}`)
  }

  editarJuego(id,juego){
    return http.put(endPointBase+`/${id}`,juego)
  }
}

export default new ServicioTienda();