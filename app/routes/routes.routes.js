const route = require("../controllers/routes.controller.js");
const { authJwt } = require("../middleware");
var router = require("express").Router();
module.exports = app => {
    app.use('/api/routes', router,function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //TESTED;
    // Create a n routese(admin)
    router.post("/",
    [authJwt.verifyToken, authJwt.isAdmin],
     route.create)
    // // Retrieve al routess(admin & user)
    router.get("/",
     [authJwt.verifyToken, authJwt.isUserOrAdmin],
     route.findAll);

    
    
    // // Retrieve a single  routes with id(admin & user)
    router.get("/:id",
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
     route.findOne);
    // // Update a  routes with id(admin)
    router.put("/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
      route.update);
    // // Delete a  routes with id(admin)
    router.delete("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
     route.delete);
    // // Delete all  routess(admin)
    router.delete("/", 
    [authJwt.verifyToken, authJwt.isAdmin],
     route.deleteAll);
    // app.use('/api/airline', router);
  };