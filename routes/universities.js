module.exports = function(app){

var University = require('../models/university.js');

//GET Method - That Return all Universities in MongoDB
  getAllUnis = function(req, res) {
    console.log("GET - /universities");
  	return University.find(function(err, universities) {
  		if(!err) {
  			return res.send(universities);
  		} else {
        res.statusCode = 500;
  			console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
  		}
  	});
  };

//GET - Return an specific university by Id
  getSpecificUni = function(req, res) {
    console.log("GET - /university/:id");
    return University.findById(req.params.id, function(err, university) {
      if(!university) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        return res.send({ status: 'OK', university:university});
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

//POST - Insert a new university in the DB
  addUniversity = function(req, res) {
    console.log('POST - /university');
    console.log(req.body);

    var university = new University({
      name:    req.body.name, 
      country:    req.body.country,
      location:    req.body.location, 
      adress:   req.body.adress, 
      phone:    req.body.phone,
      email:  req.body.email,
      web:  req.body.web,  
      image: req.body.url_image,
      numcarrers: req.body.num_carrers,
      carrers: req.body.carrers,
    });

    university.save(function(err) {
      if(!err) {
        console.log("University created");
        return res.send({ status: 'OK', university:university });
      } else {
        console.log(err);
        if(err.name == 'ValidationError') {
          res.statusCode = 400;
          res.send({ error: 'Validation error' });
        } else {
          res.statusCode = 500;
          res.send({ error: 'Server error' });
        }
        console.log('Internal error(%d): %s',res.statusCode,err.message);
      }
    });
    res.send(university);
  };

//PUT - Update an University object
  updateUniversity = function(req, res) {
    console.log("PUT - /university/:id");
    console.log(req.body);
    return University.findById(req.params.id, function(err, university) {
      if(!university) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.name != null) university.name = req.body.name;
      if (req.body.country != null) university.country = req.body.country;
      if (req.body.location != null) university.location = req.body.location; 
      if (req.body.adress != null) university.adress = req.body.adress;
      if (req.body.phone != null) university.phone  = req.body.phone;
      if (req.body.email != null) university.email = req.body.email;
      if (req.body.web != null) university.web = req.body.web;
      if (req.body.image != null) university.url_image = req.body.image;
      if (req.body.numcarrers != null) university.numcarrers = req.body.numcarrers;
      if (req.body.carrers != null) university.carrers = req.body.carrers;



      return university.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', university:university });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }
        res.send(university);
      });
    });
  }

//DELETE - Delete an University by Id
  deleteUniversity = function(req, res) {
    console.log("DELETE - /university/:id");
    return University.findById(req.params.id, function(err, university) {
      if(!university) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return university.remove(function(err) {
        if(!err) {
          console.log('Removed university');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }


 //Link routes and functions
  app.get('/universities', getAllUnis);
  app.get('/university/:id', getSpecificUni);
  app.post('/university', addUniversity);
  app.put('/university/:id', updateUniversity);
  app.delete('/university/:id', deleteUniversity);

}

