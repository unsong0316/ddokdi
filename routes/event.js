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


exports.event_t_list= function(req,res){  //전체 리스트(안읽음 = 새로운 행사)
  var event_USERID = req.body.payload.USERID
      connection.query('SELECT event_no, event_name FROM event WHERE event_no IN(SELECT user_event_event_no AS event_no FROM user_event WHERE checking = 0 AND user_event_USERID = ?)', event_USERID, 
      function(error,l_n_event){
        if(error){
          console.log(error);
      }
        else{
          connection.query('SELECT event_no, event_name FROM event WHERE event_no IN(SELECT user_event_event_no AS event_no FROM user_event WHERE participation = 0 AND checking = 1 AND user_event_USERID = ?)', event_USERID, 
        function(error,l_not_j_event){
          if(error){
            console.log(error);
        }
          else{            
            connection.query('SELECT event_no, event_name FROM event WHERE event_no IN(SELECT user_event_event_no AS event_no FROM user_event WHERE participation = 1 AND user_event_USERID = ?)', event_USERID, 
            function(error,l_j_event){
              if(error){
                console.log(error);
            }
              else{
                console.log(l_j_event);
                console.log(l_not_j_event);
                console.log(l_n_event);
                res.send({
                  "l_j_event":l_j_event,
                  "l_not_j_event":l_not_j_event,
                  "l_n_event":l_n_event
              });                
            }               
          });
        }
       });
    }
      });
  }


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
    connection.query('SELECT emergency_service_USERID FROM emergency_service_table WHERE emergency_service_USERID = ?',USERID,
    function(error, results){
      if (error){
        console.log(error);
      }
      else{
        if(results.length > 0){ //있을때
            var timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            emergency_service_table_update_value = [timestamp, USERID]
            connection.query('UPDATE timestamp SET ? where emergency_service_USERID = ? ', emergency_service_table_update_value,
                          function(error,results){
                            if(error){return console.error(error);}
                            else{
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
                        });
                      }
          else{ //없을떄
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
      }
    });
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


exports.event_list= function(req,res){  //event_list (참석 안함 (체킹0,1), 참석함)
  var event_USERID = req.body.payload.USERID
  connection.query('SELECT emergency_service_USERID FROM emergency_service_table WHERE emergency_service_USERID = ?',event_USERID,
    function(error, results){
      if (error){
        console.log(error);
      }
      else{
        if(results.length > 0){ //있을때
            var timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            emergency_service_table_update_value = [timestamp, event_USERID]
            connection.query('UPDATE emergency_service_table SET timestamp=? where emergency_service_USERID = ? ', emergency_service_table_update_value,
                          function(error,results){
                            if(error){return console.error(error);}
                            else{
                              connection.query('SELECT event_no, event_name FROM event WHERE event_no IN(SELECT user_event_event_no AS event_no FROM user_event WHERE participation = 0 AND checking = 0 AND user_event_USERID = ?)', event_USERID, 
                              function(error,checking_0){
                                if(error){
                                console.log(error);
                              }
                                else{
                                  connection.query('SELECT event_no, event_name FROM event WHERE event_no IN(SELECT user_event_event_no AS event_no FROM user_event WHERE participation = 0 AND checking = 1 AND user_event_USERID = ?)', event_USERID, 
                                  function(error,checking_1){
                                    if(error){
                                      console.log(error);
                                    }
                                    else{
                                      connection.query('SELECT event_no, event_name FROM event WHERE event_no IN(SELECT user_event_event_no AS event_no FROM user_event WHERE participation = 1 AND checking = 1 AND user_event_USERID = ?)', event_USERID, 
                                      function(error,participation_1){
                                        if(error){
                                          console.log(error);
                                          }
                                        else{
                                          console.log("event_list_done");
                                          res.send({
                                            "checking_0": checking_0,
                                            "checking_1": checking_1,
                                            "participation_1": participation_1
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
          else{ //없을떄
            connection.query('SELECT event_no, event_name FROM event WHERE event_no IN(SELECT user_event_event_no AS event_no FROM user_event WHERE participation = 0 AND checking = 0 AND user_event_USERID = ?)', event_USERID, 
            function(error,checking_0){
              if(error){
              console.log(error);
            }
              else{
                connection.query('SELECT event_no, event_name FROM event WHERE event_no IN(SELECT user_event_event_no AS event_no FROM user_event WHERE participation = 0 AND checking = 1 AND user_event_USERID = ?)', event_USERID, 
                function(error,checking_1){
                  if(error){
                    console.log(error);
                  }
                  else{
                    connection.query('SELECT event_no, event_name FROM event WHERE event_no IN(SELECT user_event_event_no AS event_no FROM user_event WHERE participation = 1 AND checking = 1 AND user_event_USERID = ?)', event_USERID, 
                    function(error,participation_1){
                      if(error){
                        console.log(error);
                        }
                      else{
                        console.log("event_list_done");
                        res.send({
                          "checking_0": checking_0,
                          "checking_1": checking_1,
                          "participation_1": participation_1
                    });           
                  }         
                });             
              }        
            });          
          }        
      });
      }
    }
  });
}

exports.update_user_event_participation = function(req,res){   
  var USERID = req.body.payload.USERID
  var EVENT_NO = req.body.payload.event_no
  var values_for_update = [USERID, EVENT_NO]
  connection.query('SELECT participation FROM user_event WHERE user_event_USERID = ? AND user_event_event_no = ?',values_for_update,
  function(error, participation_status){
    if(participation_status[0].participation =='0'){
        connection.query('UPDATE user_event SET participation = 1 WHERE user_event_USERID = ? AND user_event_event_no = ? ', values_for_update,
        function (error, results_participation_to_1){
            if (error){
            console.log(error);
            res.send({
                "code":201,
                "fail":"not available"
            });
        }
            else{
                console.log(results_participation_to_1);
                res.send({
                    "code":200,
                    "success":"participation_status is activated"
            });
            }
    });
  }
    else if(participation_status[0].participation == '1'){
        console.log(participation_status);
        connection.query('UPDATE user_event SET participation = 0 WHERE user_event_USERID = ? AND user_event_event_no = ? ', values_for_update,
        function (error, results_participation_to_0){
            if (error){
            console.log(error);
            res.send({
                "code":202,
                "fail":"not available"
            });
        }
            else{
                console.log(results_participation_to_0);
                res.send({
                    "code":200,
                    "success":"participation_status is deactivated"
            });
            }
    });
    }
    else{
        console.log("error ocurred",error);
        res.send({
            "code":203,
            "fail":"err"
                  });
              }
            });     
    }

 
exports.user_event_d= function(req,res){ //행사 상세조회
  var EVENT_NO = req.body.payload.event_no
  var USERID = req.body.payload.USERID
  var values_for_user_event_details = [EVENT_NO, USERID]
  connection.query('SELECT emergency_service_USERID FROM emergency_service_table WHERE emergency_service_USERID = ?',USERID,
    function(error, results){
      if (error){
        console.log(error);
      }
      else{
        if(results.length > 0){ //있을때
            var timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            emergency_service_table_update_value = [timestamp, USERID]
            connection.query('UPDATE emergency_service_table SET timestamp=? where emergency_service_USERID = ? ', emergency_service_table_update_value,
                          function(error,results){
                            if(error){return console.error(error);}
                            else{
                              connection.query('SELECT user_event_USERID, checking, participation, user_event_event_no FROM user_event WHERE user_event_event_no = ? AND user_event_USERID =?', values_for_user_event_details,
                              function (error, results){
                                  if (error){
                                    console.log(error);
                                  }
                                  else{         
                                    res.send({
                                    "user_event":results
                                    });
                                  }
                                }
                              );
                            }
                        });
                      }
          else{ //없을떄
            connection.query('SELECT user_event_USERID, checking, participation, user_event_event_no FROM user_event WHERE user_event_event_no = ? AND user_event_USERID =?', values_for_user_event_details,
            function (error, results){
                if (error){
                  console.log(error);
                }
                else{         
                  res.send({
                  "user_event":results
                  });
                }
              }
            );
          }
      }
    });
  
    }