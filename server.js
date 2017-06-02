//server.js
var express = require("express"),
	app		= express(),
	http	= require("http"),
	server	= http.createServer(app),
	mongoose = require("mongoose");

app.configure(function	(){
	app.use(express.bodyParser()); //Para parsear JSON
	app.use(express.methodOverride()); //Soporte para protocolo http PUT and DELETE
	app.use(app.router); //Administración de rutas
});

routes = require('./routes/universities')(app);

//Connection with MongoDB
mongoose.connect('mongodb://localhost/universities', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

//Petición GET root show us "Hello"
app.get('/', function(req, res) {
  res.send("Hello");
});

// Server listening at port 3000
server.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});