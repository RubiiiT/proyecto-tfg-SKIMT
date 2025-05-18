import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';

import "./Chat.scss";

import ServicioUsuario from '../../servicios/axios/ServicioUsuario';
import { getConversacionId } from './ChatUtility';

import ChatMensajes from './ChatMensajes';
import ChatUsuarios from './ChatUsuarios';
import ChatFormulario from './ChatFormulario';

const Chat = ({ usuarioActivo }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioDestinatario, setUsuarioDestinatario] = useState(null);

  const [mostrar, setMostrar] = useState(false);
  const [textoMostrar, setTextoMostrar] = useState("abrir chat");

  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const chatRef = useRef(null);

  const toggleChat = () => {
    setMostrar(!mostrar);
    if (textoMostrar === "abrir chat") {
      setTextoMostrar("cerrar chat");
    } else {
      setTextoMostrar("abrir chat");
      setUsuarioDestinatario(null);
      setMensaje("");
      setMensajes([]);
    }
  };

  // Obtener usuarios
  useEffect(() => {
    ServicioUsuario.getUsuarios()
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Leer mensajes en tiempo real
  useEffect(() => {
    if (!usuarioActivo || !usuarioDestinatario) return;

    const conversacionId = getConversacionId(usuarioActivo.firebase_uid, usuarioDestinatario.firebase_uid);
    const q = query(collection(db, 'conversaciones', conversacionId, 'mensajes'), orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMensajes(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsubscribe();
  }, [usuarioActivo, usuarioDestinatario]);

  // Scroll automático
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes]);

  // Enviar mensaje
  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!mensaje.trim() || !usuarioDestinatario) return;

    const conversacionId = getConversacionId(usuarioActivo.firebase_uid, usuarioDestinatario.firebase_uid);

    await addDoc(
      collection(db, 'conversaciones', conversacionId, 'mensajes'),
      {
        texto: mensaje,
        uid: usuarioActivo.firebase_uid,
        nombre: usuarioActivo.nombre || 'Anónimo',
        timestamp: serverTimestamp()
      }
    );

    setMensaje('');
  };

  return (
    <div className="chat-widget__container">
      {usuarioDestinatario && (
        <div className="chat-widget__destinatario">
          <strong>Hablando con:</strong> {usuarioDestinatario.nombre}
        </div>
      )}

      {mostrar && (
        <>
          <div className='divMensajesYPersonas'>
            <ChatMensajes
              mensajes={mensajes}
              chatRef={chatRef}
              usuarioActualUid={auth.currentUser?.uid}
            />
            <ChatUsuarios
              usuarios={usuarios}
              usuarioActivo={usuarioActivo}
              onSeleccionar={setUsuarioDestinatario}
            />
          </div>

          <ChatFormulario
            mensaje={mensaje}
            setMensaje={setMensaje}
            onEnviar={enviarMensaje}
          />
        </>
      )}

      <button className='desplegar' onClick={toggleChat}>{textoMostrar}</button>
    </div>
  );
};

export default Chat;
