import { useState, useRef, useEffect } from "react";

export default function Juego() {
  const [puntos, setPuntos] = useState(0);
  const iframeRef = useRef(null);

  function onIframeLoad() {
    try {
      const iframeWindow = iframeRef.current.contentWindow;
      const url = new URL(iframeWindow.location.href);
      const puntosParam = url.searchParams.get("puntos");
      if (puntosParam) {
        setPuntos(parseInt(puntosParam));
      }
    } catch (e) {
      console.warn("No se puede acceder a la URL del iframe:", e);
    }
  }

  // Efecto para mostrar en consola cada vez que cambien los puntos
  useEffect(() => {
    console.log("Puntos actualizados:", puntos);
  }, [puntos]);

  return (
    <>
      <h3>Puntos recibidos: {puntos}</h3>
      <iframe
        ref={iframeRef}
        src="/juego/index.html"
        width="800"
        height="600"
        style={{ border: "none" }}
        title="Juego Construct"
        onLoad={onIframeLoad}
      />
    </>
  );
}
