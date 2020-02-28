var express = require("express");
var login = require('./routes/loginroutes');
var greeting = require('./routes/greeting');
var drug_management = require('./routes/drug_management');
var eventboard = require('./routes/eventboard_regi');
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

router.post('/register', login.checking_duplication);
// router.post('/register', login.register);
// router.post("/register", (req, res) => {
//     let params = req.body;
//     res.send("good");
//     login.register();
//     console.log(params);
//  });
router.post('/login', login.login);
// router.post("/login", (req, res) => {
//     let params = req.body;
//     res.send("hi");
//     console.log(params);
//  });
router.post('/greeting', greeting.greeting);
// router.post("/greeting", (req, res) => {
//     let params = req.body;
//     res.send("hi");
//     console.log(params);
//  });
router.post('/drug_management', drug_management.drug_management);
router.post('/eventboard_regi', eventboard.event_register);
app.use('/api', router);
app.listen(5000);
