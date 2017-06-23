const db = require('./db');
const Activities = require('./activity');
const Hotels = require('./hotel');
const Place = require('./place');
const Restaurants = require('./restaurant');

Activities.belongsTo(Place);
Restaurants.belongsTo(Place);
Hotels.belongsTo(Place);

module.exports = db;
