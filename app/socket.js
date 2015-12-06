var socketIO  = require('socket.io'),
    mysql     = require('./website/controllers/db/db'),
    impresion = require('./website/controllers/imprimir');

var MySQL = new mysql();

var socketServer = function(config){
  config = config || {};
  var io = socketIO.listen(config.server);
  io.sockets.on('connection',function(socket){
    socket.on('mail',function(data){
      console.log(data);
        var query = MySQL.query("select * from correos where correo=?",[data],function(err,respuesta){
          if(err){
            throw err;
          }
          var datos = [];
          for(i in respuesta){
            datos.push(respuesta[i])
          }
          io.emit(data,respuesta);
      });
    });

    socket.on('imprimir',function(data){
      var imprime = new impresion(data);
    });
  });
}

module.exports = socketServer;
