const airline = require("../controllers/airlines.controller.js");
const { authJwt } = require("../middleware");
var router = require("express").Router();
module.exports = app => {
    app.use('/api/airline', router,function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //TESTED;
    // Create a neairline(admin)
    router.post("/",
    [authJwt.verifyToken, authJwt.isAdmin],
    airline.create)
    // // Retrieve alairlines(admin & user)
    router.get("/",
     [authJwt.verifyToken, authJwt.isUserOrAdmin],
     
    airline.findAll);

    
    
    // // Retrieve a single airline with id(admin & user)
    router.get("/:id",
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    airline.findOne);
    // // Update a airline with id(admin)
    router.put("/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
     airline.update);
    // // Delete a airline with id(admin)
    router.delete("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    airline.delete);
    // // Delete all airlines(admin)
    router.delete("/", 
    [authJwt.verifyToken, authJwt.isAdmin],
    airline.deleteAll);
    // app.use('/api/airline', router);
  };

  // app.use(function(req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });