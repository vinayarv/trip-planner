
var db = require('./db');
const Sequelize = db.Sequelize;


const Activities = db.define('activities', {
  name:{
    type: Sequelize.STRING
  },
  age_range: {
    type: Sequelize.STRING
  }
})

module.exports = Activities;