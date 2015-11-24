var http 	= require('http'),
	express = require('./app/server');

var expressServer = new express();

var server = http.createServer(expressServer.app);

server.listen(5000,function(){
	console.log('El servidor se esta ejecutando!');
});