const express = require('express');
const cors = require('cors');

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const port = process.env.PORT || 3000;
const serv_env = process.env.SERV_ENV || 'não foi :/';

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const hereIsTheUpsideDown = true;

// oioi

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.get('/ola', (req, res) => {
  res.send(`voce está no ambiente de ${serv_env} seu dono é ${process.env.GITHUB_USER}`);
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
