const db = require('./db')
const Sequelize = db.Sequelize;

const Restaurants = db.define('restaurants', {
    name: {
        type: Sequelize.STRING
    },
    cuisine: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    }
});

module.exports = Restaurants;