var http = require('http');
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



var server = http.createServer(function(req, res) {
	var result = {
		unix: "placeholder",
		normal: "placeholder"
	};
  var string = req.url;
  string = string.slice(1,string.length);

  if (string.length === 0) { //Check if there isn't any url
  	res.write("<h1>Please enter the date you want to check following the '/' in the url.</h1><br><h2>Example: https://enigmatic-chamber-67781.herokuapp.com/December%2012,%202012");
  	res.end();
  }

  if ((!isNaN(string))) {
  		var adjustedTime = parseInt(string);
  		var resultDate = new Date(adjustedTime * 1000);
  		result.unix = adjustedTime;
  		result.normal = months[resultDate.getMonth()] + " " + resultDate.getDate() + ", " + resultDate.getFullYear();
  		result = JSON.stringify(result);
			res.write(result);
  		res.end();
  		return;
  }

  else {
  	

 	string = string.split('%20'); //Get rid of spaces
 	
 	if (string.length !== 3) { //Just in case someone didn't enter three things
 		result.unix = null;
  	result.normal = null;
  	result = JSON.stringify(result);
  	res.write(result);
  	res.end();
  	return;
 	}

  var whereIsMonth = months.indexOf(string[0]).toString();
  var month = string[0];
  var day = string[1].replace(/,/g, ''); //Get rid of commas

  var year = string[2];

  if ((whereIsMonth > -1) && (parseInt(day) < 32) && (parseInt(day) > 0) && (year.length === 4)) { //Check conditions

  	if (day.length === 1) {
  		day = "0" + day;
  	}

  	month = months.indexOf(month) + 1;

  	if (month.length === 1) {
  		month = "0" + month;
  	}
  	var unixTime = year + "." + month + "." + day;
  	var resultDate = new Date(unixTime);
  	var intermediate = (resultDate.getTime() / 1000).toFixed(0);
  	result.unix = (resultDate.getTime() / 1000).toFixed(0);
  	result.normal = months[resultDate.getMonth()] + " " + resultDate.getDate() + ", " + resultDate.getFullYear();
  	result = JSON.stringify(result);

  	res.write(result);
  	res.end();
  } 
  else {
  	result.unix = null;
  	result.normal = null;
  	result = JSON.stringify(result);
  	res.write(result);
  	res.end();
  }	
  }});

var port = process.env.PORT || 3000;
server.listen(port, function(){
  console.log("Server listening at:" + port);
});