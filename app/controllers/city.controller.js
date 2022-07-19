const City = require("../models/city.model.js");
// Create and Save a new Airline
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Airline
  const city = new City({
  
    city_id : req.body.city_id,
    city_name : req.body.city_name,
    country : req.body.country,
  });
  // Save airline in the database
  City.create(city, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the citys."
      });
    
    // else console.log(airline)
    else res.send(data)
  });
};

exports.findAll = (req, res) => {
    const city_name = req.query.city_name;
    City.getAll(city_name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving airports."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    City.findById(req.params.id , (err,data) =>{
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
    
    if (!req.body.city_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // console.log(req.body);
    City.updateById(
      req.params.id,
      new City(req.body),
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

// exports.delete = (req, res) => {
//     City.remove(req.params.id, (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found city with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Could not delete city with id " + req.params.id
//           });
//         }
//       } else res.send({ message: `city was deleted successfully!` });
//     });
//   };

  
// exports.deleteAll = (req, res) => {
//     City.removeAll((err, data) => {
//       if (err)
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all citys."
//         });
//       else res.send({ message: `All citys were deleted successfully!` });
//     });
//   };
  