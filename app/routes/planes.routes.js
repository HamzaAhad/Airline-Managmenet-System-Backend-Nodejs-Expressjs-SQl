module.exports = app => {
    // const tutorials = require("../controllers/tutorial.controller.js");
    const {authJwt} = require("../middleware")
    const plane = require("../controllers/planes.controller")
    var router = require("express").Router();
    app.use('/api/planes', router,function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    // add new plane(admin)
    router.post("/",
    [authJwt.verifyToken, authJwt.isAdmin], 
    plane.create)
    // Retrieve all plane(admin & user)
    router.get("/", 
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    plane.findAll);
    
    // Retrieve a single plane with id(admin & user)
    router.get("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    plane.findOne);
    // Update a plane with id(admin)
    router.put("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    plane.update);
    // Delete a plane with id(admin)
    router.delete("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    plane.delete);
    // Delete all planes(admin)
    // router.delete("/", 
    // [authJwt.verifyToken, authJwt.isAdmin],
    // plane.deleteAll);
    // app.use('/api/airline', router);
  };