const sql = require("./db.js");

const Airline = function(airline) {
    this.airline_id = airline.airline_id;
    this.airline_name = airline.airline_name;
    this.rating = airline.rating;
    this.crew = airline.crew;
    this.planes = airline.planes;
  };
// (admin)
 Airline.create = (newairlines, result)=>{
     sql.query("INSERT INTO ams.airlines SET ?",newairlines, (err,res) =>{
         if(err){
             console.log("error: ",err);
             result(err,null);
            return;
        }


        
        // console.log("airlines: ",res);
        console.log("airlines: ",newairlines);
        result(null,newairlines);
    });
 } 
 // admin & user
 Airline.findById = (airline_id, result) => {
    sql.query(`SELECT * FROM ams.airlines WHERE airline_id = ${airline_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found airlines: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };
//   // admin and user
  Airline.getAll = (airline_name, result) => {
    let query = "SELECT * FROM ams.airlines";
    if (airline_name) {
      query += ` WHERE airline_name LIKE '%${airline_name}%'`;
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
  Airline.updateById = (airline_id, airline, result) => {
    console.log(airline_id)
    sql.query(
      "UPDATE ams.airlines SET airline_name = ?, rating = ?, crew = ?, planes = ? WHERE airline_id = ?",
      [airline.airline_name,airline.rating,airline.crew,airline.planes,airline_id],
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
        console.log("updated airlines: ", airline);
        result(null,airline);
      }
    );
  };
//   //admin
  Airline.remove = (airline_id, result) => {
    sql.query("DELETE FROM ams.airlines WHERE airline_id = ?", airline_id, (err, res) => {
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
      if(res.affectedRows > 0){

        sql.query(`update ams.flights set airline_id = 0 where airline_id = '${airline_id}'`, (err,res) =>{
          if(err){
              console.log("error: ",err);
              result(err,null);
            return;
                }
        });
        sql.query(`update ams.planes set airline_id = 0 where airline_id = '${airline_id}'`, (err,res) =>{
          if(err){
              console.log("error: ",err);
              result(err,null);
            return;
                }
        });
      }
      console.log("deleted airline with id: ",airline_id);
      result(null, res);
    });
  };
//   //admin
  Airline.removeAll = result => {
    sql.query("DELETE FROM ams.airlines", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} airlines`);
      result(null, res);
    });
  };
  module.exports = Airline;

  