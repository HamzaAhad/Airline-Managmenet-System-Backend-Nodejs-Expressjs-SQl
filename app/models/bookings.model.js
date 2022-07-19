const sql = require("./db.js");

const Booking = function(booking) {
  this.first_name= booking.first_name,
  this.last_name= booking.last_name,
  this.booking_id= booking.booking_id,
  this.flight_id= booking.flight_id,
  this.date= booking.date,
  this.time= booking.time,
  this.payment= booking.payment,
  this.nic = booking.nic
  };

const Booking_check = function(booking_check){
  this.first_name= booking_check.first_name,
  this.last_name= booking_check.last_name,
  this.booking_id= booking_check.booking_id,
  this.nic = booking_check.NIC
}

// (admin)
 Booking.create = (newbooking, result)=>{
    console.log("test-101");
    sql.query("SELECT ams.planes.capacity,ams.flights.occupied FROM ams.planes INNER JOIN ams.flights ON ams.planes.plane_id =(select ams.planes.plane_id from ams.flights where ams.flights.flight_id = ?);",[newbooking.flight_id],(err,res)=>{
           if(err){
            //  console.log("error: ",err);
             result(err,null);
            return;
          }

          let capacity = res[0].capacity
          let occupied = res[0].occupied
          // console.log("ans:",res)
          // console.log("capacity:",capacity)
          // console.log("occupied:",occupied)
          
          if (capacity>occupied){

                    sql.query("INSERT INTO ams.bookings SET ?",newbooking, (err,res) =>{
                    if(err){
                        console.log("error: ",err);
                        result(err,null);
                        return;
                    }
                    // console.log("response:",res);
                    console.log("inserted")
                    // console.log("booking: ",newbooking);
                    // result(null,res);
                    });

                    sql.query(" UPDATE flights SET occupied = ? WHERE flight_id = ?",[occupied+1,newbooking.flight_id], (err,res) =>{
                      if(err){
                          console.log("error: ",err);
                          result(err,null);
                          return;
                      }
                      // console.log("response:",res);
                      console.log("occupied+1")
                      // console.log("booking: ",newbooking);
                      // result(null,res);
                      });

          }
          // console.log("ans:",res)
          result(null,newbooking)
        });
    //     // console.log('capacity',capacity);
    // sql.query("select occupied from flights where flight_id='EM-77'",(err,res)=>{
    //   if(err){
    //     // console.log("error: ",err);
    //     result(err,null);
    //    return;
    //  }
    //  result(null,newbooking)
    // });
    // console.log('occupied',occupied);
    //  sql.query("INSERT INTO ams.bookings SET ?",newbooking, (err,res) =>{
    //      if(err){
    //          console.log("error: ",err);
    //          result(err,null);
    //         return;
    //     }
    //     console.log("response:",res);
    //     // console.log("booking: ",newbooking);
    //     result(null,newbooking);
    // });
    // console.log('capacity',capacity);
    // console.log('occupied',occupied);
 } 
 // admin
 Booking.findByIdByAdmin = (booking_id, result) => {
    const booking_Id = `'${booking_id}'`
    sql.query(`SELECT * FROM ams.bookings WHERE booking_id = ${booking_Id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found booking: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found booking with the id
      result({ kind: "not_found" }, null);
    });
  };

  Booking_check.findByIdByUser = (booking_id,check_booking, result) => {
    
    sql.query("SELECT * FROM ams.bookings WHERE first_name = ? and last_name = ? and booking_id = ? and NIC = ?",[check_booking.first_name,check_booking.last_name,check_booking.booking_id,check_booking.nic], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("check_booking",check_booking);
        
        console.log("found booking: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found booking with the id
      result({ kind: "not_found" }, null);
    });
  };
//   // admin and user
  Booking.getAll = (booking_name, result) => {
    let query = "SELECT * FROM ams.bookings";
    if (booking_name) {
      query += ` WHERE airline_name LIKE '%${booking_name}%'`;
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

//admin
  Booking.updateById = (booking_id, newbooking, result) => {
    // console.log(airline_id)
    sql.query(
      "UPDATE ams.boookings SET airline_name = ?, rating = ?, crew = ?, planes = ? WHERE airline_id = ?",
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
  Booking.removeByAdmin = (booking_id, result) => {

          sql.query(`SELECT flight_id FROM ams.bookings WHERE booking_id = '${booking_id}'`, (err,res) =>{
          if(err){
                console.log("error: ",err);
                result(err,null);
                return;
              }
          if(res){

                const flight_id = res[0].flight_id;
                sql.query(`DELETE FROM ams.bookings WHERE booking_id = '${booking_id}'`, (err, res) => {
                if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
                }
              // if (res){
              //       console.log("del:",res)
                if (res.affectedRows == 0) {
                    // not found airline with the id
                    result({ kind: "not_found" }, null);
                    return;
                }
                result(null, res);
                if (res.affectedRows>0){

                          //         //since a booking has been deleted hence we'll decrease the number of occupied seats in that fight by 1
                        sql.query(`UPDATE ams.flights SET occupied = occupied-1 WHERE flight_id = '${flight_id}'`, (err,res) =>{
                            if(err){
                                  console.log("error: ",err);
                                  result(err,null);
                                  return;
                                }
                                // }
                                // }
                                // console.log("deleted airline with id: ",booking_Id);
                                console.log("occupied-1")
                                console.log("ocup:",res)
                                // result(null, res);
                                
                              });
                            }
                     });

                    }
                  });
          
                  };

  Booking_check.removeByUser = (booking_id,check_booking, result) => {

    try{

      
      sql.query(`SELECT flight_id FROM ams.bookings WHERE booking_id = '${booking_id}'`, (err,res) =>{
        if(err){
          console.log("error: ",err);
            result(err,null);
            return;
          }
      if(res){

            const flight_id = res[0].flight_id;
            sql.query("DELETE FROM ams.bookings WHERE first_name = ? and last_name = ? and booking_id = ? and NIC = ?",[check_booking.first_name,check_booking.last_name,booking_id,check_booking.nic], (err, res) => {
            if (err) {
                console.log("error: ", err);
                console.log("error credentials")
                result(null, err);
            return;
            }
          // if (res){
          //       console.log("del:",res)
            if (res.affectedRows == 0) {
              // not found airline with the id
              result({ kind: "not_found" }, null);
              return;
            }
            result(null, res);
            if (res.affectedRows>0){
              
              //         //since a booking has been deleted hence we'll decrease the number of occupied seats in that fight by 1
              sql.query(`UPDATE ams.flights SET occupied = occupied-1 WHERE flight_id = '${flight_id}'`, (err,res) =>{
                if(err){
                  console.log("error: ",err);
                  result(err,null);
                  return;
                }
                // }
                // }
                // console.log("deleted airline with id: ",booking_Id);
                console.log("occupied-1")
                console.log("ocup:",res)
                // result(null, res);
                
              });
            }
          });
          
        }
      });
    }
    catch(err){
      console.log("error caught: ",err);
      result(err,null);
      return;
    }
      
    // sql.query("DELETE FROM ams.bookings WHERE first_name = ? and last_name = ? and booking_id = ? and NIC = ?",[check_booking.first_name,check_booking.last_name,booking_id,check_booking.nic], (err, res) => {
    //   if (err) {
    //     console.log("error: ", err);
    //     result(null, err);
    //     return;
    //   }
    //   if (res.affectedRows == 0) {
    //     // not found airline with the id
    //     console.log("NOT FOUND")
    //     result({ kind: "not_found" }, null);
    //     return;
    //   }
    //   console.log("del:",res)
    //   //since a booking has been deleted hence we'll increase the number of occupied seats in that fight by 1
    //   sql.query("UPDATE ams.flights SET occupied = ? WHERE flight_id =(select flight_id from ams.bookings where booking_id = ? )",[`occupied-1`,booking_id], (err,res) =>{
    //     if(err){
    //         console.log("error: ",err);
    //         result(err,null);
    //         return;
    //     }
    //     console.log("occuiped-1")
    //     console.log("occu",res)
    //     });
    // console.log("deleted airline with id: ",booking_id);

    // result(null, res);
    // });
  };



//   //admin
  // Booking.removeAll = result => {
  //   sql.query("DELETE FROM ams.bookings", (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(null, err);
  //       return;
  //     }
  //     console.log(`deleted ${res.affectedRows} bookings`);
  //           //since a booking has been deleted hence we'll increase the number of occupied seats in that fight by no og effected lines
  //     sql.query(`UPDATE flights SET occupied = occupied+${1} WHERE flight_id =(select flight_id from ams.bookings where booking_id = ${check_booking.booking_id} )`, (err,res) =>{
  //     if(err){
  //                 console.log("error: ",err);
  //                 result(err,null);
  //                 return;
  //     }
  //     });
  //     result(null, res);
  //   });
  // };
  module.exports = {Booking,Booking_check};