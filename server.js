var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db=require('./db.js');

var index = require('./routes/index');
var employees = require('./routes/employees');

var port = process.env.PORT || 8000;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, '')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', employees);

app.listen(port, function () {
    console.log('Server started on port ' + port);
});