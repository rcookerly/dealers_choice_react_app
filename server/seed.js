const faker = require('faker');
const { db, Player } = require('./db');

const positions = ['Pitcher', 'Catcher', 'First Base', 'Second Base', 'Third Base', 'Shortstop', 'Left Field', 'Center Field', 'Right Field'];

const randomYear = () => {
  const start = new Date(1980, 0, 1);
  const end = new Date(2000, 0, 1)
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toDateString().slice(-4);
};

const syncAndSeed = async() => {
  await db.sync({ force: true });

  // Seed 9 players
  for (let i = 0; i < 9; i++) {
    const newPlayer = await Player.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      homeTown: `${faker.address.city()}, ${faker.address.state()}`,
      birthYear: randomYear(),
      position: positions[i]
    });
  }
};

module.exports = {
  randomYear,
  syncAndSeed
};
