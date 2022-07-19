module.exports = app => {
    // const tutorials = require("../controllers/tutorial.controller.js");
    const  city= require("../controllers/city.controller")
    var router = require("express").Router();
    const {authJwt} = require("../middleware")
    app.use('/api/city', router,function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    // Create a necity(admin)
    router.post("/",
    [authJwt.verifyToken, authJwt.isAdmin], 
    city.create)
    // Retrieve allcity(admin & user)
    router.get("/", 
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    city.findAll);
   
    // Retrieve a singlecity with id(admin & user)
    router.get("/:id", 
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    city.findOne);
    // Update a city with id(admin)
    router.put("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    city.update);
    // Delete a city with id(admin)
    // router.delete("/:id", 
    // [authJwt.verifyToken, authJwt.isAdmin],
    // city.delete);
    // // Delete all citys(admin)
    // router.delete("/", 
    // [authJwt.verifyToken, authJwt.isAdmin],
    // city.deleteAll);
    // app.use('/api/airline', router);
  };