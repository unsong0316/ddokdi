var express = require("express");
var login = require('./routes/loginroutes');
var greeting = require('./routes/greeting');
var drug_management = require('./routes/drug_management');
var eventboard_regi = require('./routes/eventboard_regi');
var event = require('./routes/event');
var bodyParser = require('body-parser');
// var checking_duplication = require('./routes/loginroutes');
var app = express();
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router();

router.post('/register', login.checking_duplication); //아이디 중복검사 및 회원 등록
router.post('/login', login.login); //로그인
router.post('/greeting', greeting.greeting); //기분 체크
router.post('/drug_management', drug_management.drug_management); //복용 약 등록
router.post('/drug_list', drug_management.show_drug_list); //복용 약 리스트
router.post('/eventboard_regi', eventboard_regi.event_register); //이벤트 등록
router.post('/a_event_list', event.event_a_list); //all(전체)
//router.post('/j_event_list', event.event_j_list); //joining(참석표시)
router.post('/n_event_list', event.event_n_list); //new(새로운 행사,안읽음)
router.post('/event_checking', event.event_checking);
app.use('/api', router);
app.listen(5000);


// router.post('/register', login.register);
// router.post("/register", (req, res) => {
//     let params = req.body;
//     res.send("good");
//     login.register();
//     console.log(params);
//  });