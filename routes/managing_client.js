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

exports.update_emergency_service_1 = function(req,res){  
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

exports.update_emergency_service_0 = function(req,res){   
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

exports.admin_client_list = function(req,res){   
    var USERID = req.body.payload.USERID
    connection.query('SELECT USERID FROM user WHERE admin = 1 and USERID = ?',USERID,
      function(error, results){
        if(results.length > 0){
            connection.query('SELECT USERID AS Client_USERID, name, age FROM user WHERE admin = 0 ORDER BY name ',
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

exports.admin_client_details = function(req,res){   
    var USERID = req.body.payload.USERID
    var Client_USERID = req.body.payload.Client_USERID
    connection.query('SELECT USERID FROM user WHERE admin = 1 and USERID = ?',USERID,
      function(error, admin_checking){
        if(admin_checking.length > 0){
            connection.query('SELECT USERID AS Client_USERID, name, id, passwords, gender, age, phone_no, emergency_contact, relationship_emergency_res, emergency_service FROM user WHERE USERID = ?', Client_USERID,
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
                     "client_info":results
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

exports.update_emergency_service = function(req,res){   
    var USERID = req.body.payload.USERID
    var Client_USERID = req.body.payload.Client_USERID
    connection.query('SELECT USERID FROM user WHERE admin = 1 and USERID = ?',USERID,
      function(error, admin_checking){
        if(admin_checking.length > 0){
            connection.query('SELECT emergency_service AS emergency_service FROM user WHERE USERID = ?',Client_USERID,
                function(error, emergency_service){
                    if(emergency_service[0].emergency_service =='0'){
                        connection.query('UPDATE user SET emergency_service = 1 WHERE USERID = ? ', Client_USERID,
                        function (error, results_emergency_service_to_1){
                            if (error){
                            console.log(error);
                            res.send({
                                "code":201,
                                "fail":"not available"
                            });
                        }
                            else{
                                console.log(results_emergency_service_to_1);
                                connection.query('INSERT INTO emergency_service_table(emergency_service_USERID) SELECT USERID AS emergency_service_USERID FROM user WHERE USERID = ?', Client_USERID,  
                                function (error, result) {
                                if(error){return console.error(error);}
                                else{
                                    console.log(result)
                                res.send({
                                    "code":200,
                                    "success":"emergency_service is activated"
                            });
                            }
                        });
                    }
                    });
                
                }
                    else if(emergency_service[0].emergency_service == '1'){
                        console.log(emergency_service);
                        connection.query('UPDATE user SET emergency_service = 0 WHERE USERID = ? ', Client_USERID,
                        function (error, results_emergency_service_to_0){
                            if (error){
                            console.log(error);
                            res.send({
                                "code":201,
                                "fail":"not available"
                            });
                        }
                            else{
                                console.log(results_emergency_service_to_0);
                                connection.query('DELETE FROM emergency_service_table WHERE emergency_service_USERID = ?' , Client_USERID,  
                                function (error, result) {
                                if(error){return console.error(error);}
                                else{
                                    console.log(result)
                                res.send({
                                    "code":200,
                                    "success":"emergency_service is deactivated"
                            });
                        }
                            });
                            }
                    });
                    }
                    else{
                        console.log("error ocurred",error);
                        res.send({
                            "code":201,
                            "fail":"err"
                 });
             }

            });
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

exports.checking_emergency_situation = function(req,res){   
    var USERID = req.body.payload.USERID
    connection.query('SELECT USERID FROM user WHERE admin = 1 and USERID = ?',USERID,
      function(error, admin_checking){
        if(admin_checking.length > 0){
            connection.query('SELECT * FROM emergency_service_table',
            function(error, results){
                if(error){
                    console.log("error ocurred",error);
                    res.send({
                    "code":201,
                    "fail":"not available"
                    });                    
                }
                else{               
                    console.log(results);
                    res.send({
                        "code":200,
                        "success": results
                  });
               }
             });
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



// connection.query('SELECT emergency_service_USERID FROM emergency_service_table WHERE emergency_service_USERID = ?',USERID,
//     function(error, results){
//       if (error){
//         console.log(error);
//       }
//       else{
//         if(results.length > 0){ //있을때
//             var timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
//             emergency_service_table_update_value = [timestamp, USERID]
//             connection.query('UPDATE timestamp SET ? where emergency_service_USERID = ? ', emergency_service_table_update_value,
//                           function(error,results){
//                             if(error){return console.error(error);}
//                             else{

//               }
//             });
//             }
//           else{ //없을떄

//           }
//       }
//     });


// exports.update_emergency_service = function(req,res){   //읽음 표시
//     var USERID = req.body.payload.USERID
//     var Client_USERID = req.body.payload.Client_USERID
//     connection.query('SELECT emergency_service FROM user WHERE USERID = ?',Client_USERID,
//         function(error, emergency_service){
//             if(error){
//                 console.log(error)
//                                 }
//                     else{
//                         var value = emergency_service;
//                         switch(value){
//                             case 0 :
//                                 connection.query('UPDATE user SET emergency_service = 1 WHERE USERID = ? ', Client_USERID,
//                                     function (error, results_emergency_service_to_1){
//                                         if (error){
//                                         console.log(error);
//                                         res.send({
//                                             "code":201,
//                                             "fail":"not available"
//                                             });
//                                         }
//                                         else{
//                                             res.send({
//                                             "code":200,
//                                             "success":"emergency_service is activated"
//                                             });
//                                         }
//                                          });
//                                         break;
//                             case 1 :
//                                 connection.query('UPDATE user SET emergency_service = 0 WHERE USERID = ? ', Client_USERID,
//                                     function (error, results_emergency_service_to_0){
//                                         if (error){
//                                         console.log(error);
//                                         res.send({
//                                             "code":201,
//                                             "fail":"not available"
//                                         });
//                                     }
//                                         else{
//                                             res.send({
//                                                 "code":200,
//                                                 "success":"emergency_service is deactivated"
//                                         });
//                                         }
//                                 });
//                                 break;
//                             default : 
//                                 res.send({
//                                     "code":201,
//                                     "fail":"not available2"
//                                 });
//                                 break;
//                        }               
//         } 
//     });
// }
        