var http = require('http');

var server = http.createServer(function(req, res) {
  var string = req.url;
  string = string.slice(1,string.length);
  string = string.replace(/%20/g, ' ');
  
  console.log(string);
  if (string.length === 0) {
  	res.write("<h1>Please enter the date you want to check following the '/' in the url.</h1><br><h2>Example: https://enigmatic-chamber-67781.herokuapp.com/December%2012,%202012");
  	res.end();
  }
  else {
  	res.end(string);
  }
});

var port = process.env.PORT || 3000;
server.listen(port, function(){
  console.log("Server listening at:" + port);
});