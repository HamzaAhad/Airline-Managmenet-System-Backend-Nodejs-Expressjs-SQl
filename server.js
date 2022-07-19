const express = require("express");
const cors = require("cors");
// const connection = require("./app/models/db");
// const dbConfig = require("./app/config/db.config");
// const { DB } = require("./app/config/db.config");
const app = express();





var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//change
const db = require("./app/models");
const Role = db.role;
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });


function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
// simple route
app.get("/", (req, res) => {
    
      // const sqlInsert = "INSERT INTO tutorials.tutorial (id,title,description,published) values (6,'test1','test1','test1');" 
      // connection.query(sqlInsert, (err,result) => {

      //   console.log(err)
      //   console.log(result)
      // })
      res.json({ message: "Welcome to ams application." });
    
});
// require("./app/routes/tutorial.routes.js")(app);
require("./app/routes/airlines.routes.js")(app);
require("./app/routes/bookings.routes.js")(app);
require("./app/routes/airports.routes.js")(app);
require("./app/routes/flights.routes.js")(app);
require("./app/routes/planes.routes.js")(app);
require("./app/routes/city.routes.js")(app);
require("./app/routes/departments.routes.js")(app);
require("./app/routes/staff.routes.js")(app);
require("./app/routes/routes.routes.js")(app);
require("./app/routes/runway.routes.js")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});