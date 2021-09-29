const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { PORT } = process.env;
const intPort = parseInt(PORT, 10);
const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const hereIsTheUpsideDown = process.env.UPSIDEDOWN_MODE;
const parseUpsideDown = JSON.parse(hereIsTheUpsideDown);

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    parseUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(intPort, () => {
  console.log(`Escutando na porta ${PORT}`);
});
