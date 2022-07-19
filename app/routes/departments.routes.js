module.exports = app => {
    // const tutorials = require("../controllers/tutorial.controller.js");
    const department = require("../controllers/departments.controllers")
    var router = require("express").Router();
    const {authJwt} = require("../middleware")
    app.use('/api/departments', router,function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    // Create a new department(admin)
    router.post("/",
    [authJwt.verifyToken, authJwt.isAdmin], 
    department.create)
    // Retrieve all departments(admin & user)
    router.get("/", 
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    department.findAll);
   
    // Retrieve a singledepartment with id(admin & user)
    router.get("/:id", 
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    department.findOne);
    // Update a department with id(admin)
    router.put("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    department.update);
    // Delete a department with id(admin)
    router.delete("/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    department.delete);
    // Delete all departments(admin)
    // router.delete("/", 
    // [authJwt.verifyToken, authJwt.isAdmin],
    // department.deleteAll);
    // app.use('/api/airline', router);
  };