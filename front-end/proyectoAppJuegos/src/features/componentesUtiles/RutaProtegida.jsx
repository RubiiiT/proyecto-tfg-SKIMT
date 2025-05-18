import { Navigate } from 'react-router-dom'

function RutaProtegida({ children, usuarioActivo }) {
    //Esto lo que hace es comprobar si se ha iniciado Sesion. Si se ha iniciado, va al componente que le metamos dentro. Si no, va a "/"
  return usuarioActivo ? children : <Navigate to="/" replace />
}

export default RutaProtegida
