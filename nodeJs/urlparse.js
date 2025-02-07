var http = require('http');
var fs = require('fs');
var url = require ('url');

http.createServer(function(req,res){
   
    var url = require('url');
var adr = 'http://localhost:8080/default.html?car=benz&fruit=mango';
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.html'
console.log(q.search); //returns '?car=benz&fruit=mango'

var qdata = q.query; //returns an object: {car:'benz' , fruit:'mango' }
console.log(qdata.car);//returns 'mango'
    
    res.end();
    
}).listen(8080);



