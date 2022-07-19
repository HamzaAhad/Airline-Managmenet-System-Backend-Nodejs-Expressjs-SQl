const sql = require("./db.js");

const Routes = function(route) {
    this.route_id = route.route_id;
    this.from_city_id = route.from_city_id;
    this.to_city_id = route.to_city_id;
    this.duration = route.duration;

  };
// (admin)
 Routes.create = (newroutes, result)=>{
     sql.query("INSERT INTO ams.routes SET ?",newroutes, (err,res) =>{
         if(err){
             console.log("error: ",err);
             result(err,null);
            return;
        }


        
        // console.log("airlines: ",res);
        console.log("routes: ",newroutes);
        result(null,newroutes);
    });
 } 
 // admin & user
 Routes.findById = (route_id, result) => {
    sql.query(`SELECT * FROM ams.routes WHERE route_id = '${route_id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found routes: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };
//   // admin and user
  Routes.getAll = (airline_name, result) => {
    let query = "SELECT * FROM ams.routes";
    if (airline_name) {
      query += ` WHERE route_name LIKE '%${route_name}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("routes: ", res);
      result(null, res);
    });
  };

// //admin
  Routes.updateById = (route_id, route, result) => {
    console.log("FR",route)
    sql.query(
      "UPDATE ams.routes SET from_city_id = ? , to_city_id = ? , duration = ?  WHERE route_id = ?",
      [route.from_city_id,route.to_city_id,route.duration,route.route_id],
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
        console.log("updated routes: ", route);
        result(null,route);
      }
    );
  };
//   //admin
  Routes.remove = (route_id, result) => {
    sql.query("DELETE FROM ams.routes WHERE route_id = ?", route_id, (err, res) => {
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

        sql.query(`update ams.flights set route_id = 0 where route_id = '${route_id}'`, (err,res) =>{
          if(err){
              console.log("error: ",err);
              result(err,null);
              return;
                }
        });

      }
      console.log("deleted route with id: ",route_id);
      result(null, res);
    });
  };
//   //admin
  Routes.removeAll = result => {
    sql.query("DELETE FROM ams.routes", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} routes`);
      result(null, res);
    });
  };
  module.exports = Routes;
