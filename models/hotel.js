/*
name
num_stars (float from 1-5)
amenities (string of comma delimited items)
*/

const db = require('./db');
const Sequelize = db.Sequelize;

const Hotels = db.define('hotels', {
  name:{
    type: Sequelize.STRING
  },
  num_stars: {
    type: Sequelize.FLOAT(1,1),
    validate: {
      min: 1,
      max: 5
    }
  },
  ameneties: {
    type: Sequelize.STRING
  }
});

module.exports = Hotels;