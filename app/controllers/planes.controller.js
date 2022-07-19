const Plane = require("../models/plane.model.js");
// Create and Save a new Airline
exports.create = (req, res) => {
   // Validate request
   if (req.body.plane_id === undefined) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Airline
  const plane = new Plane({
  
    "plane_id" : req.body.plane_id,
    "plane_name" : req.body.plane_name,
    "capacity" : req.body.capacity,
    "airline_id" : req.body.airline_id,
    "maintenance_id" : req.body.maintenance_id || `test-${req.body.plane_id}`,
  });
  // Save airline in the database
  Plane.create(plane, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the planes."
      });
    
    // else console.log(airline)
    else res.send(data)
  });        
};

exports.findAll = (req, res) => {
    const plane_name = req.query.plane_name;
    Plane.getAll(plane_name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving planes."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Plane.findById(req.params.id , (err,data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `Not found plane with id ${req.params.id}`
                  })
              }
            else{
              res.status(500).send({
                  message: "Error retrieving plane with id"+ req.params.id
              })
            }
        } else res.send(data);
        
    })
};

exports.update = (req, res) => {
    // Validate Request
    
    if (!req.body.plane_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // console.log(req.body);
    Plane.updateById(
      req.params.id,
      new Plane(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found plane with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating plane with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

exports.delete = (req, res) => {
    Plane.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Airport with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete plane with id " + req.params.id
          });
        }
      } else res.send({ message: `plane was deleted successfully!` });
    });
  };

  
exports.deleteAll = (req, res) => {
    Plane.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all planes."
        });
      else res.send({ message: `All planes were deleted successfully!` });
    });
  };