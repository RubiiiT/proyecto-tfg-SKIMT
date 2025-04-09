import { useState } from 'react'
import './App.css'
import InicioSesion from './componentes/InicioSesion'
import ListaJuegos from './componentes/pruebaJuegos'

function App() {

  const [usuarioActivo,setUsuarioActivo] = useState(null)
  
  return (
    <>
      {usuarioActivo ? (
        <h1>Hola</h1>
      ):(
        <InicioSesion setUsuarioActivo={setUsuarioActivo}></InicioSesion>      
      )}
     
    </>
  )
}

export default App
