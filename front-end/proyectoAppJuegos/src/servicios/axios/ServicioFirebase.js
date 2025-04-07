import http from "./http-axios.js";

class ServicioFirebase{
   verificarToken(token){
    return http.get("/verificarToken",token);
   }
}

export default new ServicioFirebase();