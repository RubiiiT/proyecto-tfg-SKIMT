
import './App.css'
import MenuSuperior from './componentes/MenuSuperior'
import InicioSesion from './componentes/InicioSesion'
import Tienda from './componentes/Tienda'
import { useState,useEffect } from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'

import Carrito from './componentes/Carrito'
import Biblioteca from './componentes/Biblioteca'
import TiendaJuegoEspecifico from './componentes/TiendaJuegoEspecifico'
import RutaProtegida from './componentes/RutaProtegida'

import UseStorageState from './servicios/almacenamiento/UseStorageState'
import Perfil from './componentes/Perfil'

import ServicioTienda from './servicios/axios/ServicioTienda'

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
    <Tienda usuarioActivo={usuarioActivo} juegos={juegos} juegosCarrito={juegosCarrito} setJuegos={setJuegos}></Tienda>
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
