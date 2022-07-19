const sql = require("./db.js");

const Staff = function(staff) {

    this.first_name = staff.first_name,
    this.last_name  = staff.last_name,
    this.staff_id  = staff.staff_id,
    this.airport_id  = staff.airport_id,
    this.dept_id  = staff.dept_id,
    this.designation  = staff.designation,
    this.salary = staff.salary,
    this.age = staff.age
  };
// (admin)
 Staff.create = (newstaffs, result)=>{
     sql.query("INSERT INTO ams.staff SET ?",newstaffs, (err,res) =>{
         if(err){
             console.log("error: ",err);
             result(err,null);
            return;
        }
        
        console.log("staffs: ",res);
        result(null,newstaffs);
    });
 } 
 // admin & user
 Staff.findById = (staff_id, result) => {
    sql.query(`SELECT * FROM ams.staff WHERE staff_id = '${staff_id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found staffs: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };
//   // admin and user
Staff.getAll = (staff_name, result) => {
    let query = "SELECT * FROM ams.staff";
    if (staff_name) {
      query += ` WHERE staff_name LIKE '%${staff_name}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("staffs: ", res);
      result(null, res);
    });
  };

// //admin
Staff.updateById = (staff_id, staff, result) => {
    // console.log(airline_id)
    sql.query(
      "UPDATE ams.staff SET first_name = ? , last_name = ? , airport_id = ? , dept_id = ? , designation = ? , salary = ? , age = ?  WHERE staff_id = ?",
      [staff.first_name,staff.last_name,staff.airport_id,staff.dept_id,staff.designation,staff.salary,staff.age,staff.staff_id],
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
        console.log("updated staffs: ", staff);
        result(null,staff);
      }
    );
  };
//   //admin
Staff.remove = (staff_id, result) => {
    sql.query("DELETE FROM ams.staff WHERE staff_id = ?", staff_id, (err, res) => {
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
      console.log("deleted staff with id: ",staff_id);
      result(null, res);
    });
  };
//   //admin
Staff.removeAll = result => {
    sql.query("DELETE FROM ams.staff", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} staffs`);
      result(null, res);
    });
  };
  module.exports = Staff;