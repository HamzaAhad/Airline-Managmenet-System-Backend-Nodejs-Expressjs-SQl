const { restart } = require("nodemon");
const sql = require("./db.js");

const Plane = function(plane) {
    this.plane_id = plane.plane_id;
    this.plane_name = plane.plane_name;
    this.capacity = plane.capacity;
    this.airline_id = plane.airline_id;
    this.maintenance_id = plane.maintenance_id;
    
  };
// (admin)
 Plane.create = (newplanes, result)=>{
     sql.query("INSERT INTO ams.planes SET ?",newplanes, (err,res) =>{
         if(err){
             console.log("error: ",err);
             result(err,null);
             return;
        }
        if (res.affectedRows > 0) {
            console.log("updating")
            sql.query(`UPDATE ams.airlines SET ams.airlines.planes = ams.airlines.planes + ${1} where ams.airlines.airline_id = '${newplanes.airline_id}'`,(err,res)=>{
              if(err){
                console.log("error: ",err);
                result(err,null);
                return;
           }
            })
          
          return;
        }
        console.log("planes: ",res);
        result(null,newplanes);
    });
 } 
 // admin & user
 Plane.findById = (plane_id, result) => {
    sql.query(`SELECT * FROM ams.planes WHERE plane_id = '${plane_id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found planes: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };
//   // admin and user
Plane.getAll = (airport_name, result) => {
    let query = "SELECT * FROM ams.planes";
    if (airport_name) {
      query += ` WHERE plane_name LIKE '%${plane_name}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("planes: ", res);
      result(null, res);
    });
  };

// //admin
Plane.updateById = (plane_id, plane, result) => {
    // console.log(airline_id)
    sql.query(
      "UPDATE ams.planes SET plane_name = ?, capacity = ?, airline_id = ?, maintenance_id = ? WHERE plane_id = ?",
      [plane.plane_name,plane.capacity,plane.airline_id,plane.maintenance_id,plane.plane_id],
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
        console.log("updated planes: ", plane);
        result(null,plane);
      }
    );
  };
//   //admin
Plane.remove = (plane_id, result) => {
    sql.query(`DELETE FROM ams.planes WHERE plane_id ='${plane_id}'`, (err, res) => {
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
      if (res.affectedRows > 0){

        sql.query(`UPDATE ams.flights set plane_id = 0 WHERE plane_id = '${plane_id}'`, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      });
    }
    
      console.log("deleted plane with id: ",plane_id);
      result(null, res);
    });
  };
//   //admin
// Plane.removeAll = result => {
//     sql.query("DELETE FROM ams.planes", (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
//       console.log(`deleted ${res.affectedRows} planes`);
//       result(null, res);
//     });
//   };
  module.exports = Plane;