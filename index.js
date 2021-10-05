const express = require('express');
const cors = require('cors');
require('dotenv').config();

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const port = process.env.PORT;

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const hereIsTheUpsideDown = process.env.UPSIDEDOWN_MODE === 'true';
// Passando de string para boolean
// https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
