var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync(__dirname + "/chomin.html", 'utf8');
var benjamin = "Benjamin de la cruz";
var options = { format: 'Letter',
				 header: {
				    "height": "45mm",
				    "contents": '<div style="text-align: center;"><h1>Autor: '+ benjamin +'</h1></div>'
				  } 
			};
pdf.create(html,options).toFile('./chms.pdf',function(err, res){
  console.log(res.filename);
});