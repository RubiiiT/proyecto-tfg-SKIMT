import { useState, useRef, useEffect } from "react";
import ServicioJuego from "../../servicios/axios/ServicioJuego";
import "./Juego.scss"

export default function Juego({ usuarioActivo, setUsuarioActivo }) {
  const [puntos, setPuntos] = useState(0);
  const iframeRef = useRef(null);

  function onIframeLoad() {
    try {
      const iframeWindow = iframeRef.current.contentWindow;
      const url = new URL(iframeWindow.location.href);
      const puntosParam = url.searchParams.get("puntos");
      if (puntosParam) {
        const puntosObtenidos = parseInt(puntosParam);
        setPuntos(puntosObtenidos);

        if (usuarioActivo.usuario_id) {
          ServicioJuego.sumarDinero(usuarioActivo.usuario_id, puntosObtenidos)
            .then(() => {console.log("Dinero actualizado correctamente")
              setUsuarioActivo(prevUsuario => ({
                ...prevUsuario,
                dinero: prevUsuario.dinero + puntosObtenidos,
              }));
            }
                        
          )
            .catch((err) => console.error("Error al actualizar dinero:", err));
        }
      }
    } catch (e) {
      console.warn("No se puede acceder a la URL del iframe:", e);
    }
  }

  return (
    <div className="juegoContainer">
      <h3>Puntos recibidos: {puntos}</h3>
      <iframe
        ref={iframeRef}
        src="/juego/index.html"
        className="juegoIframe"
        title="Juego Construct"
        onLoad={onIframeLoad}
      />
    </div>
  );
  
}
