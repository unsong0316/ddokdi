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
    console.log("event is connected ... nn");
} else {
    console.log("Error connecting greeting database ... nn");
}
});

exports.event_a_list= function(req,res){
    connection.query('SELECT event_no, event_name FROM event', 
      function (error, results, fields){
        if (error){
          console.log(error);
        }
        else{
          event_list = results
          res.send({
            event_list
          });
        }
      }
    );
    }
// exports.event_j_list= function(req,res){
//     connection.query('SELECT event_no, event_name FROM event', 
//       function (error, results, fields){
//         if (error){
//           console.log(error);
//         }
//         else{
//           results = event_list
//           res.send({
//             event_list
//           });
//         }
//       }
//     );
//     }
exports.event_n_list= function(req,res){
    var event_USERID = req.body.payload.USERID
    connection.query('SELECT a.event_no, a.event_name, a.date, a.qualification, a.body, a.location, a.beneficial, a.etc, a.participaants, a.timestamp,b.user_event_USERID, b.user_event_event_no, b.checking FROM event a INNER JOIN user_event b ON a.event_no = b.user_event_event_no where user_event_USERID = ? and checking = NULL', event_USERID, 
    function(error,results, fields){  
        res.send({results});
    });
}
//     connection.query('SELECT event_no, event_name FROM event', 
//       function (error, results, fields){
//         if (error){
//           console.log(error);
//         }
//         else{
//           results = event_list
//           res.send({
//             event_list
//           });
//         }
//       }
//     );
//     }

exports.event_checking= function(req,res){
    var checking = 1
    // var USERID = {
    //     "user_event_USERID":req.body.payload.USERID
    // }
    // var user_event_event_no = {
    //     "user_event_event_no":req.body.payload.user_event_event_no    //event table에 있는 게시글 고유번호(event_no)
    // }
    var event_checking_row={
        "checking": checking,  //게시글 상세 조회 1(check)
        "user_event_event_no":req.body.payload.user_event_event_no,
        "user_event_USERID":req.body.payload.USERID

    }
    connection.query('UPDATE user_event SET checking = ? WHERE (user_event_USERID = ?) AND (user_event_event_no = ?)', event_checking_row,
    function (error, results, fields){
        if (error){
          console.log(error);
        }
        console.log(results);
      }
    );   
}

//
// var USERID = connection.quary
//     connection.quary('UPDATE user_event SET checking = 1, user_event_USERID = USERID,  WHERE event_USERID = [USERID]');