import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import "../estilos/Chat.scss";

const Chat = ({ usuarioActivo }) => {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const chatRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, 'mensajes'), orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMensajes(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes]);

  const enviarMensaje = async (e) => {
    e.preventDefault();

    if (!mensaje.trim()) return;

    await addDoc(collection(db, 'mensajes'), {
      texto: mensaje,
      uid: usuarioActivo.firebase_uid,
      nombre: usuarioActivo.nombre || 'Anónimo',
      timestamp: serverTimestamp()
    });

    setMensaje('');
  };

  return (
    <div className="chat-widget__container">
      <div className="chat-widget__mensajes" ref={chatRef}>
        {mensajes.map(msg => (
          <div key={msg.id} className={`chat-widget__mensaje ${msg.uid === auth.currentUser?.uid ? 'chat-widget__mensaje--propio' : ''}`}>
            <strong>{msg.nombre}:</strong> {msg.texto}
          </div>
        ))}
      </div>

      <form className="chat-widget__form" onSubmit={enviarMensaje}>
        <input
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
