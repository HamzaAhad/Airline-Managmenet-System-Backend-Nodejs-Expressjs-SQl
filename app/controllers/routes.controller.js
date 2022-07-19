const Routes = require("../models/routes.model.js");
// Create and Save a new Airline
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a route
  const route = new Routes({
  
    route_id : req.body.route_id,
    from_city_id : req.body.from_city_id,
    to_city_id : req.body.to_city_id,
    duration : req.body.duration
  });
  // Save airline in the database
  Routes.create(route, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the routes."
      });
    
    // else console.log(airline)
    else res.send(route)
  });
};

exports.findAll = (req, res) => {
    const route_name = req.query.route_name;
    Routes.getAll(route_name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving routes."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Routes.findById(req.params.id , (err,data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `Not found route with id ${req.params.id}`
                  })
              }
            else{
              res.status(500).send({
                  message: "Error retrieving route with id"+ req.params.id
              })
            }
        } else res.send(data);
        
    })
};

exports.update = (req, res) => {
    // Validate Request
    console.log("updating....")
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // console.log(req.body);
    Routes.updateById(
      req.params.id,
      new Routes(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Troute with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Troute with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

exports.delete = (req, res) => {
    Routes.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found route with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete route with id " + req.params.id
          });
        }
      } else res.send({ message: `route was deleted successfully!` });
    });
  };

  
exports.deleteAll = (req, res) => {
    Routes.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all routes."
        });
      else res.send({ message: `All routes were deleted successfully!` });
    });
  };
  