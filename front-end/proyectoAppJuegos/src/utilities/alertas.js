
/**
 * Muestra una alerta personalizada con SweetAlert2
 * @param {'success' | 'error' | 'warning' | 'info' | 'question'} tipo - Tipo de alerta
 * @param {string} titulo - Título del mensaje
 * @param {string} texto - Cuerpo del mensaje
 * @param {function} callback - Función opcional a ejecutar al confirmar
 */
export const mostrarAlerta = (tipo, titulo, texto, callback) => {
  Swal.fire({
    icon: tipo,
    title: titulo,
    text: texto,
    confirmButtonColor: '#EF076D',
    background: "#fff",
    color: '#EF076D',
    confirmButtonText: 'Aceptar',
  }).then((result) => {
    if (result.isConfirmed && typeof callback === 'function') {
      callback();
    }
  });
};
