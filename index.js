require('dotenv').config();
const express = require('express');
const cors = require('cors');
// mds buga mt
const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const PORT = parseInt(process.env.PORT, 10) || 3000;
let hereIsTheUpsideDown = process.env.UPSIDEDOWN_MODE;

if (hereIsTheUpsideDown === 'true') {
  hereIsTheUpsideDown = false;
} else { // forçado
  hereIsTheUpsideDown = false;
}

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'ping' });
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
