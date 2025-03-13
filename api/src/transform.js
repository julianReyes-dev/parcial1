function transformData(data) {
  return data.map(pelicula => {
    // Verificar que el año de lanzamiento sea un número válido
    const añoLanzamiento = parseInt(pelicula['año lanzamiento'], 10);
    
    if (isNaN(añoLanzamiento)) {
      console.error(`Error: Año de lanzamiento no válido para la película con ID ${pelicula.id}`);
      return null; // O manejar el error según sea necesario
    }

    // Formatear el nombre
    const nombreFormateado = pelicula.nombre.toLowerCase().replace(/\s+/g, '-');

    // Convertir calificación a número
    const calificacion = parseFloat(pelicula.calificacion);
    
    if (isNaN(calificacion)) {
      console.error(`Error: Calificación no válida para la película con ID ${pelicula.id}`);
      return null;
    }

    // Categorizar la calificación
    let categoriaCalificacion;
    if (calificacion <= 5) categoriaCalificacion = "Mala";
    else if (calificacion <= 7) categoriaCalificacion = "Regular";
    else categoriaCalificacion = "Buena";

    // Calcular la década
    const decada = `${Math.floor(añoLanzamiento / 10) * 10}s`;

    // Calcular la puntuación ajustada
    const puntuacionAjustada = (calificacion * 2) - ((2025 - añoLanzamiento) / 10);

    return {
      id: pelicula.id,
      nombre_formateado: nombreFormateado,
      categoria_calificacion: categoriaCalificacion,
      decada: decada,
      puntuacion_ajustada: puntuacionAjustada.toFixed(2), // Redondear a 2 decimales
      fecha_procesamiento: new Date().toISOString().split('T')[0] // Fecha actual
    };
  }).filter(item => item !== null); // Filtrar elementos nulos en caso de error
}

module.exports = transformData;

