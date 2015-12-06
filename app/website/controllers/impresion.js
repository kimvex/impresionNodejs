var fs = require('fs');
var exec = require("child_process").exec;
var pdf = require('html-pdf');
var benjamin = "Benjamin De la cruz Martinez";
var lugar = "Medellin y madero";
var municipio = "Centro";
var htm = '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Documento</title><link rel="stylesheet" type="text/css" href="css/styles.css"></head><body><div><h2 class="titulo">CONSTANCIA DE GASTOS DE TRANSPORTE <br> CICLO ESCOLAR 2015-2016</h1><h3 class="subtitulo">Comité Técnico del Programa Nacional de Becas para la<br>Educación Superior Manutención en el Estado de Tabasco</h2><p class="contenido">El suscrit@ de nombre:'+benjamin+' <br> con domicilo particular actual en:'+lugar+' de la localidad del municipio '+ municipio +' de del estado de_____ declaro bajo protesta de decir verdad, que no cuento con un vehiculo propio por lo que utilizo de transporte publico para trasladarme a la institucion donde realizo mis estudios univercitarios. Nombre de la Institucion Educativa: Instituto Técnologico de la Zona Olmeca. Direccion de la institucion educativa: <br>	Calle: Prolongacion de Ignacio Zaragoza S/N <br>Colonia: Centro  Localidad: Villa Ocuiltzapotlan <br>Municipio: Centro <br>C.P.: 86270<br>Mensualmente mis gastos por transporte son por la cantidad de $___________(Monto en letra_____________).<br>Lo antes manifestado, es con la finalidad que se integre en mi expediente como aspirante al Programa Nacional de Becas para la Educación Superior Manutención en el Estado de Tabasco. ASi mismo, que lo expresado en esta carta son datos totalmente veridicos; por tal motivo en caso de incurrir en alguna falsedad aceopto la sancion o determinacion legal que me imponga el Comite Técnico, que puede consistir en la cancelacion de la misma y el reintegro del recurso que me fuera otorgado. De igual forma autorizo a la Institución de Educacion Superior y al Comite Tecnico para que verifiquen, en la forma en que se concidere conveniente, todos los datos acentados. (Anexo copia de los comprobantes que me proporcionan estos servicios).<br><br><center><p class="centrado">FECHA:___________________</p></center><center><p class="centrado">ATENTAMENTE</p></center><center><P class="centrado">_______________________________</P></center><center><P class="centrado">NOMBRE Y FIRMA</P></center></p> </div></body></html>';

function escribir(){	
	fs.writeFile('./mundo.html', htm, function(err) {
		crear();
	});
}

function crear(){
	var options = {
		format: 'Letter',
		border:{
			"top": "2cm",
			"right": "2cm",
			"bottom": "2cm",
			"left": "2cm"
		}
	};

	var html = fs.readFileSync(__dirname + "/mundo.html", 'utf8');

	pdf.create(html,options).toFile('./kimvex.pdf',function(err, res){
	  console.log(res.filename);
	  ejecutar();
	});
}

escribir();

function ejecutar(){
	//term.write('cd '+__dirname+'\r');
	command = 'lp kimvex.pdf';
	child = exec(command, function(error, stdout, stderr){
		if(error){
			throw error;
		}else{
			console.log(stdout);
		}
	});
	//term.write('touch kmv.docx\r');
	//term.write('echo "CONSTANCIA DE GASTOS DE TRANSPORTE \n CICLO ESCOLAR 2015-2016 \n Comité Técnico del Programa Nacional de Becas para la\nEducación Superior Manutención en el Estado de Tabasco \nEl suscrit@ de nombre:'+benjamin+' \n con domicilo particular actual en:'+lugar+' de la localidad del municipio____ de del estado de_____ declaro bajo protesta de decir verdad, que no cuento con un vehiculo propio por lo que utilizo de transporte publico para trasladarme a la institucion donde realizo mis estudios univercitarios. Nombre de la Institucion Educativa: Instituto Técnologico de la Zona Olmeca. Direccion de la institucion educativa: \nCalle: Prolongacion de Ignacio Zaragoza S/N \nColonia: Centro  Localidad: Villa Ocuiltzapotlan \nMunicipio: Centro \nC.P.: 86270\nMensualmente mis gastos por transporte son por la cantidad de $___________(Monto en letra_____________).\nLo antes manifestado, es con la finalidad que se integre en mi expediente como aspirante al Programa Nacional de Becas para la Educación Superior Manutención en el Estado de Tabasco. ASi mismo, que lo expresado en esta carta son datos totalmente veridicos; por tal motivo en caso de incurrir en alguna falsedad aceopto la sancion o determinacion legal que me imponga el Comite Técnico, que puede consistir en la cancelacion de la misma y el reintegro del recurso que me fuera otorgado. De igual forma autorizo a la Institución de Educacion Superior y al Comite Tecnico para que verifiquen, en la forma en que se concidere conveniente, todos los datos acentados. (Anexo copia de los comprobantes que me proporcionan estos servicios).\n\n\nFECHA:___________________\n\nATENTAMENTE:\n\n\n_______________________________\nNOMBRE Y FIRMA\n" >> kmv.docx\r');
	//term.write('ls\r');

	//term.write('lp chmsd.pdf\r');
}

function borrado(){
	fs.unlink('mundo.html',function(err){
		if(err){
			throw err;
		}
	});
	fs.writeFile('./mundo.html',' ',function(err){
		if(err){
			throw err;
		}
	});
}