var http = require('http');

var server = http.createServer(function (req, res) {
  	var url = req.url; 
	
	res.write(url);
  	res.end();
});
server.listen(8080); 