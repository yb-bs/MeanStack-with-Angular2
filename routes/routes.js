function homeR(req, res) {
	res.render('home.ejs', {
		title : 'I love my city',
		headline : 'Every city has its own personality'

	});
};

function cityR(req, res) {
	var cityname = req.params.city;
	var titleValue;
	var headlineValue;

	if (cityname === 'newyork') {
		titleValue = "New York";
		headlineValue = "Business capital of the world"
	} else if (cityname === 'london') {
		titleValue = "London";
		headlineValue = "City of the Thames"
	} else if (cityname === 'newdelhi') {
		titleValue = "New Delhi";
		headlineValue = "Capital city of India"
	} else if (cityname === 'paris') {
		titleValue = "Paris";
		headlineValue = "Fashion capital of the world"
	}

	res.render('city.ejs', {
		title : titleValue,
		headline : headlineValue
	});
};

module.exports.cityFn = cityR;
module.exports.homeFn = homeR;