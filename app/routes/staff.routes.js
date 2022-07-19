const { authJwt } = require("../middleware");

module.exports = app => {
    // const tutorials = require("../controllers/tutorial.controller.js");
    const staff = require("../controllers/staff.controller")
    var router = require("express").Router();
    const {authJwt} = require("../middleware")
    app.use('/api/staff', router,function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    // Create a ne staff(admin)
    router.post("/",
    [authJwt.verifyToken, authJwt.isAdmin], 
    staff.create)
    // Retrieve al staffs(admin & user)
    router.get("/", 
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    staff.findAll);
 
    router.get("/:id", 
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    staff.findOne);
    // Update a  staff with id(admin)
    router.put("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    staff.update);
    // Delete a  staff with id(admin)
    router.delete("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    staff.delete);
    // // Delete all Tutorials(admin)
    // router.delete("/", 
    // [authJwt.verifyToken, authJwt.isAdmin],
    // staff.deleteAll);
    
  };