import http from "./http-axios.js";

const endPointBase = '/resenas';

class ServicioResena{
    
    crearResena(resena){
        return http.post(endPointBase,resena);
    }

    cogerResenaPorIdJuego(id){
        return http.get()
    }

}

export default new ServicioResena();