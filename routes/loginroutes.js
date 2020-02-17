var mysql      = require('mysql');
var mysqlTimestamp = require(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'song',
  database : 'ddokdi_db'
});
connection.connect(function(err){
if(!err) {
    console.log("user is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});
exports.register = function(req,res){
    // console.log("req",req.body);
    //var today = new datetime();
    var user={
      "name":req.body.payload.name,
      "id":req.body.payload.id,
      "passwords":req.body.payload.passwords,
      "gender":req.body.payload.gender,
      "age": req.body.payload.age,
      "admin":req.body.payload.admin,
      "timestamp":mysqlTimestamp
    }
    connection.query('INSERT INTO user SET ?',user, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      console.log('The solution is: ', results);
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
    }
    });
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
     })
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
