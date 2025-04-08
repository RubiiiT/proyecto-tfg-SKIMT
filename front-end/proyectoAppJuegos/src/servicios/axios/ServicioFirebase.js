import http from "./http-axios.js";

class ServicioFirebase{
   verificarToken(token){
    return http.post("/verificarToken",{token});
   }
}

export default new ServicioFirebase();