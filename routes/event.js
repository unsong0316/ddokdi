var mysql = require('mysql');
var moment = require('moment');
//var moment = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'song',
  database : 'ddokdi_db'
});
connection.connect(function(err){
if(!err) {
    console.log("event is connected ... nn");
} else {
    console.log("Error connecting greeting database ... nn");
}
});

exports.event_checking= function(req,res){
    var USERID = connection.quary
    connection.quary('UPDATE user_event SET  checking = 1 WHERE event_USERID = [USERID]');

   
}

//connection.query('SELECT a.event_no, a.event_name, a.date, a.qualification, a.body, a.location, a.beneficial, a.etc, a.participaants, a.timestamp, b.user_event_no, b.user_event_USERID, b.user_event_event_no, b.checking FROM event a INNER JOIN user_event b ON a.event_no = b.user_event_event_no',admin, function(error,results, fields){  });