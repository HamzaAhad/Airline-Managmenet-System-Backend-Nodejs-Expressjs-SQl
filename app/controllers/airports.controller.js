const Airport = require("../models/airports.model.js");
// Create and Save a new Airline
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Airline
  const airport = new Airport({
  
    airport_id : req.body.airport_id,
    airport_name : req.body.airport_name,
    latitude : req.body.latitude,
    longitude : req.body.longitude,
    city_id : req.body.city_id,
    country : req.body.country
  });
  // Save airline in the database
  Airport.create(airport, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the airports."
      });
    
    // else console.log(airline)
    else res.send(data)
  });
};

exports.findAll = (req, res) => {
    const airport_name = req.query.airport_name;
    Airport.getAll(airport_name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving airports."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Airport.findById(req.params.id , (err,data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `Not found airport with id ${req.params.id}`
                  })
              }
            else{
              res.status(500).send({
                  message: "Error retrieving airport with id"+ req.params.id
              })
            }
        } else res.send(data);
        
    })
};

exports.update = (req, res) => {
    // Validate Request
    
    if (!req.body.airport_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // console.log(req.body);
    Airport.updateById(
      req.params.id,
      new Airport(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Airport with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Airport with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

exports.delete = (req, res) => {
    Airport.remove(req.body.airport_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Airport with id ${req.body.airport_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Airport with id " + req.body.airport_id
          });
        }
      } else res.send({ message: `Airport was deleted successfully!` });
    });
  };

  
exports.deleteAll = (req, res) => {
    Airport.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all airports."
        });
      else res.send({ message: `All airports were deleted successfully!` });
    });
  };
  