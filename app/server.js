var express = require('express'),
	swig	= require('swig'),
	parser 	= require('body-parser');
var expressServer = function(config){
	config = config || {};
	this.app = express();
	this.app.use(parser.json());
	this.app.use(parser.urlencoded({extended:true}));
	this.app.engine('html',swig.renderFile);
	this.app.set('view engine', 'html');
	this.app.set('views',__dirname + '/website/views/templetes');
	this.app.use(express.static(__dirname + '/static'));
	swig.setDefaults({varControls:['<<','>>']});

	this.app.get('/',function(sol,res,next){
		res.render('index');
	});
}

module.exports = expressServer;