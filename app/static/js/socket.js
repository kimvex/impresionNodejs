document.addEventListener('DOMContentLoaded',function(){
  debugger;
  var server = document.getElementById('server').value;
  var socket = io.connect('http://'+server+":5000");

  function envioMail(e){
    debugger;
    var datos = {
      correo: document.getElementById('cDestino').value,
      titulo: document.getElementById('cTitulo').value,
      mensaje: document.getElementById('mensaje').value
    }
    socket.emit('mail',datos);
    $.ajax({
      url: '/enviosC',
      type: 'GET',
      success: function(data){
        document.getElementById('contenidoEnvio').innerHMTL = '<div class="envio-mensaje-dato"><p>Mensaje enviado</p></div>';
      }
    });
    e.preventDefault();
  }

  document.getElementById('envioCorreo').addEventListener('submit',envioMail);
});
