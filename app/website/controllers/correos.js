var mysql = require('./db/db');

var MySQL = new mysql();

var correos = function(config){
	config = config || {};

	query = MySQL.query('select * from correos where correo = ?',[config.sol.session.name],function(err,respuesta){
		if(err){
			throw err;
		}

		var datos = [];
		for(i in respuesta){
			datos.push(respuesta[i]);
		}
		config.res.send(datos);

	});
}

module.exports = correos;
