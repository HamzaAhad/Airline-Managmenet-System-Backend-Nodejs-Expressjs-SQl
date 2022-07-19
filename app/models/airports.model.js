const sql = require("./db.js");

const Airport = function(airport) {
    this.airport_id = airport.airport_id;
    this.airport_name = airport.airport_name;
    this.latitude = airport.latitude;
    this.longitude = airport.longitude;
    this.city_id = airport.city_id;
    this.country = airport.country;
  };
// (admin)
 Airport.create = (newairports, result)=>{
     sql.query("INSERT INTO ams.airports SET ?",newairports, (err,res) =>{
         if(err){
             console.log("error: ",err);
             result(err,null);
            return;
        }
        
        console.log("airlines: ",res);
        result(null,newairports);
    });
 } 
 // admin & user
 Airport.findById = (airport_id, result) => {
    sql.query(`SELECT * FROM ams.airports WHERE airport_id = '${airport_id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found airports: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };
//   // admin and user
Airport.getAll = (airport_name, result) => {
    let query = "SELECT * FROM ams.airports";
    if (airport_name) {
      query += ` WHERE airport_name LIKE '%${airport_name}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("airlines: ", res);
      result(null, res);
    });
  };

// //admin
Airport.updateById = (airport_id, airport, result) => {
    // console.log(airline_id)
    sql.query(
      "UPDATE ams.airports SET airport_name = ?, latitude = ?, longitude = ?, city_id = ?,country = ? WHERE airport_id = ?",
      [airport.airport_name,airport.latitude,airport.longitude,airport.city_id,airport.country,airport.airport_id],
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
        console.log("updated airports: ", airport);
        result(null,airport);
      }
    );
  };
//   //admin
Airport.remove = (airport_id, result) => {
    sql.query("DELETE FROM ams.airports WHERE airport_id = ?", airport_id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found airline with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted airport with id: ",airport_id);
      result(null, res);
    });
  };
//   //admin
Airport.removeAll = result => {
    sql.query("DELETE FROM ams.airports", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} airlines`);
      result(null, res);
    });
  };
  module.exports = Airport;