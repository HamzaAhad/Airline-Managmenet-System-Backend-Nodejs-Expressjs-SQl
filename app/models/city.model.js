const sql = require("./db.js");

const   City = function(city) {
    this.city_id = city.city_id;
    this.city_name = city.city_name;
    this.country = city.country;
}
// (admin)
    City.create = (newcities, result)=>{
     sql.query("INSERT INTO ams.city SET ?",newcities, (err,res) =>{
         if(err){
             console.log("error: ",err);
             result(err,null);
            return;
        }
        
        console.log("citys: ",res);
        result(null,newcities);
    });
 } 
 // admin & user
    City.findById = (city_id, result) => {
    sql.query(`SELECT * FROM ams.city WHERE city_id = '${city_id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found cities: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };
//   // admin and user
    City.getAll = (city_name, result) => {
    let query = "SELECT * FROM ams.city";
    if (city_name) {
      query += ` WHERE city_name LIKE '%${city_name}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("citys: ", res);
      result(null, res);
    });
  };

// //admin
    City.updateById = (city_id, city, result) => {
    // console.log(airline_id)
    sql.query(
      "UPDATE ams.city SET city_name = ?, country = ? WHERE city_id = ?",
      [city.city_name,city.country,city.city_id],
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
        console.log("updated citiess: ", city);
        result(null,city);
      }
    );
  };
//   //admin
//     City.remove = (city_id, result) => {
//     sql.query("DELETE FROM ams.city WHERE city_id = ?", city_id, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
//       if (res.affectedRows == 0) {
//         // not found airline with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }
//       console.log("deleted city with id: ",city_id);
//       result(null, res);
//     });
//   };
// //   //admin
//     City.removeAll = result => {
//     sql.query("DELETE FROM ams.city", (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
//       console.log(`deleted ${res.affectedRows} citys`);
//       result(null, res);
//     });
//   };
  module.exports =City;