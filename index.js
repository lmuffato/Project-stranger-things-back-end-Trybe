const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Configura o uso de variáveis de ambiente

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const { PORT, UPSIDEDOWN_MODE } = process.env; // Desconstroi as variáveis de ambiente

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

const upsideDownSwap = JSON.parse(UPSIDEDOWN_MODE);

app.use(cors());

// const hereIsTheUpsideDown = true; // A constante hereIsTheUpsideDown passará a ser usada pela variável de ambiente

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    upsideDownSwap,
  );
  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log('Escutando na porta 3000');
});
