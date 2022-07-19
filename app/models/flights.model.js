const sql = require("./db.js");

const Flight = function(flight) {
    this.flight_id = flight.flight_id;
    this.airport_id = flight.airport_id;
    this.airline_id = flight.airline_id;
    this.plane_id = flight.plane_id;
    this.route_id = flight.route_id;
    this.dept_time = flight.dept_time;
    this.arrival_time = flight.arrival_time;
    this.date         = flight.date;
    this.occupied     = flight.occupied;
  };
// (admin)
 Flight.create = (newflights, result)=>{
     sql.query("INSERT INTO ams.flights SET ?",newflights, (err,res) =>{
         if(err){
             console.log("error: ",err);
             result(err,null);
            return;
        }
        
        console.log("flights: ",res);
        result(null,newflights);
    });
 } 
 // admin & user
 Flight.findById = (flight_id, result) => {
    sql.query(`SELECT * FROM ams.flights WHERE flight_id = '${flight_id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found flights: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };
//   // admin and user
Flight.getAll = (result) => {
    let query = "SELECT * FROM ams.flights";
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("flights: ", res);
      result(null, res);
    });
  };

// //admin
Flight.updateById = (flight_id, flight, result) => {
    // console.log(airline_id)
    sql.query(
      "UPDATE ams.flights SET  airline_id = ?, plane_id = ?, route_id = ?,dept_time = ? , arrival_time = ?, date=?, occupied = ? WHERE flight_id = ?",
      [flight.airline_id,flight.plane_id,flight.route_id,flight.dept_time,flight.arrival_time,flight.date,flight.occupied,flight_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found airlines with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated flights: ", flight);
        result(null,flight);
      }
    );
  };
//   //admin
Flight.remove = (flight_id, result) => {
    sql.query("DELETE FROM ams.flights WHERE flight_id = ?", flight_id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        
        result({ kind: "not_found" }, null);
        return;
      }
      if (res.affectedRows>0){
        sql.query("UPDATE ams.bookings SET flight_id = 0 WHERE flight_id = ?", flight_id, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
        });

      }
      console.log("deleted flight with id: ",flight_id);
      result(null, res);
    });
  };
//   //admin
Flight.removeAll = result => {
    sql.query("DELETE FROM ams.flights", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} flights`);
      result(null, res);
    });
  };
  module.exports = Flight;