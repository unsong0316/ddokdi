var mysql      = require('mysql');
var moment = require('moment');
//moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
//var moment = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'song',
  database : 'ddokdi_db'
});
connection.connect(function(error){
if(!error) {
    console.log("user is connected ... nn");
} else {
    console.log("Error connecting user database ... nn");
}
});

exports.checking_duplication = function(req,res){
  var idc = req.body.payload.id;
  connection.query('SELECT * FROM user WHERE id = ?',idc,
    function(error, results){
      if (error){
        console.log(error);
      }
      else{
        if(results.length > 0){
          var user={
            "USERID":req.body.payload.USERID,
            "name":req.body.payload.name,
            "id":req.body.payload.id,
            "passwords":req.body.payload.passwords,
            "gender":req.body.payload.gender,
            "age": req.body.payload.age,
            "admin":req.body.payload.admin,
            "timestamp": moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
          }
              connection.query('INSERT INTO user SET ?',user, function (error, results) {
                if (error) {
                  console.log("error ocurred",error);
                  res.send({
                    "code":400,
                    "failed":"error ocurred"
                  });
                }else{
                  console.log('The solution is: ', results);
                  res.send({
                    "code":200,
                    "success":"user registered sucessfully"
                      });
                }
                });
            }
        else{
          console.log("error ocurred",error);
          res.send({
            "code":201,
            "success":"not available"
          });
        }
      }
    }
  )
}


exports.login = function(req,res){
   var id= req.body.payload.id;
   var passwords = req.body.payload.passwords;
   connection.query('SELECT * FROM user WHERE id = ?',[id], function (error, results, fields) {
   if (error) {
     // console.log("error ocurred",error);
     res.send({
       "code":400,
       "failed":"error ocurred"
     });
   }else{
     // console.log('The solution is: ', results);
     if(results.length >0){
       if(results[0].passwords == passwords){
         res.send({
           "code":200,
           "success":"login sucessfull"
             });
       }
       else{
         res.send({
           "code":204,
           "success":"id and password does not match"
             });
       }
     }
     else{
       res.send({
         "code":204,
         "success":"id does not exits"
           });
     }
   }
   });
 }
