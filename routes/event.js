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
    console.log("user_event is connected ... nn");
} else {
    console.log("Error connecting greeting database ... nn");
}
});

exports.event_a_list= function(req,res){ //행사 전체리스트
    var event_USERID = req.body.payload.USERID
    connection.query('SELECT event_no, event_name FROM event WHERE event_no IN(SELECT user_event_event_no AS event_no FROM user_event WHERE checking = 1 AND user_event_USERID = ?)', event_USERID,
      function (error, results){
        if (error){
          console.log(error);
        }
        else{
            res.send({
            "l_a_event":results
          });
        }
      }
    );
    }

exports.event_n_list= function(req,res){  //새로운 행사 리스트(안읽음 = 새로운 행사)
    var event_USERID = req.body.payload.USERID
        connection.query('SELECT event_no, event_name FROM event WHERE event_no IN(SELECT user_event_event_no AS event_no FROM user_event WHERE checking = 0 AND user_event_USERID = ?)', event_USERID, 
        function(error,results){
          if(error){
            console.log(error);
        }
          else{
            console.log(results);
            res.send({
              "l_n_event":results
          });
        }        
      });
    }

exports.event_d= function(req,res){ //행사 상세조회
  var EVENT_NO = req.body.payload.event_no
  connection.query('SELECT event_name, date, qualification, body, location, beneficial, etc, heads FROM event WHERE event_no = ?', EVENT_NO,
    function (error, results){
       if (error){
         console.log(error);
       }
       else{         
         res.send({
          "d_event":results
         });
        }
      }
    );
    }
   
exports.event_c = function(req,res){   //읽음 표시
    var checking = 1
    var USERID = req.body.payload.USERID
    var EVENT_NO = req.body.payload.event_no    //event table에 있는 게시글 고유번호(event_no)
    var values =[checking, USERID, EVENT_NO]
    connection.query('UPDATE user_event SET checking = ? WHERE user_event_USERID = ? AND user_event_event_no = ?', values,
    function (error, results){
        if (error){
          console.log(error);
        }
        else{
          console.log(results);
          res.send({
            "code":200,
            "sucess":"event_c sucess"
           });
        }
      }
    );   
}

exports.event_j= function(req,res){ //클라이언트 참석 표시
  var participation = 1
  var USERID = req.body.payload.USERID
  var EVENT_NO = req.body.payload.event_no    //event table에 있는 게시글 고유번호(event_no)
  var values =[participation, USERID, EVENT_NO]
  connection.query('UPDATE user_event SET participation = ? WHERE user_event_USERID = ? AND user_event_event_no = ?', values,
  function (error, results){
      if (error){
        console.log(error);
      }
      console.log(results);
      res.send({
        "code":200,
        "sucess":"event_j sucess"
      });
    }
  );   
    }

exports.event_not_j_list= function(req,res){  //참석 행사 리스트(participation = 1 == 참석행사)
    var event_USERID = req.body.payload.USERID
        connection.query('SELECT event_no, event_name FROM event WHERE event_no IN(SELECT user_event_event_no AS event_no FROM user_event WHERE participation = 0 AND checking = 1 AND user_event_USERID = ?)', event_USERID, 
        function(error,results){
          if(error){
            console.log(error);
        }
          else{
            console.log(results);
            res.send({
              "l_not_j_event":results
          });
            if (results==''){
              console.log("notting")              
            }
        }  
         
      });
    }


exports.event_j_list= function(req,res){  //참석 행사 리스트(participation = 1 == 참석행사)
    var event_USERID = req.body.payload.USERID
        connection.query('SELECT event_no, event_name FROM event WHERE event_no IN(SELECT user_event_event_no AS event_no FROM user_event WHERE participation = 1 AND user_event_USERID = ?)', event_USERID, 
        function(error,results){
          if(error){
            console.log(error);
        }
          else{
            console.log(results);
            res.send({
              "l_j_event":results
          });
            if (results==''){
              console.log("notting")              
            }
        }  
         
      });
    }


exports.event_j_count = function(req,res){ //클라이언트 참석자 수 표시
  var EVENT_NO = req.body.payload.event_no    //event table에 있는 게시글 고유번호(event_no)
  connection.query(`SELECT COUNT(participation) as count_participants FROM user_event WHERE user_event_event_no = ? AND participation = 1`, EVENT_NO,
  function (error, results){
      if (error){
        console.log(error);
      }
      console.log(results);
      res.send({
        "c_participants":results
      });
    }
  );   
    }
    