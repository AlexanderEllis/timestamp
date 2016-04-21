var http = require('http');

var server = http.createServer(function(req, res) {
  var string = req.url;
  string = string.replace(/%20/g, ' ');
  
  console.log(string);
  
  res.end(string);
});

var port = process.env.PORT || 3000;
server.listen(port, function(){
  console.log("Server listening at:" + port);
});