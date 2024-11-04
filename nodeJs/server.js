var http = require('http');

var server = http.createServer(function (req, res) {
  	// var url = req.url; 
	// var mrth = req.method;
	 var sc =res.statusCode=404;
	
	
	
	res.write(`${req.method} request for '${req.url}' '${sc}'${'res.statusMessage=Not found'}`);
  	res.end();
});
server.listen(8080); 