var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'song',
  database : 'ddokdi_db'
});
connection.connect(function(error){
if(!error) {
    console.log("drug_management is connected ... nn");
} else {
    console.log("Error connecting drug_management database ... nn");
}
});

//딜리트 쿼리 만들기
exports.delete_drug_list= function(req,res){ //약등록 삭제
  var drug_management_USERID = req.body.payload.USERID
  var drug_name = req.body.payload.drug_name
  var time = req.body.payload.time
  var delete_drug_list = [drug_management_USERID, drug_name, time]
  connection.query('DELETE FROM drug_management WHERE drug_management_USERID = ? AND drug_name = ? AND time = ? ',delete_drug_list, 
    function (error, results){
      if (error){
        console.log(error);
      }
      else{
        console.log(results);
        res.send({
          "code":200,
          "delete_drug_list": "success"
        });
      }
    }
  );
  }


exports.drug_management = function(req,res){
  var drug_management ={
    "drug_management_USERID":req.body.payload.USERID,
    "drug_name":req.body.payload.drug_name,
    "time": req.body.payload.time
  }
//   var value = 0;
//   var query = `SELECT * FROM table where greeting_USERID = ${req.body.payload.message}`;

  connection.query('INSERT INTO drug_management SET ?',drug_management, function (error, results) {
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
// 약복용 리스트 약종류(tinyint(1)),복용시간(tinyint(1)),

exports.show_drug_list= function(req,res){
  var drug_management_USERID = req.body.payload.USERID
  connection.query('SELECT drug_name, time FROM drug_management where drug_management_USERID = ?',drug_management_USERID, 
    function (error, results){
      if (error){
        console.log(error);
      }
      else{
        res.send({
          "code":200,
          "l_drug":results
        });
      }
    }
  );
  }