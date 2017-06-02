var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var University = new Schema({
	name: 	{ type: String, require: true},
	country: { type: String, require: true},
	location: { type: String, require: true},
	adress: { type: String, require: true},
	phone: { type: String, require: true},
	email: { type: String, require: true},
	web: { type: String, require: true},
	image: { type: String, require: true},
	numcarrers: { type: String, require: true},
	carrers:[{
		asignatures:{type: String, default: "0"},
		duration:{type: String, default: "none"},
		carrer:{type: String,default: null},
	}]
});

module.exports = mongoose.model('University', University);


