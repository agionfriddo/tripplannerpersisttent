var express = require('express');
var router = require('express').Router();

var db = require('../../models/_db');
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day')





router.get('/hotels', function(req, res, next) {
	Hotel.findAll()
		.then(function(hotels) {
			res.send(hotels)
		});
});

router.get('/restaurants', function(req, res, next) {
	Restaurant.findAll()
		.then(function(restaurants) {
			res.send(restaurants)
		});
});

router.get('/activities', function(req, res, next) {
	Activity.findAll()
		.then(function(activities) {
			res.send(activities)
		});
});



// $.ajax({
//   method: 'GET',
//   url: '/api/restaurants'
// })
// .then(function (restaurants) {
//   restaurants.forEach(function() {

//   })
// })
// .catch(console.error.bind(console));



// $.get('/api/restaurants')
// .then(function (restaurants) {
//   restaurants.forEach(function(restaurant){
//     console.log(restaurant.name);
//   });
// })
// .catch( console.error.bind(console) );


// $.ajax({
// 	method: 'POST',
// 	url: '/api/days',
// 	data: Day.number
// })
// .then(function(day) {
// 	$('.day-buttons').append('<button>' + day.number + '</button>')
// })





module.exports = router;

