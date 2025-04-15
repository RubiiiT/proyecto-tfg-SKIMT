import http from "./http-axios.js";

const endPointBase = '/pedidos';

class ServicioPedido{

    todosLosJuegos(){
    return http.get(endPointBase)
   }

   crearPedido(pedidoDTO){
    return  http.post(endPointBase,pedidoDTO)

   }

 

  
}

export default new ServicioPedido();