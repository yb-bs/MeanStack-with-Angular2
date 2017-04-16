var chalk = require('chalk');
var mongoose = require( 'mongoose' );

var dbURI = 'mongodb://root:root@ds159330.mlab.com:59330/yorbit201_nodejs';

mongoose.connect(dbURI);


mongoose.connection.on('connected', function () {
  console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error',function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
  console.log(chalk.red('Mongoose disconnected'));
});

var employeeDB = new mongoose.Schema({
  name: String,
  email: {type: String, unique:true},
  dob: Date,
  dept: String,
  gender: String
});

mongoose.model( 'employees', employeeDB );