const express = require('express');
const app = express();
const db = require('./models');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const Promise = require('bluebird');

//Exporting each model
const Hotels = db.Hotels;
const Restaurants = db.Restaurants;
const Activities = db.Activities;
const Place = db.Place;

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
  Promise.all([hotelPromise, restaurantsPromise, activitiesPromise]).then(function(dbContent){
      res.render('index', {templateHotels: dbContent[0], templateRestaurants: dbContent[1], templateActivities: dbContent[2]});
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
