var mysql 	= require('./db/db'),
	session	= require('express-session'),
	moment	= require('moment');;

var conexion = new mysql();

var logeo = function(config){
	config = config || {};
	var correo = config.correo;
	var clave = config.clave;

	query = conexion.query("select * from usuarios where correo = ?",[correo],function(err,respuesta){
		if(err){
			throw err;
		}
		
		if(respuesta[0] == undefined){
			config.res.send({err:'error'});
		}else{
			var pregunta = conexion.query("select cotra from usuarios where correo= ?",[correo],function(error,resultado){
				if(error){
					throw error;
				}
				if(resultado[0].cotra == clave){
					config.sol.session.name = correo;
					config.sol.session.cookie.expires = moment().add(14, 'days').unix();
					config.res.send({err:'simple',session:config.sol.session.name});
				}else{
					config.res.send({err:'error'});
				}
			});
		}
	});
}

module.exports = logeo;
