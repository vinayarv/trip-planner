/*
name
num_stars (float from 1-5)
amenities (string of comma delimited items)
*/

var db = require('db');

const hotels = db.define('hotels', {
  name:{
    type: Sequelize.STRING
  },
  num_stars: {
    type: Sequelize.FLOAT(1,5)
  },
  ameneties: {
    type: Sequelize.STRING
  }
});
