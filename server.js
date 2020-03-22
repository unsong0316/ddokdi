const cors = require('cors');
var express = require("express");
var login = require('./routes/loginroutes');
var greeting = require('./routes/greeting');
var drug_management = require('./routes/drug_management');
var eventboard_regi = require('./routes/eventboard_regi');
var event = require('./routes/event');
var dashboard = require('./routes/dashboard');
var managing_client = require('./routes/managing_client');
var bodyParser = require('body-parser');
var app = express();
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );


var router = express.Router();

router.post('/register', login.checking_duplication); //아이디 중복검사 및 회원 등록 
router.post('/login', login.login); //로그인
router.post('/greeting', greeting.greeting); //기분 체크
router.post('/dashboard', dashboard.dashboard);  //대시보드(새로운행사 카운트, 참석행사리스트, 약복용리스트)
router.post('/drug_management', drug_management.drug_management); //복용 약 등록
router.post('/drug_list', drug_management.show_drug_list); //복용 약 리스트
router.post('/eventboard_regi', eventboard_regi.event_register); //이벤트 등록
router.post('/a_event_list', event.event_a_list); //all(행사 전체 리스트)
router.post('/n_event_list', event.event_n_list); //new(새로운 행사,안읽음)
router.post('/d_event', event.event_d); //detail(행사 상세조회)
router.post('/c_event', event.event_c); //checking(새로운 행사,안읽음)
router.post('/j_event_list', event.event_j_list); //joining list(참석행사 리스트)
router.post('/not_j_event_list', event.event_not_j_list); //not joining list(참석 체크는 안했지만 읽은것)
router.post('/j_event_count', event.event_j_count); //joining count(참석자 수)
router.post('/t_event_list', event.event_t_list); //total event list(전체 리스트)
router.post('/event_list', event.event_list); //event list (참석 안함 (체킹0,1), 참석함)
router.post('/delete_drug_list', drug_management.delete_drug_list); 
router.post('/update_emergency_service_1', managing_client.update_emergency_service_1); 
router.post('/update_emergency_service_0', managing_client.update_emergency_service_0); 
router.post('/admin_client_list', managing_client.admin_client_list); 
router.post('/admin_client_details', managing_client.admin_client_details); 
router.post('/update_emergency_service', managing_client.update_emergency_service);
router.post('/delete_expire_event', eventboard_regi.delete_expire_event); // 날짜 지난 이벤트 삭제
router.post('/update_user_event_participation', event.update_user_event_participation); //joining(참석업데이트)
router.post('/user_event_d', event.user_event_d); //user_event details

app.use('/api', router);
app.listen(3000);


// router.post('/register', login.register);
// router.post("/register", (req, res) => {
//     let params = req.body;
//     res.send("good");
//     login.register();
//     console.log(params);
//  });