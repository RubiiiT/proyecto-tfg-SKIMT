import { useState } from 'react';
import '../estilos/Registro.scss';  

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

    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Si todo es correcto, puedes manejar el registro aquí
    setError('');
    sweetAlertCerrarTemporizador(nombre)
    onClose()
    console.log('Formulario enviado:', { nombre, gmail, contrasena });

    // Aquí puedes llamar a tu API para registrar el usuario
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
