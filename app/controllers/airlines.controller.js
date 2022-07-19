const Airline = require("../models/airlines.model.js");
// Create and Save a new Airline
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Airline
  const airline = new Airline({
  
    airline_id : req.body.airline_id,
    airline_name : req.body.airline_name,
    rating : req.body.rating,
    crew : req.body.crew,
    planes : req.body.planes
  });
  // Save airline in the database
  Airline.create(airline, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the airlines."
      });
    
    // else console.log(airline)
    else res.send(airline)
  });
};

exports.findAll = (req, res) => {
    const airline_name = req.query.airline_name;
    Airline.getAll(airline_name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving airlines."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Airline.findById(req.params.id , (err,data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `Not found airline with id ${req.params.id}`
                  })
              }
            else{
              res.status(500).send({
                  message: "Error retrieving airline with id"+ req.params.id
              })
            }
        } else res.send(data);
        
    })
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // console.log(req.body);
    Airline.updateById(
      req.params.id,
      new Airline(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tutorial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Tutorial with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

exports.delete = (req, res) => {
    Airline.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Airline with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Airline with id " + req.params.id
          });
        }
      } else res.send({ message: `Airline was deleted successfully!` });
    });
  };

  
exports.deleteAll = (req, res) => {
    Airline.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all airlines."
        });
      else res.send({ message: `All airlines were deleted successfully!` });
    });
  };
  