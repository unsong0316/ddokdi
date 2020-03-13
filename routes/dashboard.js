var mysql = require('mysql');
var moment = require('moment');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'song',
  database : 'ddokdi_db'
});
connection.connect(function(error){
if(!error) {
    console.log("dashboard is ready ... nn");
} else {
    console.log("Error connecting greeting database ... nn");
}
});

exports.dashboard= function(req,res){  //새로운 행사 리스트 카운트(안읽음 = 새로운 행사)
  var USERID = req.body.payload.USERID
      connection.query('SELECT COUNT(event_no) AS event_count FROM event WHERE event_no IN(SELECT user_event_event_no AS event_no FROM user_event WHERE checking = 0 AND user_event_USERID = ?)', USERID, 
      function(error,count_new){
        if(error){
          console.log(error);
      }
        else{
          console.log(count_new);
          connection.query('SELECT event_no, event_name FROM event WHERE event_no IN(SELECT user_event_event_no AS event_no FROM user_event WHERE participation = 1 AND user_event_USERID = ?)', USERID, 
          function(error,j_event_list){
            if(error){
              console.log(error);
          }
            else{
              console.log(j_event_list);       
              connection.query('SELECT drug_name, time FROM drug_management where drug_management_USERID = ?',USERID, 
                function (error,drug_list){
                  if (error){
                    console.log(error);
                  }
                  else{
                    console.log(drug_list);
                    res.send({
                      "code" : 200,
                      "c_n_event": count_new,
                      "l_j_event": j_event_list,
                      "l_drug": drug_list
                    });
                  }
                });
            }
            });         
      }        
    });
  }