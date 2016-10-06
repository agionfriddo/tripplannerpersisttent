/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');

var Day = db.define('day', {
	number: {
		type: Sequelize.INTEGER,
    defaultValue: null
		// set: function() {
  //     console.log("THIS COUNT", this.count())
  //     this.count()
  //   }
	}
}, {
	hooks: {
		beforeCreate: function(day) {
			Day.count()
				.then(function(count) {
          day.number = count
				})
			}
		}
})



module.exports = Day;
