var mysql = require('./db/db');

var MySQL = new mysql();

var correo = function(config){
  config = config || config;
  if(config.id_p == 'contenido_'+config.id){
    var datos = 'select * from correos where id=? and correo = ?';
  }else{
    var datos = 'select * from correos where id=? and correoPro = ?'
  }
   query = MySQL.query(datos,[config.id,config.us],function(err,respuesta){
        if(err){
          throw err;
        }
        console.log(respuesta);
        config.res.json(respuesta);
   });
}

module.exports = correo;
