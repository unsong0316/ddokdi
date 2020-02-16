var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'song',
  database : 'ddokdi_db'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});
exports.register = function(req,res){
    // console.log("req",req.body);
    //var today = new datetime();
    var user={
      "name":req.body.name,
      "id":req.body.id,
      "passwords":req.body.passwords,
      "gender":req.body.gender,
      "age": req.body.age,
      "admin":req.body.admin
      //"timestamp":today
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
   var id= req.body.id;
   var passwords = req.body.passwords;
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