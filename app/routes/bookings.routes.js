const booking = require("../controllers/bookings.controller");
const { authJwt } = require("../middleware");
var router = require("express").Router();
module.exports = app => {
    // const tutorials = require("../controllers/tutorial.controller.js");
    app.use('/api/bookings', router,function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    // Create a new booking(admin)
    router.post("/",
    [authJwt.verifyToken,authJwt.isUserOrAdmin],
      //  [authJwt.isUser], 
    booking.create)
    // Retrieve all bookings(admin)
    router.get("/", 
    [authJwt.verifyToken, authJwt.isAdmin],
    booking.findAll);
    
    // Retrieve a single booking with id(admin)(since admin can retrive just by providing id where as user will have to provide relative data)
    router.get("/admin/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    booking.findOneByAdmin);

    //user
    router.get("/user/:id", 
    [authJwt.verifyToken, authJwt.isUser],
    booking.findOneByUser);


    // Update a booking with id(admin) (no update )
    router.put("/:id", 
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    booking.update);
    // Delete a booking with id(admin)
    router.delete("/admin/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    booking.deleteByAdmin);

    // Delete a booking with id(user)(same logic as of getting by id)
    router.delete("/user/:id", 
    [authJwt.verifyToken, authJwt.isUser],
    booking.deleteByUser);
    // Delete all bookings(admin)
    router.delete("/", 
    [authJwt.verifyToken, authJwt.isAdmin],
    booking.deleteAll);
    // app.use('/api/airline', router);
  };