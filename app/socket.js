var socketIO = require('socket.io'),
    mysql  = require('./website/controllers/db/db');

var MySQL = new mysql();

var socketServer = function(config){
  config = config || {};
  var io = socketIO.listen(config.server);
  io.sockets.on('connection',function(socket){
    socket.on('mail',function(data){
      console.log(data);
      var insertar = MySQL.query("insert into correos(correo,correoPro,titulo,texto,archivo) values (?,?,?,?,'')",[data.correo,data.us,data.titulo,data.mensaje],function(error,resultado){
        if(error){
          throw error;
        }
        console.log(resultado)
        var query = MySQL.query("select * from correos where correo=?",[data.correo],function(err,respuesta){
          if(err){
            throw err;
          }
          var datos = [];
          for(i in respuesta){
            datos.push(respuesta[i])
          }
          console.log(respuesta);
          io.emit(data.correo,respuesta);
        });
      });
    });
  });
}

module.exports = socketServer;
