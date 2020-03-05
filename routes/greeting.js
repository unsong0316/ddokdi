var mysql = require('mysql');
var moment = require('moment');
//var moment = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'song',
  database : 'ddokdi_db'
});
connection.connect(function(error){
if(!error) {
    console.log("greeting is connected ... nn");
} else {
    console.log("Error connecting greeting database ... nn");
}
});

exports.greeting= function(req,res){
  var greeting={
    "greeting_USERID":req.body.payload.greeting_USERID,
    "mood":req.body.payload.mood,
    "message":req.body.payload.message,
    "timestamp": moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  }
//   var value = 0;
//   var query = `SELECT * FROM table where greeting_USERID = ${req.body.payload.message}`;

  connection.query('INSERT INTO greeting SET ?',greeting, function (error, results) {
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
        "mood": results
          });
    }
    });
  
}