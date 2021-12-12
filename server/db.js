const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL ||'postgres://localhost/baseball_db');
const { STRING, UUID, UUIDV4 } = Sequelize;

const Player = db.define('player', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: STRING,
  },
  lastName: {
    type: STRING
  },
  homeTown: {
    type: STRING
  },
  birthYear: {
    type: STRING
  },
  position: {
    type: STRING
  }
});

module.exports = {
  db,
  Player
};
