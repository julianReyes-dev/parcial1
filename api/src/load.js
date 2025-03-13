const { Client } = require('pg');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const client = new Client({
  user: 'admin',
  host: 'postgres',
  database: 'etl_db',
  password: 'password',
  port: 5432,
});

async function loadData(data) {
  await client.connect();

  // Crear tabla si no existe
  await client.query(`
    CREATE TABLE IF NOT EXISTS etl_data (
      id VARCHAR(255),
      nombre_formateado VARCHAR(255),
      categoria_calificacion VARCHAR(50),
      decada VARCHAR(20),
      puntuacion_ajustada FLOAT,
      fecha_procesamiento DATE
    );
  `);

  // Insertar datos
  for (const row of data) {
    await client.query(`
      INSERT INTO etl_data (id, nombre_formateado, categoria_calificacion, decada, puntuacion_ajustada, fecha_procesamiento)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [row.id, row.nombre_formateado, row.categoria_calificacion, row.decada, row.puntuacion_ajustada, row.fecha_procesamiento]);
  }

  // Exportar a CSV
  const csvWriter = createCsvWriter({
    path: '/app/shared-volume/recap.csv',
    header: [
      { id: 'id', title: 'ID' },
      { id: 'nombre_formateado', title: 'Nombre Formateado' },
      { id: 'categoria_calificacion', title: 'Categoría Calificación' },
      { id: 'decada', title: 'Década' },
      { id: 'puntuacion_ajustada', title: 'Puntuación Ajustada' },
      { id: 'fecha_procesamiento', title: 'Fecha Procesamiento' }
    ]
  });

  await csvWriter.writeRecords(data);

  await client.end();
}

module.exports = loadData;
