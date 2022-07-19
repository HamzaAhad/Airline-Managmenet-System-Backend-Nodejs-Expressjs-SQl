const Runway = require("../models/runway.model.js");
// Create and Save a new Airline
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Airline
  const runway = new Runway({
  
    airport_id : req.body.airport_id,
    length : req.body.length,
    total_landing : req.body.total_landing,
    perfect_landing : req.body.perfect_landing,
    crash_landing : req.body.crash_landing
  });
  // Save airline in the database
  Runway.create(runway, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the runways."
      });
    
    // else console.log(airline)
    else res.send(data)
  });
};

exports.findAll = (req, res) => {
    const runway_name = req.query.runway_name;
    Runway.getAll(runway_name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving runways."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Runway.findById(req.params.id , (err,data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `Not found runway with id ${req.params.id}`
                  })
              }
            else{
              res.status(500).send({
                  message: "Error retrieving runway with id"+ req.params.id
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
    Runway.updateById(
      req.params.id,
      new Runway(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found runway with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating runway with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

exports.delete = (req, res) => {
    Runway.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found runway with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete runway with id " + req.params.id
          });
        }
      } else res.send({ message: `runway was deleted successfully!` });
    });
  };

  
exports.deleteAll = (req, res) => {
    Runway.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all runways."
        });
      else res.send({ message: `All runways were deleted successfully!` });
    });
  };
  