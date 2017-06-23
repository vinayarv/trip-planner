var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost/tripplanner', {logging: false});

module.exports = db;
