module.exports = app => {
    // const tutorials = require("../controllers/tutorial.controller.js");
    const passenger = require("../controllers/passengers.controller")
    var router = require("express").Router();
    app.use('/api/passengers', router,function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    // Create a new flight(admin)
    router.post("/",
    [authJwt.verifyToken, authJwt.isAdmin], 
    passenger.create)
    // Retrieve all flights(admin & user)
    router.get("/", 
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    passenger.findAll);
    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
    // Retrieve a single airline with id(admin & user)
    router.get("/:id", 
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    passenger.findOne);
    // Update a Tutorial with id(admin)
    router.put("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    passenger.update);
    // Delete a Tutorial with id(admin)
    router.delete("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    passenger.delete);
    // Delete all Tutorials(admin)
    router.delete("/", 
    [authJwt.verifyToken, authJwt.isAdmin],
    passenger.deleteAll);
    // app.use('/api/airline', router);
  };