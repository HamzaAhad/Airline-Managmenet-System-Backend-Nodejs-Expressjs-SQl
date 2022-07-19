const sql = require("./db.js");

const Department = function(department) {
    this.department_id = department.department_id;
    this.department_name = department.department_name;
    this.no_of_employees = department.no_of_employees;
   
  };
// (admin)
 Department.create = (newdepartments, result)=>{
     sql.query("INSERT INTO ams.departments SET ?",newdepartments, (err,res) =>{
         if(err){
             console.log("error: ",err);
             result(err,null);
            return;
        }
        
        else{

            result(null,newdepartments);
        }
    });
 } 
 // admin & user
 Department.findById = (department_id, result) => {
    sql.query(`SELECT * FROM ams.departments WHERE department_id = '${department_id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found departments: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };
//   // admin and user
Department.getAll = (department_name, result) => {
    let query = "SELECT * FROM ams.departments";
    if (department_name) {
      query += ` WHERE department_name LIKE '%${department_name}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("departments: ", res);
      result(null, res);
    });
  };

// //admin
Department.updateById = (department_id, department, result) => {
    // console.log(airline_id)
    sql.query(
      "UPDATE ams.departments SET department_name = ?, no_of_employees = ? WHERE department_id = ?",
      [department.department_name,department.no_of_employees,department.department_id],
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
        console.log("updated departments: ", department);
        result(null,department);
      }
    );
  };
//   //admin
Department.remove = (department_id, result) => {
    sql.query("DELETE FROM ams.departments WHERE department_id = ?", department_id, (err, res) => {
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
      console.log("deleted department with id: ",department_id);
      result(null, res);
    });
  };
//   //admin
// Department.removeAll = result => {
//     sql.query("DELETE FROM ams.departments", (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
//       console.log(`deleted ${res.affectedRows} departments`);
//       result(null, res);
//     });
//   };
  module.exports = Department;