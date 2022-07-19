const Flight = require("../models/flights.model.js");
// Create and Save a new Airline
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Airline
  const flight = new Flight({
  
    flight_id : req.body.flight_id,
    airport_id : req.body.airport_id,
    airline_id : req.body.airline_id,
    plane_id : req.body.plane_id,
    route_id : req.body.route_id,
    dept_time : req.body.dept_time,
    arrival_time : req.body.arrival_time,
    date         : req.body.date,
    occupied     : req.body.occupied
  });
  // Save airline in the database
  Flight.create(flight, (err, data) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the flights."
      });
    
    // else console.log(airline)
    else res.send(data)
  });
};

exports.findAll = (req, res) => {
    // const flight_name = req.query.flight_name;
    Flight.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving flights."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Flight.findById(req.params.id , (err,data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `Not found flight with id ${req.params.id}`
                  })
              }
            else{
              res.status(500).send({
                  message: "Error retrieving flight with id"+ req.params.id
              })
            }
        } else res.send(data);
        
    })
};

exports.update = (req, res) => {
    // Validate Request
    
    if (!req.body.flight_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // console.log(req.body);
    Flight.updateById(
      req.params.id,
      new Flight(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found flight with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating flight with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

exports.delete = (req, res) => {
    Flight.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found flight with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete flight with id " + req.params.id
          });
        }
      } else res.send({ message: `flight was deleted successfully!` });
    });
  };

  
exports.deleteAll = (req, res) => {
    Flight.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all flights."
        });
      else res.send({ message: `All flights were deleted successfully!` });
    });
  };