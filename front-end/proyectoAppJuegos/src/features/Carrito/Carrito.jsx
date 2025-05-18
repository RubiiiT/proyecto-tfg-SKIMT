import React, { useEffect, useState } from 'react';
import "./Carrito.scss";
import { useNavigate } from 'react-router-dom';
import ServicioPedido from '../../servicios/axios/ServicioPedido';
import { mostrarAlerta } from '../../utilities/alertas';

import ListaJuegos from './ListaJuegos';
import ResumenPago from './ResumenPago';

const Carrito = ({ juegosCarrito, setJuegosCarrito, usuarioActivo, setUsuarioActivo }) => {
  const [totalPrecio, setTotalPrecio] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = juegosCarrito.reduce((acc, juego) => acc + juego.precio, 0);
    setTotalPrecio(total);
  }, [juegosCarrito]);

  const eliminarJuego = (index) => {
    const nuevosJuegos = juegosCarrito.filter((_, i) => i !== index);
    setJuegosCarrito(nuevosJuegos);
  };

  const comprarJuego = () => {
    if(juegosCarrito.length==0){
        mostrarAlerta("error","Error compra","No hay juegos para comprar en el carrito")
    }
    else if (usuarioActivo.dinero < totalPrecio) {
      mostrarAlerta("error", "Error compra", "No tienes suficiente dinero ");
    } else {
      const fechaActual = new Date().toISOString().split('T')[0];
      const juegosFormateados = juegosCarrito.map(juego => ({
        juegoId: juego.juego_id,
        precioUnitario: juego.precio
      }));

      ServicioPedido.crearPedido({
        usuarioId: usuarioActivo.usuario_id,
        fechaPedido: fechaActual,
        precioTotal: totalPrecio,
        juegos: juegosFormateados
      })
        .then((response) => {
          setUsuarioActivo(prevUsuario => ({
            ...prevUsuario,
            dinero: prevUsuario.dinero - totalPrecio,
            juegos: [...prevUsuario.juegos, ...juegosCarrito],
            pedidos: [...prevUsuario.pedidos, response.data]
          }));

          setJuegosCarrito([]);
          mostrarAlerta("success", "Pedido realizado con exito");
          navigate("/tienda");
        })
        .catch(error => console.log("ERROR: " + error));
    }
  };

  return (
    <div id='divFondoCarrito'>
      <h2 className='tituloCarrito'>Tu Compra</h2>
      <div id='divPrincipalCarrito'>
        <div id='divJuegos'>
          <ListaJuegos juegosCarrito={juegosCarrito} onEliminar={eliminarJuego} />
        </div>
        <ResumenPago totalPrecio={totalPrecio} cantidad={juegosCarrito.length} onComprar={comprarJuego} />
      </div>
    </div>
  );
};

export default Carrito;
