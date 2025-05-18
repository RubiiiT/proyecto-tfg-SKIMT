import React from 'react';

const ChatFormulario = ({ mensaje, setMensaje, onEnviar }) => {
  return (
    <form className="chat-widget__form" onSubmit={onEnviar}>
      <input
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button type="submit" className='enviar'>Enviar</button>
    </form>
  );
};

export default ChatFormulario;
