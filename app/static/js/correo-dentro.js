document.addEventListener('DOMContentLoaded',function(){
  var usuario = document.getElementById('usuario').value;
	function eventosCorreo(config){
    //'/emails/'+config.srcElement.id+'/datos', asi se pasan multiples raparametros a nodejs
    //console.log(config.srcElement.id);
    console.log(config);
		//console.log(config.srcElement.parentElement.id);
    $.ajax({
      url: '/emails/'+config.target.id+'/'+this.id,
      type: 'GET',
      success: function(data){
        console.log(data);
        if(data[0].sino == 1){
          var texto = '<div class="texto-correo"><h1>'+data[0].titulo+'</h1> \n\n'+'<p>'+data[0].texto+'</p>\n<p>'+data[0].nameOrigin+'</p><p><a href="#" id="botonImpresionCorreo"><button class="botonImpresionCorreo" id="'+data[0].archivo+'">Imprimir archivo</button></a></p></div>';
        }else{
          var texto = '<div class="texto-correo"><h1>'+data[0].titulo+'</h1> \n\n'+'<p>'+data[0].texto+'</p>\n<p>'+data[0].nameOrigin+'</p></div>';
        }
        document.getElementById('correos-se').innerHTML = texto;
        if(data[0].sino == 1){
          document.getElementById('botonImpresionCorreo').addEventListener('click',datosImprimir);
        }
      }
    });
		//$.get('/leer'+this.+'');
	}

  function datosImprimir(e){
    console.log(e.target.id);
    socket.emit('imprimir',e.target.id);
    e.preventDefault();
  }

	function recibiendo(e){
    localStorage['lugar'] = 'recibidos';	
		var centroMail = document.getElementById('correos-se');
		$.ajax({
			url: '/recibidos',
			type: 'GET',
			success: function(data){
				var contenido;
				for(i in data){
					if(contenido == undefined){
						contenido = "<a href='#' id='contenido_"+data[i].id+"' class='links-correos'><p class='correos-r' id='"+data[i].id+"'>"+data[i].correoPro+"    "+data[i].titulo+"</p></a>";
					}else{
						contenido = "<a href='#' id='contenido_"+data[i].id+"' class='links-correos'><p class='correos-r' id='"+data[i].id+"'>"+data[i].correoPro+"    "+data[i].titulo+"</p></a>" + contenido;
					}
				}

				centroMail.innerHTML = contenido;
				for(i in data){				
					document.getElementById('contenido_'+data[i].id+'').addEventListener('click',eventosCorreo);
				}
			}
		});
		if(e){
			e.preventDefault();
		}
	}

	document.getElementById('recibidos').addEventListener('click',recibiendo);
	recibiendo();
  localStorage['lugar'] = 'instancia';

  function enviados(e){
    localStorage['lugar'] = 'enviados';
    $.ajax({
      url: '/enviados',
      type: 'GET',
      success: function(data){
        var datos;
        for(i in data){
          if(datos == undefined){
            datos = "<a href='#' id='enviados_"+data[i].id+"' class='links-correos'><p class='correos-r' id='"+data[i].id+"'>"+data[i].correo+"    "+data[i].titulo+"</p></a>";
          }else{
            datos = "<a href='#' id='enviados_"+data[i].id+"' class='links-correos'><p class='correos-r' id='"+data[i].id+"'>"+data[i].correo+"    "+data[i].titulo+"</p></a>" + datos;
          }
        }
        document.getElementById('correos-se').innerHTML = datos;
        for(i in data){       
          document.getElementById('enviados_'+data[i].id+'').addEventListener('click',eventosCorreo);
        }
      }
    });
    e.preventDefault();
  }

  document.getElementById('enviados').addEventListener('click',enviados);

  function crear(e){
    var script = '<script src="js/socket.js"></script>';
    localStorage['lugar'] = 'crear';
    $.get('/temCrear',function(data){
      document.getElementById('correos-se').innerHTML = data;
      action();
    });
  }

  document.getElementById('crear').addEventListener('click',crear);

  function cerrar(e){
    localStorage.removeItem('lugar');
    $.ajax({
      url: '/cerrar',
      type: 'GET',
      success: function(data){
        window.location = '/';
      }
    });
    e.preventDefault();
  }

  document.getElementById('cerrar').addEventListener('click',cerrar);

  var server = document.getElementById('server').value;
  var socket = io.connect('http://'+server+":5000");

  function envioMail(e){
    var formData = new FormData($("#envioCorreo")[0]);
    $.ajax({
      url: "/enviosC",
      type: "POST",
      dataType: "Json",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function(data){ 
        socket.emit('mail',data.correo);
        document.getElementById('correos-se').innerHTML = '<div class="envio-mensaje-dato"><p>Mensaje enviado</p></div>';
      }
    });
    e.preventDefault();
  }
  socket.on(usuario,function(data){
    if(localStorage['lugar'] == 'instancia' || localStorage['lugar'] == 'recibidos'){
      var datos;
      for(i in data){
        if(datos == undefined){
          datos = "<a href='#' id='contenido_"+data[i].id+"' class='links-correos'><p class='correos-r' id='"+data[i].id+"'>"+data[i].correoPro+"    "+data[i].titulo+"</p></a>";
        }else{
          datos = "<a href='#' id='contenido_"+data[i].id+"' class='links-correos'><p class='correos-r' id='"+data[i].id+"'>"+data[i].correoPro+"    "+data[i].titulo+"</p></a>" + datos;
        }
      }
      document.getElementById('correos-se').innerHTML = datos;
    }
    for(i in data){       
      document.getElementById('contenido_'+data[i].id+'').addEventListener('click',eventosCorreo);
    }
  });
  function action(){
      document.getElementById('envioCorreo').addEventListener('submit',envioMail);
  }

});
