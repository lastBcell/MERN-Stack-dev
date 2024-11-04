var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
  	
    fs.appendFile('new.txt','hello!',function(err){
        if(err) throw err;
        console.log('file saved');
        fs.readFile('new.txt',function(err,data){
            res.write(data);
           
        })

    })
    res.end();
});
server.listen(8080); 