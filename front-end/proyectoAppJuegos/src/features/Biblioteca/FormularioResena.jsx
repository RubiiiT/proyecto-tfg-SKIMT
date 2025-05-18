import { useState } from 'react';
import "./FormularioResena.scss";

import { mostrarAlerta } from '../../utilities/alertas';

import ServicioResena from '../../servicios/axios/ServicioResena';

const FormularioResena = ({usuarioActivo,juego}) => {
    const [resena, setResena] = useState({
        descripcion: "",
        puntuacion: 10
    });

   

    const crearResena = () => {
        if (resena.descripcion.trim() === ''){
            mostrarAlerta("error","Error creación reseña","Introduzca una reseña no vacía")
            return;

        } 

        ServicioResena.crearResena({
            descripcion:resena.descripcion,
            puntuacion : resena.puntuacion,
            juegoId : juego.juego_id,
            usuarioId : usuarioActivo.usuario_id
        })
        .then((response)=>{
            console.log(response)
            mostrarAlerta("success","Reseña creada con exito")
            setResena({
                descripcion: "",
                puntuacion: 10
            })
        })
        .catch((error)=>{
            console.log(error)
            mostrarAlerta("error","Error creación reseña","Ha habido un problema con la creacion de la reseña. porfavor, intenelo mas tarde")
        })
    };

    return (
        <div id="divResenasBiblioteca">
            <textarea
                value={resena.descripcion}
                onChange={(e) => setResena({ ...resena, descripcion: e.target.value })}
                placeholder="Escribe tu reseña aquí..."
            />

            <div className="campo-puntuacion">
                <label>Puntuación:</label>
                <select
                    value={resena.puntuacion}
                    onChange={(e) =>
                        setResena({ ...resena, puntuacion: Number(e.target.value) })
                    }
                >
                    {[...Array(10)].map((_, i) => (
                        <option key={i} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={crearResena} className="btn">
                Crear reseña
            </button>

        </div>
    );
};

export default FormularioResena;
