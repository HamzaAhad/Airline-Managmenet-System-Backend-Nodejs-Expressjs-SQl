module.exports = app => {
    // const tutorials = require("../controllers/tutorial.controller.js");
    const luggage = require("../controllers/luggage.controller")
    var router = require("express").Router();
    app.use('/api/luggages', router,function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    // Create a new flight(admin)
    router.post("/",
    [authJwt.verifyToken, authJwt.isAdmin], 
    luggage.create)
    // Retrieve all flights(admin & user)
    router.get("/", 
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    luggage.findAll);
    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
    // Retrieve a single airline with id(admin & user)
    router.get("/:id", 
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    luggage.findOne);
    // Update a Tutorial with id(admin)
    router.put("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    luggage.update);
    // Delete a Tutorial with id(admin)
    router.delete("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    luggage.delete);
    // Delete all Tutorials(admin)
    router.delete("/", 
    [authJwt.verifyToken, authJwt.isAdmin],
    luggage.deleteAll);
  };
    // app.use('/api/airline', routeluggage