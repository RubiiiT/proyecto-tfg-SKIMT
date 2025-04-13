import http from "./http-axios.js";

class ServicioFirebase{
   
   inicioSesionBackEnd(token){
    return http.post("/usuarios/inicioSesion",{token});
   }
   registroBackEnd(usuario){
      return http.post("/usuarios",usuario);
   }
}

export default new ServicioFirebase();