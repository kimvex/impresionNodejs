var http 	= require('http'),
	express = require('./app/server'),
  socket  = require('./app/socket');

var expressServer = new express();

var server = http.createServer(expressServer.app);

var io = new socket({server:server});

server.listen(5000,function(){
	console.log('El servidor se esta ejecutando!');
});
