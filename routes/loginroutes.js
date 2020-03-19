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

exports.checking_duplication = function(req,res){   // 아이디 중복검사 실시 후 가입 완료, 새로 가입한 회원은 기존 행사에 대한 정보를 받을 수 없음 (user_event 테이블안에도 생성 해야함)
  var idc = req.body.payload.id;
  connection.query('SELECT * FROM user WHERE id = ?',idc,
    function(error, results){
      if (error){
        console.log(error);
      }
      else{
        if(results.length > 0){
          console.log("error ocurred",error);
          res.send({
            "code":201,
            "fail":"not available"
          });         
            }
        else{ 
          var user={
            "name":req.body.payload.name,
            "id":req.body.payload.id,
            "passwords":req.body.payload.passwords,
            "gender":req.body.payload.gender,
            "age": req.body.payload.age,
            "admin":req.body.payload.admin,
            "timestamp": moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            "phone_no":req.body.payload.phone_no,
            "emergency_contact":req.body.payload.emergency_contact,
            "relationship_emergency_res":req.body.payload.relationship_emergency_res,
            "emergency_service":req.body.payload.emergency_service
          }
          connection.query('INSERT INTO user SET ?',user, function (error, results) {
            if (error) {
              console.log("error ocurred",error);
              res.send({
                "code":400,
                "failed":"error ocurred"
              });
            }else{
              connection.query(`SELECT MAX(USERID) as USERID FROM user`, 
                  function (error, USERID) {
                    if(error) {return console.error(error);}
                    else{
                      var default_value = 0
                      var expire_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                      var create_user_event_update={
                        "checking": default_value,
                        "participation":default_value,
                        "user_event_USERID": USERID[0].USERID
                              }
                      connection.query('INSERT INTO user_event(user_event_event_no,date) SELECT event_no as user_event_event_no, date FROM event WHERE date > ?', expire_date,  //1
                        function (error, result) {
                          if(error){return console.error(error);}
                          else{
                            console.log(result)
                          // a = results
                          // res.send({a});
                          connection.query('UPDATE user_event SET ? where checking is NULL and participation is NULL and user_event_USERID is NULL ', create_user_event_update,//2
                            function(error,results){
                              if(error){return console.error(error);}
                              else{
                                console.log(results)
                                res.send({
                                  "code":200,
                                  "success":"user registered sucessfully"
                                });
                        
                        }
                      });
                    }
                    });
                  }   
                });
             }
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
   }
   else{
     // console.log('The solution is: ', results);
     if(results.length >0){
       if(results[0].passwords == passwords){
         connection.query('SELECT USERID, name FROM user WHERE id = ?',[id], function (error, results) {
          if (error) {
            // console.log("error ocurred",error);
            res.send({
              "code":400,
              "failed":"error ocurred"
            });
          }
          else{
            USERID = results
            res.send({
              "code":200,
              "USERID" : USERID
                });

         }
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
