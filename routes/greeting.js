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
    console.log("greeting is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

exports.greeting= function(req,res){
  var greeting={
    "greeting_USERID":req.body.payload.greeting_USERID,
    "mood":req.body.payload.mood,
    "message":req.body.payload.message,
    "timestamp": mysqlTimestamp
  }
//   var value = 0;
//   var query = `SELECT * FROM table where greeting_USERID = ${req.body.payload.message}`;

  connection.query('INSERT INTO greeting SET ?',greeting, function (error, results, fields) {
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
        "success":"greeting registered sucessfully"
          });
    }
    });
  
}