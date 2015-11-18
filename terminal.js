var pty = require('pty.js');

var term = pty.spawn('bash', [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

term.on('data', function(data) {
  console.log(data);
});
console.log(__dirname);

term.write('cd '+__dirname+'\r');
term.write('ls\r');
//term.resize(100, 40);
//term.write('ls /\r');
term.write('python hola.py\r');
term.write('lpstat -p -d\r');
term.write('lp mundo.txt\r');

console.log(term.process);