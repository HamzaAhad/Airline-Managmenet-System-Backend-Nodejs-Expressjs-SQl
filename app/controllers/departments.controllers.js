const Department = require("../models/departments.model.js");
// Create and Save a new Airline
exports.create = (req, res) => {
   // Validate request
   if (req.body.department_id === undefined) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Airline
  const department = new Department({
  
    department_id : req.body.department_id,
    department_name : req.body.department_name,
    no_of_employees : req.body.no_of_employees
     
  });
  // Save department in the database
  Department.create(department, (err, data) => {

    if (err){

        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the departments."
        });
        return;
    }
    
    // else console.log(airline)
    else res.send(data)
  });
};

exports.findAll = (req, res) => {
    const department_name = req.query.department_name;
    Department.getAll(department_name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving departments."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Department.findById(req.params.id , (err,data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `Not found department with id ${req.params.id}`
                  })
              }
            else{
              res.status(500).send({
                  message: "Error retrieving department with id"+ req.params.id
              })
            }
        } else res.send(data);
        
    })
};

exports.update = (req, res) => {
    // Validate Request
    
    if (!req.params.id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // console.log(req.body);
    Department.updateById(
      req.params.id,
      new Department(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found department with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating department with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

exports.delete = (req, res) => {
    Department.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found department with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete department with id " + req.params.id
          });
        }
      } else res.send({ message: `department was deleted successfully!` });
    });
  };

  
// exports.deleteAll = (req, res) => {
//     Department.removeAll((err, data) => {
//       if (err)
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all departments."
//         });
//       else res.send({ message: `All departments were deleted successfully!` });
//     });
//   };
  