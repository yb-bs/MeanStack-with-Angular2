exports.loginPage = function(req, res) {
	req.session.destroy();
	res.render('login.handlebars', {});
};

exports.landingPage = function(req, res) {
	var person;
	if(req.session.userName){
		person = req.session.userName;
	} else {
		person = req.query.nm;
		req.session.userName = person;
	}
	
	res.render('landingPage.handlebars', {welcomeMessage : person});
};

exports.cityPage = function(req, res) {
	var interestValue = req.body.interest;
	var personName = req.session.userName;
	var taglineValue, citynameValue;

	if (interestValue === 'finance') {
		cityNameValue = "New York";
		taglineValue = "Business capital of the world";
	} else if (interestValue === 'history') {
		cityNameValue = "Rome";
		taglineValue = "Early Civilization";
	} else if (interestValue === 'fashion') {
		cityNameValue = "Paris";
		taglineValue = "Fashion capital of the world";
	}

	res.render('city.handlebars', {
		cityName : cityNameValue,
		tagline : taglineValue
	});
};
