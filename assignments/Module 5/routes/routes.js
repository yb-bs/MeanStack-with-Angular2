var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

exports.loginPageHandler = function(req, res){
	req.session.destroy();
	res.render('login.handlebars', {});
};

exports.landingPageHandler = function(req, res){
	var nmReq = req.body.nm;
	var pwdReq = req.body.pwd;
	var loginOutcome;
	
	mongoose.model('User').findOne({username:nmReq}, function(err, userObj){
		if(userObj === null){
			loginOutcome = "Login Failed : bcrypt.comare yielded error";
			res.render('landingPage.handlebars', {welcomeMessage : loginOutcome});
		}else {
			bcrypt.compare(pwdReq, userObj.password, function(errCompare, isMatch){
				if(errCompare){
					loginOutcome = "Login failed : bcrypt.comare yielded error";
				} else if(isMatch === true){
					loginOutcome = "Login successful";
				} else {
					loginOutcome = "Login failed: Password did not match";
				}
				console.log("Login Name %s, Password %s. Login outcome [%s]", nmReq, pwdReq, loginOutcome);
				res.render('landingPage.handlebars', {welcomeMessage:loginOutcome});
			});
		}
	});
};

exports.registerFormHandler = function(res, res){
	res.render("register", {});
};

exports.registerUserHandler = function(req, res){
	var usernameReq = req.body.username;
	var emailReq = req.body.email;
	var passwordReq = req.body.password;
	
	var newuser = new User();
	newuser.username = usernameReq;
	newuser.email = emailReq;
	newuser.password = passwordReq;
	
	newuser.save(function(err, savedUser){
		if(err){
			var message = "A user already exists with that username";
			console.log(message);
			res.render("register", {errorMessage: message});
			return;
		}else{
			req.session.newuser = savedUser.username;
			res.render('landingPage.handlebars', {welcomeMessage: "Registration successful"});
		}
	});
};