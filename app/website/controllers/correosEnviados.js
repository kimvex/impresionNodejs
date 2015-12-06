var mysql = require('./db/db');

var MySQL = new mysql();

var correos = function(config){
  config = config || {};
  query = MySQL.query("select * from correos where correoPro = ?",[config.correo],function(err,respuesta){
    if(err){
      throw err;
    }
    config.res.json(respuesta);
  });
}

module.exports = correos;
