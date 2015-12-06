var mysql = require('./db/db');

var MySQL = new mysql();

var envioCorreo = function(config){
  config = config || {};
  if(config.datos.dat == 2){
    var insertar = MySQL.query("insert into correos(correo,correoPro,titulo,texto,archivo,nameOrigin,sino) values (?,?,?,?,?,?,'1')",[config.datos.correo,config.datos.us,config.datos.titulo,config.datos.mensaje,config.datos.file,config.datos.fileRname],function(error,resultado){
      if(error){
        throw error;
      }
      config.res.json({correo:config.datos.correo});
    });
  }else{
    var insertar = MySQL.query("insert into correos(correo,correoPro,titulo,texto,archivo,nameOrigin,sino) values (?,?,?,?,'','',2 )",[config.datos.correo,config.datos.us,config.datos.titulo,config.datos.mensaje],function(error,resultado){
      if(error){
        throw error;
      }
      config.res.json({correo:config.datos.correo});
    });  
  }
}
module.exports = envioCorreo;
