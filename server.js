const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'results.json');

function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.post('/results', (req, res) => {
  const body = req.body;
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ error: 'la requête est vide' });
  }
const data = readData();
  const newEntry = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...body
  };
data.push(newEntry);
  writeData(data);

  res.status(201).json({ message: 'Résultat sauvegardé', entry: newEntry });
});

app.get('/results/:id', (req, res) => {
  const data = readData();
  const entry = data.find(e => e.id === req.params.id);
  if (!entry) return res.status(404).json({ error: 'Non trouvé' });
  res.json(entry);
});

app.get('/results/:id', (req, res) => {
  const data = readData();
  const entry = data.find(e => e.id === req.params.id);
  if (!entry) return res.status(404).json({ error: 'Non trouvé' });
  res.json(entry);
});