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
    console.log("managing_client is connected ... nn");
} else {
    console.log("Error connecting user database ... nn");
}
});

exports.update_emergency_service_1 = function(req,res){   //읽음 표시
    var emergency_service = 1
    var Client_USERID = req.body.payload.Client_USERID
    var USERID = req.body.payload.USERID
    var values =[emergency_service, Client_USERID]
    connection.query('SELECT USERID FROM user WHERE admin = 1 and USERID = ?',USERID,
      function(error, results){
        if(results.length > 0){
            connection.query('UPDATE user SET emergency_service = ? WHERE USERID = ? ', values,
            function (error, results){
                if (error){
                console.log(error);
                res.send({
                    "code":201,
                    "fail":"not available"
                });
            }
                else{
                console.log(results);
                res.send({
                     "code":200,
                     "success":"emergency_service is activated"
              });
              }
           }
            );
        }
        else{
            console.log("error ocurred",error);
            res.send({
              "code":201,
              "fail":"not available"
            });
        }
});
}

exports.update_emergency_service_0 = function(req,res){   //읽음 표시
    var emergency_service = 0
    var Client_USERID = req.body.payload.Client_USERID
    var USERID = req.body.payload.USERID
    var values =[emergency_service, Client_USERID]
    connection.query('SELECT USERID FROM user WHERE admin = 1 and USERID = ?',USERID,
      function(error, results){
        if(results.length > 0){
            connection.query('UPDATE user SET emergency_service = ? WHERE USERID = ? ', values,
            function (error, results){
                if (error){
                console.log(error);
                res.send({
                    "code":201,
                    "fail":"not available"
                });
            }
                else{
                console.log(results);
                res.send({
                     "code":200,
                     "success":"emergency_service is deactivated"
              });
              }
           }
            );
        }
        else{
            console.log("error ocurred",error);
            res.send({
              "code":201,
              "fail":"not available"
            });
        }
});
}

exports.admin_client_list = function(req,res){   //읽음 표시
    var USERID = req.body.payload.USERID
    connection.query('SELECT USERID FROM user WHERE admin = 1 and USERID = ?',USERID,
      function(error, results){
        if(results.length > 0){
            connection.query('SELECT USERID, name, age FROM user WHERE admin = 0 ORDER BY name ',
            function (error, results){
                if (error){
                console.log(error);
                res.send({
                    "code":201,
                    "fail":"not available"
                });
            }
                else{
                console.log(results);
                res.send({
                     "code":200,
                     "client_info_list":results
              });
              }
           }
            );
        }
        else{
            console.log("error ocurred",error);
            res.send({
              "code":201,
              "fail":"not available"
            });
        }
});
}