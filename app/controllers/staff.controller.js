const Staff = require("../models/staff.model.js");
// Create and Save a new Airline
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Airline
  const staff = new Staff({
  
    first_name: req.body.first_name,
    last_name : req.body.last_name,
    staff_id : req.body.staff_id,
    airport_id : req.body.airport_id,
    dept_id : req.body.dept_id,
    designation : req.body.designation,
    salary: req.body.salary,
    age: req.body.age
  });
  // Save airline in the database
  Staff.create(staff, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the staffs."
      });
    
    // else console.log(airline)
    else res.send(data)
  });
};

exports.findAll = (req, res) => {
    const staff_name = req.query.staff_name;
    Staff.getAll(staff_name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving staffs."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Staff.findById(req.params.id , (err,data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `Not found staff with id ${req.params.id}`
                  })
              }
            else{
              res.status(500).send({
                  message: "Error retrieving staff with id"+ req.params.id
              })
            }
        } else res.send(data);
        
    })
};

exports.update = (req, res) => {
    // Validate Request
    
    if (!req.body.staff_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // console.log(req.body);
    Staff.updateById(
      req.params.id,
      new Staff(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found staff with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating staff with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

exports.delete = (req, res) => {
    Staff.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found staff with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete staff with id " + req.params.id
          });
        }
      } else res.send({ message: `staff was deleted successfully!` });
    });
  };

  
// exports.deleteAll = (req, res) => {
//     Airport.removeAll((err, data) => {
//       if (err)
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all airports."
//         });
//       else res.send({ message: `All airports were deleted successfully!` });
//     });
//   };
  