
import './App.css'
import MenuSuperior from './componentes/MenuSuperior'
import InicioSesion from './componentes/InicioSesion'
import PruebaJuegos from './componentes/Tienda'
import Tienda from './componentes/Tienda'
import { useState } from 'react'


function App() {

  const [usuarioActivo,setUsuarioActivo] = useState(null)
  
  return (
   <>
    {usuarioActivo ? (
       <>
        <MenuSuperior></MenuSuperior>
     <Tienda></Tienda>
     </>
    ):(
     
    
      <InicioSesion setUsuarioActivo={setUsuarioActivo}></InicioSesion>
      
    )}
   </>
  )
}

export default App
