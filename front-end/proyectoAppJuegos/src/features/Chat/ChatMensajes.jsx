import React from 'react';

const ChatMensajes = ({ mensajes, chatRef, usuarioActualUid }) => {
  return (
    <div className="chat-widget__mensajes" ref={chatRef}>
      {mensajes.map(msg => (
        <div
          key={msg.id}
          className={`chat-widget__mensaje ${msg.uid === usuarioActualUid ? 'chat-widget__mensaje--propio' : ''}`}
        >
          <strong>{msg.nombre}:</strong> {msg.texto}
        </div>
      ))}
    </div>
  );
};

export default ChatMensajes;
