module.exports = app => {
    // const tutorials = require("../controllers/tutorial.controller.js");
    const airport = require("../controllers/airports.controller")
    var router = require("express").Router();
    const {authJwt} = require("../middleware")
    app.use('/api/airports', router,function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    // add a new airport(admin)
    router.post("/",
    // [authJwt.verifyToken, authJwt.isAdmin], 
    airport.create)
    // Retrieve all airports(admin & user)
    router.get("/", 
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    airport.findAll);
 
    // Retrieve a single airport with id(admin & user)
    router.get("/:id", 
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    airport.findOne);
    // Update an airports's detail with id(admin)
    router.put("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    airport.update);
    // Delete a airport with id(admin)
    router.delete("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    airport.delete);
    // Delete all airports(admin)
    router.delete("/", 
    [authJwt.verifyToken, authJwt.isAdmin],
    airport.deleteAll);
    // app.use('/api/airline', router);
  };