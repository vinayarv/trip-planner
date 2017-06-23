
var db = require('db');

const activities = db.define('activities', {
  name:{
    type: Sequelize.STRING
  },
  age_range: {
    type: Sequelize.STRING
  }
})

