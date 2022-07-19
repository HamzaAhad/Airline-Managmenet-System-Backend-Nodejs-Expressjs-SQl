module.exports = app => {
  // const tutorials = require("../controllers/tutorial.controller.js");
  const flight = require("../controllers/flights.controllers")
  var router = require("express").Router();
  const {authJwt} = require("../middleware")
  app.use('/api/flights', router,function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Create a new flight(admin)
  router.post("/",
  [authJwt.verifyToken, authJwt.isAdmin], 
  flight.create)
  // Retrieve all flights(admin & user)
  router.get("/", 
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  flight.findAll);
  // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);
  // Retrieve a single airline with id(admin & user)
  router.get("/:id", 
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  flight.findOne);
  // Update a Tutorial with id(admin)
  router.put("/:id", 
  [authJwt.verifyToken, authJwt.isAdmin],
  flight.update);
  // Delete a Tutorial with id(admin)
  router.delete("/:id", 
  [authJwt.verifyToken, authJwt.isAdmin],
  flight.delete);
  // Delete all Tutorials(admin)
  router.delete("/", 
  [authJwt.verifyToken, authJwt.isAdmin],
  flight.deleteAll);
  // app.use('/api/airline', router);
};