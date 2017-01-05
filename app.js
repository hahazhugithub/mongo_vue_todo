"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var morgan = require('morgan');

require("./bootstrapMongo")();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/*----------BEGIN: set client code ------------*/
app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use("/js", express.static(__dirname + '/client/js'));
app.use("/css", express.static(__dirname + '/client/css'));

app.get('/index.html', function(req, res) {
    res.render(__dirname + '/client/index.html');
});
/*----------END: set client code --------------*/

/*----------BEGIN: intial api code-------------*/
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

app.use('/api/todo', require("./router/todoRouter"));
/*----------END: intial api code----------------*/

app.listen(process.env.PORT || 3000, function() {
    console.log("server started-up");
});
