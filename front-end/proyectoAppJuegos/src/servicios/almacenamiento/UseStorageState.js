import { useState,useEffect } from "react";
import LocalStorageServicio from "./storage";

function UseStorageState(clave,valorInicial){
    const[state,setState] = useState(()=>{
        const valorGuardado=LocalStorageServicio.get(clave);
        return valorGuardado!=null?valorGuardado:valorInicial;
    });

    useEffect(()=>{
        LocalStorageServicio.set(clave,state)
    },[state])

    return [state,setState]
}

export default UseStorageState;