var mysql      = require('mysql');
var moment = require('moment');
moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
//var moment = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'song',
  database : 'ddokdi_db'
});
connection.connect(function(err){
if(!err) {
    console.log("drug_management is connected ... nn");
} else {
    console.log("Error connecting drug_management database ... nn");
}
});

exports.drug_management = function(req,res){
  var greeting={
    "drug_management_USERID":req.body.payload.drug_management_USERID,
    "drug_name":req.body.payload.drug_name,
    "time": moment
  }
//   var value = 0;
//   var query = `SELECT * FROM table where greeting_USERID = ${req.body.payload.message}`;

  connection.query('INSERT INTO drug_management SET ?',drug_management, function (error, results, fields) {
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
        "success":"drug registered sucessfully"
          });
    }
    });
  
}