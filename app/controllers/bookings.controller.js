const {Booking,Booking_check} = require("../models/bookings.model.js");

// Create and Save a new Airline
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a booking
  const booking = new Booking({
    // flight_id : req.body.flight_id,
    // airport_id : req.body.airport_id,
    // airline_id : req.body.airline_id,
    // plane_id : req.body.plane_id,
    // route_id : req.body.route_id,
    // dept_time : req.body.dept_time,
    // arrival_time : req.body.arrival_time,
    // date: req.body.date
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    booking_id: req.body.booking_id,
    flight_id: req.body.flight_id,
    date: req.body.date,
    time: req.body.time,
    payment: req.body.payment,
    nic : req.body.nic

  });
  // Create a booking_check
  const booking_check = new Booking_check({
    
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    booking_id: req.body.booking_id,
    nic : req.body.nic

  });
  // Save airline in the database
  Booking.create(booking, (err, data) => {
    console.log("data",data)
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the bookings."
      });
    
    else res.send(data)
  });
};

exports.findAll = (req, res) => {
    const booking_name = req.query.booking_name;
    Booking.getAll(booking_name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving bookings."
        });
      else res.send(data);
    }); 
  };

  exports.findOneByAdmin = (req, res) => {
    Booking.findByIdByAdmin(req.params.id , (err,data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `Not found booking with id ${req.params.id}`
                  })
              }
            else{
              res.status(500).send({
                  message: "Error retrieving booking with id"+ req.params.id
              })
            }
        } else res.send(data);
        
    })
};

exports.findOneByUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Booking_check.findByIdByUser(req.params.id ,
    new Booking_check(req.body),
    (err,data) =>{
      if(err){
          if(err.kind === "not_found"){
              res.status(404).send({
                  message : `Not found booking with id ${req.params.id}`
                })
            }
          else{
            res.status(500).send({
                message: "Error retrieving booking with id"+ req.params.id
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
    Booking.updateById(
      req.params.id,
      new Booking_check(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found booking with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating booking with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

exports.deleteByAdmin = (req, res) => {
    Booking.removeByAdmin(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found booking with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete booking with id " + req.params.id
          });
        }
      } else res.send({ message: `booking was deleted successfully!` });
    });
  };

  exports.deleteByUser = (req, res) => {
    console.log(req.body)

    if (req.body.booking_id===undefined) {
      console.log("yes")
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    Booking_check.removeByUser(req.params.id,
      new Booking_check(req.body),
      (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found booking with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete booking with id " + req.params.id
          });
        }
      } else res.send({ message: `booking was deleted successfully!` });
    });
  };

  
exports.deleteAll = (req, res) => {
    Booking.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all bookings."
        });
      else res.send({ message: `All bookings were deleted successfully!` });
    });
  };
  