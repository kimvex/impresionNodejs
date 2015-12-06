var express = require('express'),
		swig		= require('swig'),
		parser 	= require('body-parser'),
		log     = require('./website/controllers/login'),
		mail    = require('./website/controllers/correos'),
		mails   = require('./website/controllers/correoEspecifico'),
		envios  = require('./website/controllers/correosEnviados'),
		session	= require('express-session'),
		multer	= require('multer'),
		upload	= multer({dest: 'static/archivos/'}),
		passSecret =  process.env.SECRET,
		dev			=	process.env.ENV,
		ip 			= require('ip');
var expressServer = function(config){
	config = config || {};
	this.app = express();
	this.app.use(parser.json());
	this.app.use(parser.urlencoded({extended:true}));
	this.app.use(session({secret: passSecret,resave:false,saveUninitialized:true}));
	this.app.engine('html',swig.renderFile);
	this.app.set('view engine', 'html');
	this.app.set('views',__dirname + '/website/views/templetes');
	this.app.use(express.static(__dirname + '/static'));
	swig.setDefaults({varControls:['<<','>>']});

	if(dev == "devop"){
		this.app.set('view cache', false);
	}

	function validar(sol,res,next){
		if(!sol.session.name){
			res.redirect('/');
		}else{
			next();
		}
	}

	function validarS(sol,res,next){
		if(!sol.session.name){
			next();
		}else{
			res.redirect('/correos');
		}
	}

	this.app.get('/',validarS,function(sol,res,next){
		res.render('index');
	});

	this.app.get('/correos',validar,function(sol,res,next){
		res.render('correos',{ipServer:ip.address(),ipUsuario:sol.session.name});
	});

	this.app.get('/recibidos',function(sol,res,next){
		var datos = {
			sol: sol,
			res: res
		}
		var mails = new mail(datos);
	});

	this.app.get('/enviados',function(sol,res,next){
		var datos = {
			sol: sol,
			res: res,
			correo: sol.session.name
		}

		var envi = new envios(datos);
	});

	this.app.get('/temCrear',function(sol,res,next){
		res.render('crear',{ipServer:ip.address(),ipUsuario:sol.session.name});
	});

	this.app.get('/emails/:id/:id_p',function(sol,res,next){
		console.log(sol.params);
		var datos = {
			id: sol.params.id,
			sol: sol,
			res: res,
			us: sol.session.name,
			id_p: sol.params.id_p 
		}
		var correos = new mails(datos);
	});

	this.app.get('/enviosC',function(sol,res,next){
		res.send({});
	});

	this.app.post('/entrar',function(sol,res,next){
		var datos = {
			correo: sol.body.c,
			clave: sol.body.co,
			sol: sol,
			res: res
		}
		var login = new log(datos);
	});

	this.app.get('/cerrar',function(sol,res,next){
		sol.session.destroy();
		res.redirect('/');
	});

	this.app.get('/api',function(sol,res,next){
		var datos = {
			sol: sol,
			res: res,
			correo: "chomin@kimvex.com"
		}
		var envi = new envios(datos);
	});
}

module.exports = expressServer;
