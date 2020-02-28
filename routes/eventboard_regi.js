var mysql = require('mysql');
var moment = require('moment');
//var moment = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'song',
  database : 'ddokdi_db'
});
connection.connect(function(err){
if(!err) {
    console.log("event is connected ... nn");
} else {
    console.log("Error connecting greeting database ... nn");
}
});

exports.event_register= function(req,res){
  var event_admin = req.body.payload.event_admin;
    connection.query('SELECT USERID FROM user WHERE admin = 1 and USERID = ?',event_admin,
      function(err, results){
          if(results.length > 0){
            var event_register={
              "event_name":req.body.payload.event_name,
              "date":req.body.payload.date,
              "qualification":req.body.payload.qualification,
              "body":req.body.payload.body,
              "location":req.body.payload.location,
              "beneficial":req.body.payload.beneficial,
              "etc":req.body.payload.etc,
              "heads":req.body.payload.heads,
              "timestamp": moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
              "event_admin":req.body.payload.event_admin
            }
            connection.query('INSERT INTO event SET ?',event_register, function (err, results, fields) {
              if (err) {
                  console.log("error ocurred",err);
                res.send({
                    "code":400,
                    "failed":"error ocurred"
                    });
              }
              else{
                  console.log('The solution is: ', results);
              res.send({
                  "code":200,
                  "success":"event registered sucessfully"
                        });
                  }
                  });
              }
          else{
            console.log("error ocurred",err);
            res.send({
              "code":201,
              "success":"not available"
            });
          }
        }
        );
      }
    
  
// exports.event_register= function(req,res){
//   var event_register={
//     "event_name":req.body.payload.event_name,
//     "date":req.body.payload.date,
//     "qualification":req.body.payload.qualification,
//     "body":req.body.payload.body,
//     "location":req.body.payload.location,
//     "beneficial":req.body.payload.beneficial,
//     "etc":req.body.payload.etc,
//     "heads":req.body.payload.heads,
//     "timestamp": moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
//     "event_admin":req.body.payload.event_admin
// }

//   connection.query('INSERT INTO event SET ?',event, function (error, results, fields) {
//     if (error) {
//         console.log("error ocurred",error);
//       res.send({
//            "code":400,
//            "failed":"error ocurred"
//           });
//     }
//     else{
//         console.log('The solution is: ', results);
//      res.send({
//         "code":200,
//         "success":"greeting registered sucessfully"
//               });
//         }
//         });
//   }
//SELECT a.email, a.sex, a.address, a.name, a.phone, b.carnum FROM cost a INNER JOIN cash2 b ON a.email = b.email /* 조인키 연결조건 */
//connection.query('SELECT a.event_no, a.event_name, a.date, a.qualification, a.body, a.location, a.beneficial, a.etc, a.heads, timestamp, a.event_admin, b.USERID, b.admin FROM event a INNER JOIN user b ON a.event_admin = b.admin',admin, function(error,results, fields){  });


// exports.event_register= function(req,res){
//     var USERID_for_admin_checking = req.body.payload.USERID
//   connection.query('SELECT USERID FROM user WHERE admin = 1', USERID_for_admin_checking, function(error,results,field)
// {
//     if(USERID_for_admin_checking === results){
//       console.log("admin");
//       res.send({
//         "code" : 100,
//         "success":"admin"
//       });
//     }
//     else{
//       console.log("not_admin");
//       res.send({
//         "code" : 400,
//         "failed" : "fail"
//       });
//     }
//   });   }