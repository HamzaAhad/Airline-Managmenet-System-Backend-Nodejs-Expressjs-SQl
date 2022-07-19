const sql = require("./db.js"); 

const Runway = function(runway) {
    this.airline_id = runway.airline_id;
    this.airline_name = runway.airline_name;
    this.rating = runway.rating;
    this.crew = runway.crew;
    this.planes = runway.planes;
  };
// (admin)
 Runway.create = (newrunways, result)=>{
     sql.query("INSERT INTO ams.runway SET ?",newrunways, (err,res) =>{
         if(err){
             console.log("error: ",err);
             result(err,null);
            return;
        }


        
        // console.log("airlines: ",res);
        console.log("airlines: ",newrunways);
        result(null,newrunways);
    });
 } 
 // admin & user
 Runway.findById = (runway_id, result) => {
    sql.query(`SELECT * FROM ams.runway WHERE runway_id = '${runway_id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found runways: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };
//   // admin and user
  Runway.getAll = (runway_name, result) => {
    let query = "SELECT * FROM ams.runway";
    if (runway_name) {
      query += ` WHERE runway_name LIKE '%${runway_name}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("runways: ", res);
      result(null, res);
    });
  };

// //admin
  Runway.updateById = (runway_id, runway, result) => {
    console.log(airline_id)
    sql.query(
      "UPDATE ams.runway SET runway_name = ?, rating = ?, crew = ?, planes = ? WHERE runway_id = ?",
      [runway.airline_name,runway.rating,runway.crew,runway.planes,runway_id],
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
        console.log("updated airlines: ", runway);
        result(null,runway);
      }
    );
  };
//   //admin
  Runway.remove = (runway_id, result) => {
    sql.query("DELETE FROM ams.runway WHERE runway_id = ?", runway_id, (err, res) => {
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

        sql.query(`update ams.flights set runway_id = 0 where runway_id = '${runway_id}'`, (err,res) =>{
          if(err){
              console.log("error: ",err);
              result(err,null);
            return;
                }
        });
        sql.query(`update ams.planes set runway_id = 0 where runway_id = '${runway_id}'`, (err,res) =>{
          if(err){
              console.log("error: ",err);
              result(err,null);
            return;
                }
        });
      }
      console.log("deleted runway with id: ",runway_id);
      result(null, res);
    });
  };
//   //admin
  Runway.removeAll = result => {
    sql.query("DELETE FROM ams.runway", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} runway`);
      result(null, res);
    });
  };
  module.exports = Runway;