document.addEventListener('DOMContentLoaded',function(){

	function iniciarSession(e){
		var correo = document.getElementById('correo').value;
		var contra = document.getElementById('contraCorreo').value;
		$.ajax({
			url: '/entrar',
			type: 'POST',
			dataType: 'json',
			data: {c:correo,co:contra},
			success: function(data){
				if(data.err == 'error'){
					alert('Usuario o contraseña incorrecto');
				}
				if(data.err == 'simple'){
					window.location = '/correos';
				}
			}
		});
		e.preventDefault();
	}

	document.getElementById('loginCorreo').addEventListener('submit',iniciarSession);
});