const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://neo4j:7687',
  neo4j.auth.basic('neo4j', 'julian.reyes04')
);

async function extractData() {
  const session = driver.session();
  try {
    const result = await session.run('MATCH (p:Pelicula) RETURN p');
    return result.records.map(record => record.get('p').properties);
  } finally {
    await session.close();
  }
}

module.exports = extractData;
