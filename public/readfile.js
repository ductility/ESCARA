var fs = require('fs');
fs.readFile('test.gcode', 'utf8', function(err, data){
  console.log(data);
});