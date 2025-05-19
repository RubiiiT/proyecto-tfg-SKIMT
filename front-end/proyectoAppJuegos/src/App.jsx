import { useState,useEffect } from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'

import './App.css'
import MenuSuperior from './features/MenuSuperior/MenuSuperior'
import InicioSesion from './features/PantallaBienvenida/InicioSesion'
import Tienda from './features/Tienda/Tienda'

import Carrito from './features/Carrito/Carrito'
import Biblioteca from './features/Biblioteca/Biblioteca'
import TiendaJuegoEspecifico from './features/TiendaJuegoEspecifico/TiendaJuegoEspecifico'
import RutaProtegida from './features/componentesUtiles/RutaProtegida'
import Perfil from './features/Perfil/Perfil'
import Juego from './features/Juego/Juego'

import Chat from './features/Chat/Chat'

import UseStorageState from './servicios/almacenamiento/UseStorageState'



function App() {

  const [usuarioActivo,setUsuarioActivo] = UseStorageState("usuarioActivo",null);
  const [juegosCarrito,setJuegosCarrito] = UseStorageState("juegosCarrito",[]);
  const [juegos, setJuegos] = useState([]);


   
  return (
   <>
    {/*
    Si existe el usuario, enseñamos le menu superior ya que no queremos que sea una ruta, 
    queremos que este siempre que se haya iniciado sesion
    */}
    {usuarioActivo && <MenuSuperior usuarioActivo={usuarioActivo} setUsuarioActivo={setUsuarioActivo} juegosCarrito={juegosCarrito} setJuegosCarrito={setJuegosCarrito}/>}
      {usuarioActivo && <Chat usuarioActivo={usuarioActivo}></Chat>}
    <Routes>
    {/*
   Ponemos como ruta principal el inicio de sesion.
   Luego, vamos poniendo las rutas y dentro, metemos el componente "RutaProtegida" que hemos creado
   Este componente verificará si existe el usuarioActivo para asi mandarme al componente adecuado o redirigir
   con un navigate a la ruta principal

   Ponemos que la ruta principal sea Inicio de sesion pero cuando tenga un usuarioActivo, se redirija a "/tienda", que seria la nueva rutaprincipal 
    */}
      <Route path='/' element={
      usuarioActivo 
        ? <Navigate to="/tienda" />
        : <InicioSesion setUsuarioActivo={setUsuarioActivo} />
    }></Route>
      
      <Route path='/tienda' element={ 
      <RutaProtegida usuarioActivo={usuarioActivo}>
    <Tienda  juegos={juegos} setJuegos={setJuegos} usuarioActivo={usuarioActivo}></Tienda>
    </RutaProtegida>
  } >
     </Route>

     <Route path='/tienda/:id' element={ 
      <RutaProtegida usuarioActivo={usuarioActivo}>
    <TiendaJuegoEspecifico juegos={juegos} usuarioActivo={usuarioActivo} juegosCarrito={juegosCarrito} setJuegosCarrito={setJuegosCarrito}></TiendaJuegoEspecifico>
    </RutaProtegida>
  } >
     </Route>

     <Route path='/carrito' element={ 
      <RutaProtegida usuarioActivo={usuarioActivo}>
    <Carrito setUsuarioActivo={setUsuarioActivo} usuarioActivo={usuarioActivo} juegosCarrito={juegosCarrito} setJuegosCarrito={setJuegosCarrito}></Carrito>
    </RutaProtegida>
  } >
     </Route>


     <Route path='/biblioteca' element={ 
      <RutaProtegida usuarioActivo={usuarioActivo}>
    <Biblioteca usuarioActivo={usuarioActivo}></Biblioteca>
    </RutaProtegida>
  } >
     </Route>

     <Route path='/obtenerPuntos' element={<Juego />} />

     <Route path='/perfil' element={ 
      <RutaProtegida usuarioActivo={usuarioActivo}>
        <Perfil usuarioActivo={usuarioActivo} setJuegosCarrito={setJuegosCarrito} setUsuarioActivo={setUsuarioActivo}></Perfil>
    </RutaProtegida>
  } >
     </Route>

   {/*
 <Route path='/errorInicioSesion' element={<PaginaErrorSinInicioSesion></PaginaErrorSinInicioSesion>}></Route>
   */}
  
   
   
   
   
    </Routes>
   </>
  )
}

export default App
