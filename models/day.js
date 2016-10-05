/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');

var Day = db.define('day', {
	number: {
		type: Sequelize.INTEGER
		// set: function(val) {
		// 	console.log('val', val)
		// 	if (val === undefined) {
		// 		this.number = 0
		// 	} else {
		// 		this.number++
		// 	}
		// }
	}
}, {
	hooks: {
		beforeValidate: function(day) {
			console.log('dayvalue', day.number)
			console.log('thisval', this.number)
			this.count()
				.then(function(val) {
					if(val === 0) {
						this.number = 1;
					} else {
						this.number = val+1
					}
					//this.number.setDataValue(val + 1)});
				})
			}
		}
})



module.exports = Day;