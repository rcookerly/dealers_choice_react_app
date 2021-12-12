const express = require('express');
const path = require('path');
const faker = require('faker');
const { db, Player } = require('./db');
const { randomYear, syncAndSeed } = require('./seed');

const PORT = process.env.PORT || 1337;
const HTML_PATH = path.join(__dirname, "../public/index.html")
const PUBLIC_PATH = path.join(__dirname, '../public');

const app = express();

// Body parsing middleware (only needed for POST & PUT requests)
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // This line is only needed for older dependencies

// Static file-serving middleware
app.use(express.static(PUBLIC_PATH));

app.get('/players', async(req, res, next) => {
  try {
    const players = await Player.findAll();
    res.send(players);
  }
  catch(ex) {
    console.log(ex);
    next(ex);
  }
});

// Not currently using
app.get('/players/:id', async(req, res, next) => {
  try {
    const player = await Player.findByPk(req.params.id);
    res.send(player);
  }
  catch(ex) {
    console.log(ex);
    next(ex);
  }
});

app.post('/add', async(req, res, next) => {
  res.send(await Player.create({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    homeTown: `${faker.address.city()}, ${faker.address.state()}`,
    birthYear: randomYear(),
    position: 'Bench'
  }))
});

app.delete('/delete/:id', async(req, res, next) => {
  const playerToDelete = await Player.findByPk(req.params.id);
  playerToDelete.destroy();
  res.sendStatus(204);
});

app.get("*", (req, res) => {
  res.sendFile(HTML_PATH);
});

const init = async() => {
  try {
    await syncAndSeed();
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT: ${PORT}`);
    });
  }
  catch(ex) {
    console.log(ex);
  }
};

init();
