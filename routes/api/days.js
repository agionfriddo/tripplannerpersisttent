var express = require('express');
var router = require('express').Router();

var db = require('../../models/_db');
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day')



module.exports = router;

router.get('/', function(req, res, next) {
	Day.findAll()
		.then((day) => res.send(day))
});

router.get('/:id', function(req, res, next) {
  Day.findById(req.params.id)
  .then((day) => res.send(day))
})

router.post('/', function(req, res, next) {
	Day.create(req.body)
		.then(newDay => res.send(newDay))
});

router.post('/:id/restaurant', function(req, res, next) {

})

router.post('/:id/hotel', function(req, res, next) {
	console.log('req.body in days.js', req.body);
	console.log('req.body in days.js', req.params.id);
	Day.findById(req.params.id)
		.then(function(day) {
			day.setHotel(req.body.hotelId)
			.then(function(val) {
			console.log('val in days', val);
			res.sendStatus(204);
			})	

		})		
		.catch(next);
})

router.post('/:id/activity', function(req, res, next) {

})

router.delete('/:id', function(req, res, next) {

})

router.delete('/:id/restaurant', function(req, res, next) {

})

router.delete('/:id/hotel', function(req, res, next) {

})

router.delete('/:id/activity', function(req, res, next) {

})
