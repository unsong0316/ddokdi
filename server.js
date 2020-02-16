var express = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');


var app = express();
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router();

//router.post('/register', login.register);
router.post("/register", (req, res) => {
    let params = req.body;
    res.send("정글북");
    console.log(params);
 });
router.post('/login', login.login);
app.use('/api', router);
app.listen(5000);
