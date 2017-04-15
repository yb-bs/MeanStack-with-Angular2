var chalk = require('chalk');
var mongoose = require('mongoose');

var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var dbURI = 'mongodb://root:root@ds159330.mlab.com:59330/yorbit201_nodejs';
console.log("Establishing connection to the DB");

mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
	console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error', function(err) {
	console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function() {
	console.log(chalk.red('Mongoose disconnected'));
});

var userSchema = new mongoose.Schema({
	username : {
		type : String,
		unique : true
	},
	email : {
		type : String,
		unique : true
	},
	passowrd : String
}, {
	collection : 'Users'
});

userSchema.pre('save', function(next){
	var user = this;
	console.log("Before registering the user");
	
	if(!user.isModified('password')) return next();
	
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err) return next(err);
		console.log("Salt");
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) return next(err);
			
			user.password = hash;
			console.log("Hash : "+hash);
			next();
		});
	});
});



mongoose.model('User', userSchema);
