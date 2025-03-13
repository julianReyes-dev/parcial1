function transformData(data) {
  return data.map(pelicula => {
    const nombreFormateado = pelicula.nombre.toLowerCase().replace(/\s+/g, '-');
    const calificacion = parseFloat(pelicula.calificacion);
    const añoLanzamiento = parseInt(pelicula['año lanzamiento']);

    let categoriaCalificacion;
    if (calificacion <= 5) categoriaCalificacion = "Mala";
    else if (calificacion <= 7) categoriaCalificacion = "Regular";
    else categoriaCalificacion = "Buena";

    const decada = `${Math.floor(añoLanzamiento / 10) * 10}s`;
    const puntuacionAjustada = (calificacion * 2) - (2025 - añoLanzamiento) / 10;

    return {
      id: pelicula.id,
      nombre_formateado: nombreFormateado,
      categoria_calificacion: categoriaCalificacion,
      decada: decada,
      puntuacion_ajustada: puntuacionAjustada.toFixed(2),
      fecha_procesamiento: new Date().toISOString().split('T')[0]
    };
  });
}

module.exports = transformData;
