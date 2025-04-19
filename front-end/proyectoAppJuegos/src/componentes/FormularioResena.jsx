import { useState } from 'react';
import "../estilos/FormularioResena.scss";

import ServicioResena from '../servicios/axios/ServicioResena';

const FormularioResena = ({usuarioActivo,juego}) => {
    const [resena, setResena] = useState({
        descripcion: "",
        puntuacion: 10
    });

   

    const crearResena = () => {
        if (resena.descripcion.trim() === '') return;

        ServicioResena.crearResena({
            descripcion:resena.descripcion,
            puntuacion : resena.puntuacion,
            juegoId : juego.juego_id,
            usuarioId : usuarioActivo.usuario_id
        })
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
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
