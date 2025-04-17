import http from "./http-axios.js";

const endPointBase = '/juegos';  

class ServicioBiblioteca {

    juegoPorNombre(nombre, usuarioId) {
        if (!usuarioId) {
            throw new Error('El usuarioId es obligatorio');
        }

        const params = {
            usuarioId
        };

        if (nombre && nombre.trim() !== '') {
            params.nombre = nombre;
        }

        return http.get(`${endPointBase}/por-nombre-y-usuario`, { params });
    }

    obtenerUsuariosPorJuego(juegoId, usuarioId) {
        if (!juegoId || !usuarioId) {
            throw new Error('Ambos, juegoId y usuarioId, son obligatorios');
        }

        return http.get(`${endPointBase}/${juegoId}/usuarios`, {
            params: { usuarioId }
        });
    }
}

export default new ServicioBiblioteca();
