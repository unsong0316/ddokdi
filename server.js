var express = require("express");
var login = require('./routes/loginroutes.js');
var greeting = require('./routes/greeting');
var bodyParser = require('body-parser');
var mysqlTimestamp = require(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));

var app = express();
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router();

router.post('/register', login.register);
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
router.post('/greeting', greeting.greeting)
// router.post("/greeting", (req, res) => {
//     let params = req.body;
//     res.send("hi");
//     console.log(params);
//  });
app.use('/api', router);
app.listen(5000);
