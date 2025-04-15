import { useState } from 'react';
import '../estilos/Registro.scss';  
//Para firebase
import { auth } from "../config/firebaseConfig";
import {deleteUser,createUserWithEmailAndPassword} from "firebase/auth";
import ServicioUsuario from '../servicios/axios/ServicioUsuario';

function Registro({onClose}) {
  // Estados para los campos
  const [nombre, setNombre] = useState('');
  const [gmail, setGmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  // Estado para el mensaje de error
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de los campos
    if (!nombre || !gmail || !contrasena || !confirmarContrasena) {
      setError('Por favor, rellena todos los campos');
      return;
    }
    if(contrasena.length<6){
      setError('La longitud de la contraseña tiene que se mayor a 6');
      return;
    }

    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Si todo es correcto, puedes manejar el registro aquí
    setError('');
       //AQui LLAMO al metodo para registrar el usuario en firebase y guardar sus datos en mysql a traves de springboot
       registroFirebase()

    console.log('Formulario enviado:', { nombre, gmail, contrasena });

 
  };

  const sweetAlertCerrarTemporizador= (nombre)=>{
    Swal.fire({
        position: "center",
        icon: "success",
        title: "el usuario "+nombre+" ha sido registrado con exito!",
        showConfirmButton: false,
        timer: 1500
      });
  }

  const registroFirebase = async()=>{
    //Para luego poder acceder a el por si falla el back, para borrarlo
    let usuario=null;
    try {
      const credencialUsuario = await createUserWithEmailAndPassword(auth, gmail, contrasena); 
     
      usuario = credencialUsuario.user;
      console.log('Usuario autenticado', usuario);
      
      // Puedes obtener el token si lo necesitas
     // const token = await usuario.getIdToken();
      //console.log("Token JWT:", token);

      console.log("CONEXION BACK")

      ServicioUsuario.registroBackEnd({
        email: usuario.email,
        nombre: nombre,
        dinero:50000, //Cambiar despues a 0, puesto en 50000 para pruebas
        firebase_uid:usuario.uid
      })
      .then(response=>{
        // 
        console.log("Respuesta del backend:", response.data);
        //funcionAlerta("success", "Inicio de sesión exitoso", `Bienvenido, ${usuario}`);
        sweetAlertCerrarTemporizador(nombre)
        onClose()
      })
      .catch(error=>{
        console.error("Error de autenticación: ", error.message);
        funcionAlerta("error", "Error de autenticación", error.message);
         //Borrando el usuario ya que , si falla el back, aun asi crea el usuario porque se crea primero y luego va al back
      try {
        usuario.delete();
        console.log("Usuario eliminado de Firebase por error en el backend.");
      } catch (e) {
        console.error("No se pudo eliminar el usuario de Firebase:", e.message);
      }
      
      })

     
    } catch (error) {
      if(error.code === "auth/email-already-in-use"){
        funcionAlerta("error", "El email ya está registrado");
      }else{
        funcionAlerta("error", "Error de registro", error.message);
        console.error("Error de autenticación: ", error.code);
      }
      
      
      
    }
  }

  const funcionAlerta = (icono,titulo,texto)=>{
    Swal.fire({ icon: icono, title: titulo, text: texto,
        
      color:"#EF076D",
      customClass: {
       confirmButton: 'botonConfirmarAlerta'
     }
     });
  }

  return (
    <div className="pantallaRegistro">
      <form onSubmit={handleSubmit} className="formularioRegistro">
        <h2>Registro</h2>

        {error && <div className="error">{error}</div>}

        <div className="campo">
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe tu nombre completo"
          />
        </div>

        <div className="campo">
          <label htmlFor="gmail">Correo Electrónico (Gmail)</label>
          <input
            type="email"
            id="gmail"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            placeholder="Escribe tu correo electrónico"
          />
        </div>

        <div className="campo">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Escribe tu contraseña"
          />
        </div>

        <div className="campo">
          <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmarContrasena"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            placeholder="Confirma tu contraseña"
          />
        </div>

        <div className="botones">
          <button type="submit" className="btn" id="btnRegistrar">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registro;
