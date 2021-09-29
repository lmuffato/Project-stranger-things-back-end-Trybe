const express = require('express');
const cors = require('cors');

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

require('dotenv').config();

const { PORT, UPSIDEDOWN_MODE } = process.env;

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

let hereIsTheUpsideDown = UPSIDEDOWN_MODE;

app.get('/', (req, res) => {
  const isHawkinsApp = req.subdomains.some((sd) => sd.includes('bk'));
  if (isHawkinsApp) hereIsTheUpsideDown = false;
  
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});

// Source Ref
// req.subdomains --> http://expressjs.com/en/api.html#req.subdomains