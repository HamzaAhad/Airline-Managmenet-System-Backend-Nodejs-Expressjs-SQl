const runway = require("../controllers/runway.controller.js");
const { authJwt } = require("../middleware");
var router = require("express").Router();
module.exports = app => {
    app.use('/api/runway', router,function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //TESTED;
    // Create a new ranway(admin)
    router.post("/",
    [authJwt.verifyToken, authJwt.isAdmin],
    runway.create)
    // // Retrieve all ranways(admin & user)
    router.get("/",
     [authJwt.verifyToken, authJwt.isUserOrAdmin],
    runway.findAll);

    
    
    // // Retrieve a single ranway with id(admin & user)
    router.get("/:id",
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    runway.findOne);
    // // Update a ranway with id(admin)
    router.put("/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
     runway.update);
    // // Delete a ranway with id(admin)
    router.delete("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    runway.delete);
    // // Delete all ranways(admin)
    router.delete("/", 
    [authJwt.verifyToken, authJwt.isAdmin],
    runway.deleteAll);
    // app.use('/api/airline', router);
  };
