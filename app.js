const express = require('express');
const app = express();
const models = require('./models');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const Promise = require('bluebird');
const db = models.db;

//Exporting each model
const Hotels = models.Hotels;
const Restaurants = models.Restaurants;
const Activities = models.Activities;
const Place = models.Place;

app.use(volleyball);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

app.get('/', function(req, res, next) {
  /*
    Promise: hotels, Restaurants, Activities
  */
  var hotelPromise = Hotels.findAll();
  var restaurantsPromise = Restaurants.findAll();
  var activitiesPromise = Activities.findAll();
  Promise.all([hotelPromise, restaurantsPromise, activitiesPromise])
  .then(function(dbContent){
      console.log(dbContent);
      var hotels = dbContent[0];
      var restaurants = dbContent[1];
      var activities = dbContent[2];
      res.render('index', {
        templateHotels: hotels,
        templateRestaurants: restaurants,
        templateActivities: activities
      });
  })
});

// add routes here

app.use(function(req, res, next) {
  const err = new Error('That page doesn\'t exist!');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  err.status = err.status || 500;
  console.log(err);
  res.status(err.status).render('error', { err: err });
});

db.sync()
.then(function() {
  app.listen(1337, function() {
    console.log("Server is listening on port 1337");
  });
});
