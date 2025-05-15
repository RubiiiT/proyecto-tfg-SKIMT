import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import "../estilos/Chat.scss";

import ServicioUsuario from '../servicios/axios/ServicioUsuario';

const Chat = ({ usuarioActivo }) => {

    

  const [usuarios,setUsuarios] = useState([])

  const [usuarioDestinatario,setUsuarioDestinatario]=useState(null)

  const [mostrar, setMostrar] = useState(false)
 
  const [textoMostrar,setTextoMostrar] =useState("abrir chat")

 

  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const chatRef = useRef(null);

   
  const mostrarOcultar = ()=>{
    setMostrar(!mostrar)
    if (textoMostrar=="abrir chat"){
      setTextoMostrar("cerrar chat")
    }else{
      setTextoMostrar("abrir chat")
      setUsuarioDestinatario(null)
      setMensaje("")
      setMensajes([])
    }
  }

  //Lectura de mensajes
  useEffect(() => {
    if (!usuarioActivo || !usuarioDestinatario) return;
  
    console.log(usuarioDestinatario)

    const conversacionId = [usuarioActivo.firebase_uid, usuarioDestinatario.firebase_uid].sort().join('_');
  

    console.log(conversacionId)
    const q = query(collection(db, 'conversaciones', conversacionId, 'mensajes'), orderBy('timestamp'));
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMensajes(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
  
    return () => unsubscribe();
  }, [usuarioActivo, usuarioDestinatario]);
  

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes]);

  useEffect(()=>{
    ServicioUsuario.getUsuarios()
    .then((response)=>{
      setUsuarios(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  //Envio de mensajes
  const enviarMensaje = async (e) => {
    e.preventDefault();
  
        
    if (!mensaje.trim() || !usuarioDestinatario) return;
  
    const conversacionId = [usuarioActivo.firebase_uid, usuarioDestinatario.firebase_uid].sort().join('_');
  
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


  const onSeleccionar = (usuario) => {
    setUsuarioDestinatario(usuario);
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

         <div className="chat-widget__mensajes" ref={chatRef}>
        {mensajes.map(msg => (
          <div key={msg.id} className={`chat-widget__mensaje ${msg.uid === auth.currentUser?.uid ? 'chat-widget__mensaje--propio' : ''}`}>
            <strong>{msg.nombre}:</strong> {msg.texto}
          </div>
        ))}
      </div>
      <div className="lista-usuarios">
        {usuarios
        .filter(usuario => usuario.nombre !== 'admin' && usuario.nombre !== usuarioActivo.nombre)
        .map((usuario) => (

          <div
            key={usuario.uid}
            className="usuario-item"
            onClick={() => onSeleccionar(usuario)}
          >
            {usuario.nombre}
          </div>
        ))}
      </div>
      </div>

      <form className="chat-widget__form" onSubmit={enviarMensaje}>
        <input
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button type="submit" className='enviar'>Enviar</button>
       
      </form>
        </>
      )}
     
      <button className='desplegar' onClick={()=>mostrarOcultar()}>{textoMostrar}</button>
    </div>
  );
};

export default Chat;
