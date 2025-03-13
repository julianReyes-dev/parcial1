const express = require('express');
const extractData = require('./extract');
const transformData = require('./transform');
const loadData = require('./load');

const app = express();
const port = 3000;

app.get('/api/extract', async (req, res) => {
  try {
    const rawData = await extractData();
    const transformedData = transformData(rawData);
    await loadData(transformedData);
    res.json({ message: 'ETL process completed successfully!', data: transformedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
