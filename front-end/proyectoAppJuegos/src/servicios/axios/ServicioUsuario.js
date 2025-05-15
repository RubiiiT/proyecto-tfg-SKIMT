import http from "./http-axios.js";

const endPointBase = '/usuarios';

class ServicioUsuario{

   getUsuarios(){
      return http.get(endPointBase+"/paraChat")
   }
   
   inicioSesionBackEnd(token){
    return http.post(endPointBase+"/inicioSesion",{token});
   }
   registroBackEnd(usuario){
      return http.post(endPointBase,usuario);
   }
   anadirJuegos(usuario_id,juegos){
      return http.put(endPointBase+"/"+usuario_id+"/juegos",juegos);
   }
}

export default new ServicioUsuario();