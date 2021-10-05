const express = require('express'); // BackEnd
const cors = require('cors');
require('dotenv').config();

// const { PORT, UPSIDEDOWN_MODE } = process.env;

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

const PORT = process.env.PORT || 3000;
const hereIsTheUpsideDown = process.env.UPSIDEDOWN_MODE;

// const boolValue = (/true/i).test(hereIsTheUpsideDown);

// console.log('valorTrue', boolValue);
// console.log('valorTrueTypeof', typeof boolValue);

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log(`Escutando na porta 3000 ${PORT}`);
});
