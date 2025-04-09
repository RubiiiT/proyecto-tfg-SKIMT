import http from "./http-axios.js";

class ServicioFirebase{
   inicioSesionBackEnd(token){
    return http.post("/verificarToken",{token});
   }
   registroBackEnd(usuario){
      return http.post("/usuarios",usuario);
   }
}

export default new ServicioFirebase();